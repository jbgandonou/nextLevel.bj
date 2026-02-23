import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import Colors, { Spacing, Fonts } from '@/constants/Colors';
import { phases } from '@/data/phases';
import { getQuizByPhase, getQuizByLesson } from '@/data/quizzes';
import { getLessonById } from '@/data/lessons';
import { cardShadow } from '@/components/ui/shadows';
import AnimatedPressable from '@/components/ui/AnimatedPressable';
import AnimatedScoreCircle from '@/components/ui/AnimatedScoreCircle';
import { useStaggeredEntry } from '@/components/ui/useStaggeredEntry';

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
  const router = useRouter();

  const scoreNum = parseInt(score || '0');
  const totalNum = parseInt(total || '0');
  const percent = totalNum > 0 ? Math.round((scoreNum / totalNum) * 100) : 0;
  const phase = phases.find((p) => p.id === phaseId);
  const lesson = lessonId ? getLessonById(lessonId) : null;
  const isLessonQuiz = !!lessonId;
  const allQuestions = isLessonQuiz ? getQuizByLesson(lessonId!) : getQuizByPhase(phaseId);

  let answers: { questionId: string; selectedIndex: number; correct: boolean }[] = [];
  try {
    answers = JSON.parse(answersJson || '[]');
  } catch {}

  const getGrade = () => {
    if (percent >= 90) return { label: 'Excellent !', icon: 'star' as const, color: '#FFD700' };
    if (percent >= 70) return { label: 'Bien joué !', icon: 'thumbs-up' as const, color: colors.success };
    if (percent >= 50) return { label: 'Pas mal', icon: 'hand-peace-o' as const, color: colors.warning };
    return { label: 'À retravailler', icon: 'refresh' as const, color: colors.error };
  };

  const grade = getGrade();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Animated Score Circle */}
        <StaggeredView index={0} style={styles.scoreSection}>
          <AnimatedScoreCircle
            percent={percent}
            size={150}
            strokeWidth={7}
            color={grade.color}
            backgroundColor={colors.borderLight}
            textColor={grade.color}
            subtitleColor={colors.textSecondary}
            score={scoreNum}
            total={totalNum}
          />
        </StaggeredView>

        {/* Grade (delayed after circle) */}
        <StaggeredView index={2} style={styles.gradeSection}>
          <FontAwesome name={grade.icon} size={32} color={grade.color} />
          <Text style={[styles.gradeLabel, { color: grade.color }]}>{grade.label}</Text>
          {(lesson || phase) && (
            <Text style={[styles.phaseLabel, { color: colors.textSecondary }]}>
              {isLessonQuiz ? lesson?.title : phase?.title}
            </Text>
          )}
        </StaggeredView>

        {/* Stats */}
        <StaggeredView index={3} style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: colors.successLight }, cardShadow(colorScheme)]}>
            <FontAwesome name="check" size={18} color={colors.success} />
            <Text style={[styles.statValue, { color: colors.success }]}>{scoreNum}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Correctes</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.errorLight }, cardShadow(colorScheme)]}>
            <FontAwesome name="times" size={18} color={colors.error} />
            <Text style={[styles.statValue, { color: colors.error }]}>{totalNum - scoreNum}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Incorrectes</Text>
          </View>
        </StaggeredView>

        {/* Answer Details */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Détail des réponses</Text>
        {answers.map((answer, i) => {
          const question = allQuestions.find((q) => q.id === answer.questionId);
          if (!question) return null;
          return (
            <StaggeredView key={i} index={i + 4}>
              <View
                style={[styles.answerCard, {
                  backgroundColor: answer.correct ? colors.successLight : colors.errorLight,
                }]}>
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
                        Votre réponse: {question.options[answer.selectedIndex]}
                      </Text>
                    )}
                    {answer.selectedIndex < 0 && (
                      <Text style={[styles.wrongAnswer, { color: colors.error }]}>Temps écoulé</Text>
                    )}
                    <Text style={[styles.correctAnswer, { color: colors.success }]}>
                      Bonne réponse: {question.options[question.correctIndex]}
                    </Text>
                  </View>
                )}
              </View>
            </StaggeredView>
          );
        })}

        {/* Actions */}
        <View style={styles.actions}>
          <AnimatedPressable
            style={{ flex: 1 }}
            onPress={() => router.replace(isLessonQuiz ? `/quiz/lesson/${lessonId}` : `/quiz/${phaseId}`)}>
            <LinearGradient
              colors={[phase?.color || colors.tint, (phase?.color || colors.tint) + 'CC'] as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.retryBtn}>
              <FontAwesome name="refresh" size={16} color="#fff" />
              <Text style={styles.retryBtnText}>Réessayer</Text>
            </LinearGradient>
          </AnimatedPressable>
          <AnimatedPressable
            style={[styles.homeBtn, { backgroundColor: colors.card }, cardShadow(colorScheme)]}
            onPress={() => router.replace('/(tabs)')}>
            <FontAwesome name="home" size={16} color={colors.text} />
            <Text style={[styles.homeBtnText, { color: colors.text }]}>Accueil</Text>
          </AnimatedPressable>
        </View>
      </ScrollView>
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
  statsRow: { flexDirection: 'row', gap: 12, marginVertical: Spacing.lg },
  statBox: {
    flex: 1, alignItems: 'center', padding: Spacing.lg, borderRadius: 14, gap: 6,
  },
  statValue: { fontSize: 24, fontFamily: Fonts.extraBold },
  statLabel: { fontSize: 12, fontFamily: Fonts.medium },
  sectionTitle: { fontSize: 18, fontFamily: Fonts.semiBold, marginTop: 10, marginBottom: Spacing.md },
  answerCard: {
    padding: 14, borderRadius: 12, marginBottom: Spacing.sm,
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
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: Spacing.lg, borderRadius: 14,
  },
  homeBtnText: { fontSize: 16, fontFamily: Fonts.semiBold },
});
