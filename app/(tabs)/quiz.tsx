import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import Colors, { Spacing, Fonts } from '@/constants/Colors';
import { useStore } from '@/store/useStore';
import { phases } from '@/data/phases';
import { getQuizByPhase } from '@/data/quizzes';
import { cardShadow } from '@/components/ui/shadows';
import AnimatedPressable from '@/components/ui/AnimatedPressable';
import { useStaggeredEntry } from '@/components/ui/useStaggeredEntry';

function StaggeredCard({ index, children }: { index: number; children: React.ReactNode }) {
  const animStyle = useStaggeredEntry(index, 80);
  return <Animated.View style={animStyle}>{children}</Animated.View>;
}

export default function QuizListScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();
  const { quizAttempts } = useStore();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>QCM par Phase</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Testez vos connaissances - 10 questions aléatoires par session
        </Text>
      </View>

      {phases.map((phase, index) => {
        const questions = getQuizByPhase(phase.id);
        const attempts = quizAttempts.filter((a) => a.phaseId === phase.id);
        const bestScore = attempts.length > 0
          ? Math.max(...attempts.map((a) => Math.round((a.score / a.totalQuestions) * 100)))
          : null;
        const lastScore = attempts.length > 0
          ? Math.round((attempts[0].score / attempts[0].totalQuestions) * 100)
          : null;

        return (
          <StaggeredCard key={phase.id} index={index}>
            <AnimatedPressable
              style={[styles.quizCard, { backgroundColor: colors.card }, cardShadow(colorScheme)]}
              onPress={() => router.push(`/quiz/${phase.id}`)}>
              <LinearGradient
                colors={[phase.color, phase.color + 'CC'] as [string, string]}
                style={styles.iconContainer}>
                <FontAwesome name="question-circle" size={24} color="#fff" />
              </LinearGradient>
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{phase.title}</Text>
                <Text style={[styles.cardInfo, { color: colors.textSecondary }]}>
                  {questions.length} questions disponibles
                </Text>
                {attempts.length > 0 && (
                  <View style={styles.scoresRow}>
                    <View style={[styles.scoreBadge, { backgroundColor: lastScore! >= 70 ? colors.successLight : colors.errorLight }]}>
                      <Text style={[styles.scoreBadgeText, { color: lastScore! >= 70 ? colors.success : colors.error }]}>
                        Dernier: {lastScore}%
                      </Text>
                    </View>
                    <View style={[styles.scoreBadge, { backgroundColor: bestScore! >= 70 ? colors.successLight : colors.warningLight }]}>
                      <Text style={[styles.scoreBadgeText, { color: bestScore! >= 70 ? colors.success : colors.warning }]}>
                        Best: {bestScore}%
                      </Text>
                    </View>
                    <Text style={[styles.attemptText, { color: colors.textSecondary }]}>
                      {attempts.length}x
                    </Text>
                  </View>
                )}
              </View>
              <FontAwesome name="play-circle" size={28} color={phase.color} />
            </AnimatedPressable>
          </StaggeredCard>
        );
      })}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.lg, paddingBottom: Spacing.sm },
  title: { fontSize: 24, fontFamily: Fonts.extraBold },
  subtitle: { fontSize: 14, fontFamily: Fonts.regular, marginTop: 4 },
  quizCard: {
    marginHorizontal: Spacing.xl, marginVertical: Spacing.sm, padding: Spacing.lg, borderRadius: 16,
    flexDirection: 'row', alignItems: 'center', gap: 14,
  },
  iconContainer: {
    width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center',
  },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontFamily: Fonts.semiBold },
  cardInfo: { fontSize: 13, fontFamily: Fonts.regular, marginTop: 2 },
  scoresRow: { flexDirection: 'row', gap: 8, marginTop: 8, flexWrap: 'wrap', alignItems: 'center' },
  scoreBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  scoreBadgeText: { fontSize: 11, fontFamily: Fonts.semiBold },
  attemptText: { fontSize: 11, fontFamily: Fonts.medium },
});
