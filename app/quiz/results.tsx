import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import Colors, { Spacing, Fonts, gradients } from '@/constants/Colors';
import { phases } from '@/data/phases';
import { getQuizByPhase, getQuizByLesson } from '@/data/quizzes';
import { getLessonById } from '@/data/lessons';
import { useStore } from '@/store/useStore';
import AnimatedPressable from '@/components/ui/AnimatedPressable';
import AnimatedScoreCircle from '@/components/ui/AnimatedScoreCircle';
import AnimatedXPCounter from '@/components/ui/AnimatedXPCounter';
import GlassCard from '@/components/ui/GlassCard';
import LevelUpModal from '@/components/ui/LevelUpModal';
import BadgeIcon from '@/components/ui/BadgeIcon';
import { useStaggeredEntry } from '@/components/ui/useStaggeredEntry';
import { calculateQuizXP } from '@/utils/gamification';
import { badges } from '@/data/badges';

function StaggeredView({ index, children, style }: { index: number; children: React.ReactNode; style?: any }) {
  const animStyle = useStaggeredEntry(index, 100);
  return <Animated.View style={[animStyle, style]}>{children}</Animated.View>;
}

export default function ResultsScreen() {
  const { phaseId, lessonId, score, total, answersJson } = useLocalSearchParams<{
    phaseId: string;
    lessonId?: string;
    score: string;
    total: string;
    answersJson: string;
  }>();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const { lastXPGain, didLevelUp, level, newBadgeIds, clearNotifications } = useStore();

  const [showLevelUp, setShowLevelUp] = useState(false);

  const scoreNum = parseInt(score || '0');
  const totalNum = parseInt(total || '0');
  const percent = totalNum > 0 ? Math.round((scoreNum / totalNum) * 100) : 0;
  const phase = phases.find((p) => p.id === phaseId);
  const lesson = lessonId ? getLessonById(lessonId) : null;
  const isLessonQuiz = !!lessonId;
  const allQuestions = isLessonQuiz ? getQuizByLesson(lessonId!) : getQuizByPhase(phaseId);

  const xpEarned = lastXPGain || calculateQuizXP(scoreNum, totalNum);

  const earnedBadges = badges.filter((b) => newBadgeIds.includes(b.id));

  useEffect(() => {
    if (didLevelUp) {
      const timer = setTimeout(() => setShowLevelUp(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [didLevelUp]);

  let answers: { questionId: string; selectedIndex: number; correct: boolean }[] = [];
  try {
    answers = JSON.parse(answersJson || '[]');
  } catch {}

  const getGrade = () => {
    if (percent >= 90) return { label: 'Excellent !', icon: 'star' as const, color: '#FFD700' };
    if (percent >= 70) return { label: 'Bien joue !', icon: 'thumbs-up' as const, color: colors.success };
    if (percent >= 50) return { label: 'Pas mal', icon: 'hand-peace-o' as const, color: colors.warning };
    return { label: 'A retravailler', icon: 'refresh' as const, color: colors.error };
  };

  const grade = getGrade();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0a0e1a' : colors.background }]}>
      {isDark && (
        <LinearGradient colors={gradients.backgroundDark} style={StyleSheet.absoluteFill} />
      )}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Animated Score Circle */}
        <StaggeredView index={0} style={styles.scoreSection}>
          <AnimatedScoreCircle
            percent={percent}
            size={150}
            strokeWidth={7}
            color={grade.color}
            backgroundColor={isDark ? 'rgba(255,255,255,0.1)' : colors.borderLight}
            textColor={grade.color}
            subtitleColor={colors.textSecondary}
            score={scoreNum}
            total={totalNum}
          />
        </StaggeredView>

        {/* Grade */}
        <StaggeredView index={1} style={styles.gradeSection}>
          <FontAwesome name={grade.icon} size={32} color={grade.color} />
          <Text style={[styles.gradeLabel, { color: grade.color }]}>{grade.label}</Text>
          {(lesson || phase) && (
            <Text style={[styles.phaseLabel, { color: colors.textSecondary }]}>
              {isLessonQuiz ? lesson?.title : phase?.title}
            </Text>
          )}
        </StaggeredView>

        {/* XP Earned */}
        <StaggeredView index={2} style={styles.xpSection}>
          <AnimatedXPCounter xp={xpEarned} delay={800} />
        </StaggeredView>

        {/* New Badges */}
        {earnedBadges.length > 0 && (
          <StaggeredView index={3} style={styles.newBadgesSection}>
            <Text style={[styles.newBadgesTitle, { color: colors.text }]}>Nouveau badge !</Text>
            <View style={styles.newBadgesRow}>
              {earnedBadges.map((badge) => (
                <BadgeIcon key={badge.id} icon={badge.icon} rarity={badge.rarity} name={badge.name} size={64} earned />
              ))}
            </View>
          </StaggeredView>
        )}

        {/* Stats */}
        <StaggeredView index={4} style={styles.statsRow}>
          <GlassCard
            isDark={isDark}
            style={styles.statBox}
            glassColors={isDark ? ['rgba(46,204,113,0.12)', 'rgba(46,204,113,0.06)'] as const : ['rgba(46,204,113,0.08)', 'rgba(46,204,113,0.04)'] as const}
            borderColor={isDark ? 'rgba(46,204,113,0.2)' : 'rgba(46,204,113,0.3)'}
          >
            <FontAwesome name="check" size={18} color={colors.success} />
            <Text style={[styles.statValue, { color: colors.success }]}>{scoreNum}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Correctes</Text>
          </GlassCard>
          <GlassCard
            isDark={isDark}
            style={styles.statBox}
            glassColors={isDark ? ['rgba(231,76,60,0.12)', 'rgba(231,76,60,0.06)'] as const : ['rgba(231,76,60,0.08)', 'rgba(231,76,60,0.04)'] as const}
            borderColor={isDark ? 'rgba(231,76,60,0.2)' : 'rgba(231,76,60,0.3)'}
          >
            <FontAwesome name="times" size={18} color={colors.error} />
            <Text style={[styles.statValue, { color: colors.error }]}>{totalNum - scoreNum}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Incorrectes</Text>
          </GlassCard>
        </StaggeredView>

        {/* Answer Details */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Detail des reponses</Text>
        {answers.map((answer, i) => {
          const question = allQuestions.find((q) => q.id === answer.questionId);
          if (!question) return null;
          return (
            <StaggeredView key={i} index={i + 5}>
              <GlassCard
                isDark={isDark}
                style={styles.answerCard}
                glassColors={
                  answer.correct
                    ? isDark ? ['rgba(46,204,113,0.1)', 'rgba(46,204,113,0.05)'] as const : ['rgba(46,204,113,0.08)', 'rgba(46,204,113,0.03)'] as const
                    : isDark ? ['rgba(231,76,60,0.1)', 'rgba(231,76,60,0.05)'] as const : ['rgba(231,76,60,0.08)', 'rgba(231,76,60,0.03)'] as const
                }
                borderColor={answer.correct ? 'rgba(46,204,113,0.2)' : 'rgba(231,76,60,0.2)'}
              >
                <View style={styles.answerHeader}>
                  <FontAwesome
                    name={answer.correct ? 'check-circle' : 'times-circle'}
                    size={18}
                    color={answer.correct ? colors.success : colors.error}
                  />
                  <Text style={[styles.answerQuestion, { color: colors.text }]} numberOfLines={2}>
                    {question.question}
                  </Text>
                </View>
                {!answer.correct && (
                  <View style={styles.answerDetails}>
                    {answer.selectedIndex >= 0 && (
                      <Text style={[styles.wrongAnswer, { color: colors.error }]}>
                        Votre reponse: {question.options[answer.selectedIndex]}
                      </Text>
                    )}
                    {answer.selectedIndex < 0 && (
                      <Text style={[styles.wrongAnswer, { color: colors.error }]}>Temps ecoule</Text>
                    )}
                    <Text style={[styles.correctAnswer, { color: colors.success }]}>
                      Bonne reponse: {question.options[question.correctIndex]}
                    </Text>
                  </View>
                )}
              </GlassCard>
            </StaggeredView>
          );
        })}

        {/* Actions */}
        <View style={styles.actions}>
          <AnimatedPressable
            style={{ flex: 1 }}
            onPress={() => {
              clearNotifications();
              router.replace(isLessonQuiz ? `/quiz/lesson/${lessonId}` : `/quiz/${phaseId}`);
            }}>
            <LinearGradient
              colors={[phase?.color || colors.tint, (phase?.color || colors.tint) + 'CC'] as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.retryBtn}>
              <FontAwesome name="refresh" size={16} color="#fff" />
              <Text style={styles.retryBtnText}>Reessayer</Text>
            </LinearGradient>
          </AnimatedPressable>
          <AnimatedPressable
            onPress={() => {
              clearNotifications();
              router.replace('/(tabs)');
            }}>
            <GlassCard isDark={isDark} style={styles.homeBtn}>
              <FontAwesome name="home" size={16} color={colors.text} />
              <Text style={[styles.homeBtnText, { color: colors.text }]}>Accueil</Text>
            </GlassCard>
          </AnimatedPressable>
        </View>
      </ScrollView>

      <LevelUpModal
        visible={showLevelUp}
        level={level}
        onClose={() => {
          setShowLevelUp(false);
          clearNotifications();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: Spacing.xl },
  scoreSection: { alignItems: 'center', paddingTop: Spacing.xxl },
  gradeSection: { alignItems: 'center', marginTop: Spacing.lg },
  gradeLabel: { fontSize: 22, fontFamily: Fonts.bold, marginTop: Spacing.sm },
  phaseLabel: { fontSize: 14, fontFamily: Fonts.medium, marginTop: 4 },
  xpSection: { alignItems: 'center', marginTop: Spacing.lg },
  newBadgesSection: { alignItems: 'center', marginTop: Spacing.lg },
  newBadgesTitle: { fontSize: 16, fontFamily: Fonts.bold, marginBottom: 8 },
  newBadgesRow: { flexDirection: 'row', gap: 16 },
  statsRow: { flexDirection: 'row', gap: 12, marginVertical: Spacing.lg },
  statBox: {
    flex: 1, alignItems: 'center', padding: Spacing.lg, gap: 6,
  },
  statValue: { fontSize: 24, fontFamily: Fonts.extraBold },
  statLabel: { fontSize: 12, fontFamily: Fonts.medium },
  sectionTitle: { fontSize: 18, fontFamily: Fonts.semiBold, marginTop: 10, marginBottom: Spacing.md },
  answerCard: {
    padding: 14, marginBottom: Spacing.sm,
  },
  answerHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  answerQuestion: { flex: 1, fontSize: 14, fontFamily: Fonts.medium, lineHeight: 20 },
  answerDetails: { marginTop: Spacing.sm, marginLeft: 28 },
  wrongAnswer: { fontSize: 13, fontFamily: Fonts.regular, lineHeight: 20 },
  correctAnswer: { fontSize: 13, fontFamily: Fonts.regular, lineHeight: 20, marginTop: 2 },
  actions: { flexDirection: 'row', gap: 12, marginTop: Spacing.xxl },
  retryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: Spacing.lg, borderRadius: 14,
  },
  retryBtnText: { color: '#fff', fontSize: 16, fontFamily: Fonts.semiBold },
  homeBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: Spacing.lg,
  },
  homeBtnText: { fontSize: 16, fontFamily: Fonts.semiBold },
});
