import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;
  db = await SQLite.openDatabaseAsync('nextlevel.db');
  await initDatabase(db);
  return db;
}

async function initDatabase(database: SQLite.SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS lesson_progress (
      lessonId TEXT PRIMARY KEY,
      completed INTEGER DEFAULT 0,
      completedAt TEXT
    );

    CREATE TABLE IF NOT EXISTS quiz_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phaseId TEXT NOT NULL,
      lessonId TEXT,
      score INTEGER NOT NULL,
      totalQuestions INTEGER NOT NULL,
      date TEXT NOT NULL,
      answers TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS streaks (
      date TEXT PRIMARY KEY
    );

    CREATE TABLE IF NOT EXISTS user_profile (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      totalXP INTEGER DEFAULT 0,
      displayName TEXT DEFAULT 'AI Security Learner'
    );

    CREATE TABLE IF NOT EXISTS earned_badges (
      badgeId TEXT PRIMARY KEY,
      earnedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS xp_transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount INTEGER NOT NULL,
      source TEXT NOT NULL,
      sourceId TEXT NOT NULL,
      date TEXT NOT NULL
    );
  `);

  // Migration: add lessonId column if it doesn't exist
  try {
    await database.runAsync(
      'ALTER TABLE quiz_attempts ADD COLUMN lessonId TEXT'
    );
  } catch {
    // Column already exists, ignore
  }

  // Ensure user_profile row exists
  await database.runAsync(
    'INSERT OR IGNORE INTO user_profile (id, totalXP, displayName) VALUES (1, 0, ?)',
    'AI Security Learner'
  );

  // Retroactive XP migration: if totalXP is 0 but user has progress, calculate it
  await migrateXP(database);
}

async function migrateXP(database: SQLite.SQLiteDatabase) {
  const profile = await database.getFirstAsync<{ totalXP: number }>('SELECT totalXP FROM user_profile WHERE id = 1');
  if (profile && profile.totalXP > 0) return; // Already has XP

  const txCount = await database.getFirstAsync<{ c: number }>('SELECT COUNT(*) as c FROM xp_transactions');
  if (txCount && txCount.c > 0) return; // Already has transactions

  // Count existing progress
  const lessons = await database.getAllAsync<{ lessonId: string; completedAt: string }>(
    'SELECT lessonId, completedAt FROM lesson_progress WHERE completed = 1'
  );
  const quizzes = await database.getAllAsync<{ id: number; score: number; totalQuestions: number; date: string }>(
    'SELECT id, score, totalQuestions, date FROM quiz_attempts'
  );

  let totalXP = 0;

  for (const lesson of lessons) {
    const xp = 50;
    totalXP += xp;
    await database.runAsync(
      'INSERT INTO xp_transactions (amount, source, sourceId, date) VALUES (?, ?, ?, ?)',
      xp, 'lesson', lesson.lessonId, lesson.completedAt
    );
  }

  for (const quiz of quizzes) {
    const base = 20;
    const perCorrect = 5;
    const perfectBonus = quiz.score === quiz.totalQuestions ? 50 : 0;
    const xp = base + quiz.score * perCorrect + perfectBonus;
    totalXP += xp;
    await database.runAsync(
      'INSERT INTO xp_transactions (amount, source, sourceId, date) VALUES (?, ?, ?, ?)',
      xp, 'quiz', quiz.id.toString(), quiz.date
    );
  }

  if (totalXP > 0) {
    await database.runAsync('UPDATE user_profile SET totalXP = ? WHERE id = 1', totalXP);
  }
}

export async function markLessonComplete(lessonId: string) {
  const database = await getDatabase();
  await database.runAsync(
    'INSERT OR REPLACE INTO lesson_progress (lessonId, completed, completedAt) VALUES (?, 1, ?)',
    lessonId,
    new Date().toISOString()
  );
}

export async function markLessonIncomplete(lessonId: string) {
  const database = await getDatabase();
  await database.runAsync(
    'DELETE FROM lesson_progress WHERE lessonId = ?',
    lessonId
  );
}

export async function getCompletedLessons(): Promise<string[]> {
  const database = await getDatabase();
  const results = await database.getAllAsync<{ lessonId: string }>(
    'SELECT lessonId FROM lesson_progress WHERE completed = 1'
  );
  return results.map((r) => r.lessonId);
}

export async function saveQuizAttempt(attempt: {
  phaseId: string;
  lessonId?: string;
  score: number;
  totalQuestions: number;
  answers: { questionId: string; selectedIndex: number; correct: boolean }[];
}) {
  const database = await getDatabase();
  await database.runAsync(
    'INSERT INTO quiz_attempts (phaseId, lessonId, score, totalQuestions, date, answers) VALUES (?, ?, ?, ?, ?, ?)',
    attempt.phaseId,
    attempt.lessonId || null,
    attempt.score,
    attempt.totalQuestions,
    new Date().toISOString(),
    JSON.stringify(attempt.answers)
  );
}

export async function getQuizAttempts(phaseId?: string) {
  const database = await getDatabase();
  if (phaseId) {
    return database.getAllAsync<{
      id: number;
      phaseId: string;
      score: number;
      totalQuestions: number;
      date: string;
      answers: string;
    }>('SELECT * FROM quiz_attempts WHERE phaseId = ? ORDER BY date DESC', phaseId);
  }
  return database.getAllAsync<{
    id: number;
    phaseId: string;
    score: number;
    totalQuestions: number;
    date: string;
    answers: string;
  }>('SELECT * FROM quiz_attempts ORDER BY date DESC');
}

export async function recordStreak() {
  const database = await getDatabase();
  const today = new Date().toISOString().split('T')[0];
  await database.runAsync(
    'INSERT OR IGNORE INTO streaks (date) VALUES (?)',
    today
  );
}

export async function getCurrentStreak(): Promise<number> {
  const database = await getDatabase();
  const rows = await database.getAllAsync<{ date: string }>(
    'SELECT date FROM streaks ORDER BY date DESC'
  );
  if (rows.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < rows.length; i++) {
    const expected = new Date(today);
    expected.setDate(expected.getDate() - i);
    const expectedStr = expected.toISOString().split('T')[0];
    if (rows[i].date === expectedStr) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

// --- Gamification ---

export async function getUserProfile() {
  const database = await getDatabase();
  return database.getFirstAsync<{ totalXP: number; displayName: string }>(
    'SELECT totalXP, displayName FROM user_profile WHERE id = 1'
  );
}

export async function addXP(amount: number, source: 'lesson' | 'quiz' | 'bonus', sourceId: string) {
  const database = await getDatabase();
  const now = new Date().toISOString();
  await database.runAsync(
    'INSERT INTO xp_transactions (amount, source, sourceId, date) VALUES (?, ?, ?, ?)',
    amount, source, sourceId, now
  );
  await database.runAsync(
    'UPDATE user_profile SET totalXP = totalXP + ? WHERE id = 1',
    amount
  );
}

export async function getEarnedBadges(): Promise<string[]> {
  const database = await getDatabase();
  const rows = await database.getAllAsync<{ badgeId: string }>('SELECT badgeId FROM earned_badges');
  return rows.map((r) => r.badgeId);
}

export async function awardBadge(badgeId: string) {
  const database = await getDatabase();
  await database.runAsync(
    'INSERT OR IGNORE INTO earned_badges (badgeId, earnedAt) VALUES (?, ?)',
    badgeId, new Date().toISOString()
  );
}

export async function getRecentXPTransactions(limit = 5) {
  const database = await getDatabase();
  return database.getAllAsync<{ id: number; amount: number; source: string; sourceId: string; date: string }>(
    'SELECT * FROM xp_transactions ORDER BY date DESC LIMIT ?',
    limit
  );
}
