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
  `);

  // Migration: add lessonId column if it doesn't exist
  try {
    await database.runAsync(
      'ALTER TABLE quiz_attempts ADD COLUMN lessonId TEXT'
    );
  } catch {
    // Column already exists, ignore
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
