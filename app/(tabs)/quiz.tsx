import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useStore } from '@/store/useStore';
import { phases } from '@/data/phases';
import { getQuizByPhase } from '@/data/quizzes';

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

      {phases.map((phase) => {
        const questions = getQuizByPhase(phase.id);
        const attempts = quizAttempts.filter((a) => a.phaseId === phase.id);
        const bestScore = attempts.length > 0
          ? Math.max(...attempts.map((a) => Math.round((a.score / a.totalQuestions) * 100)))
          : null;
        const lastScore = attempts.length > 0
          ? Math.round((attempts[0].score / attempts[0].totalQuestions) * 100)
          : null;

        return (
          <Pressable
            key={phase.id}
            style={[styles.quizCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push(`/quiz/${phase.id}`)}>
            <View style={[styles.iconContainer, { backgroundColor: phase.color }]}>
              <FontAwesome name="question-circle" size={24} color="#fff" />
            </View>
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>{phase.title}</Text>
              <Text style={[styles.cardInfo, { color: colors.textSecondary }]}>
                {questions.length} questions disponibles
              </Text>
              {attempts.length > 0 && (
                <View style={styles.scoresRow}>
                  <Text style={[styles.scoreText, { color: colors.textSecondary }]}>
                    Dernier: <Text style={{ color: lastScore! >= 70 ? colors.success : colors.error, fontWeight: '600' }}>{lastScore}%</Text>
                  </Text>
                  <Text style={[styles.scoreText, { color: colors.textSecondary }]}>
                    Meilleur: <Text style={{ color: bestScore! >= 70 ? colors.success : colors.warning, fontWeight: '600' }}>{bestScore}%</Text>
                  </Text>
                  <Text style={[styles.scoreText, { color: colors.textSecondary }]}>
                    {attempts.length} tentative{attempts.length > 1 ? 's' : ''}
                  </Text>
                </View>
              )}
            </View>
            <FontAwesome name="play-circle" size={28} color={phase.color} />
          </Pressable>
        );
      })}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginTop: 4 },
  quizCard: {
    marginHorizontal: 20, marginVertical: 8, padding: 16, borderRadius: 16,
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, gap: 14,
  },
  iconContainer: {
    width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
  },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardInfo: { fontSize: 13, marginTop: 2 },
  scoresRow: { flexDirection: 'row', gap: 12, marginTop: 6, flexWrap: 'wrap' },
  scoreText: { fontSize: 12 },
});
