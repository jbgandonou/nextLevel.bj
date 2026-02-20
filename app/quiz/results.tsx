import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { phases } from '@/data/phases';
import { getQuizByPhase } from '@/data/quizzes';

export default function ResultsScreen() {
  const { phaseId, score, total, answersJson } = useLocalSearchParams<{
    phaseId: string;
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
  const allQuestions = getQuizByPhase(phaseId);

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
        {/* Score Circle */}
        <View style={styles.scoreSection}>
          <View style={[styles.scoreCircle, { borderColor: grade.color }]}>
            <Text style={[styles.scorePercent, { color: grade.color }]}>{percent}%</Text>
            <Text style={[styles.scoreLabel, { color: colors.textSecondary }]}>
              {scoreNum}/{totalNum}
            </Text>
          </View>
          <FontAwesome name={grade.icon} size={32} color={grade.color} style={{ marginTop: 16 }} />
          <Text style={[styles.gradeLabel, { color: grade.color }]}>{grade.label}</Text>
          {phase && (
            <Text style={[styles.phaseLabel, { color: colors.textSecondary }]}>{phase.title}</Text>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: colors.success + '15' }]}>
            <FontAwesome name="check" size={18} color={colors.success} />
            <Text style={[styles.statValue, { color: colors.success }]}>{scoreNum}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Correctes</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.error + '15' }]}>
            <FontAwesome name="times" size={18} color={colors.error} />
            <Text style={[styles.statValue, { color: colors.error }]}>{totalNum - scoreNum}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Incorrectes</Text>
          </View>
        </View>

        {/* Answer Details */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Détail des réponses</Text>
        {answers.map((answer, i) => {
          const question = allQuestions.find((q) => q.id === answer.questionId);
          if (!question) return null;
          return (
            <View
              key={i}
              style={[styles.answerCard, {
                backgroundColor: colors.card,
                borderColor: answer.correct ? colors.success : colors.error,
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
          );
        })}

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable
            style={[styles.retryBtn, { backgroundColor: phase?.color || colors.tint }]}
            onPress={() => router.replace(`/quiz/${phaseId}`)}>
            <FontAwesome name="refresh" size={16} color="#fff" />
            <Text style={styles.retryBtnText}>Réessayer</Text>
          </Pressable>
          <Pressable
            style={[styles.homeBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.replace('/(tabs)')}>
            <FontAwesome name="home" size={16} color={colors.text} />
            <Text style={[styles.homeBtnText, { color: colors.text }]}>Accueil</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  scoreSection: { alignItems: 'center', paddingVertical: 24 },
  scoreCircle: {
    width: 140, height: 140, borderRadius: 70, borderWidth: 6,
    alignItems: 'center', justifyContent: 'center',
  },
  scorePercent: { fontSize: 36, fontWeight: 'bold' },
  scoreLabel: { fontSize: 16, marginTop: 2 },
  gradeLabel: { fontSize: 22, fontWeight: '700', marginTop: 8 },
  phaseLabel: { fontSize: 14, marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 12, marginVertical: 16 },
  statBox: {
    flex: 1, alignItems: 'center', padding: 16, borderRadius: 14, gap: 6,
  },
  statValue: { fontSize: 24, fontWeight: 'bold' },
  statLabel: { fontSize: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 10, marginBottom: 12 },
  answerCard: {
    padding: 14, borderRadius: 12, borderLeftWidth: 4, marginBottom: 8,
  },
  answerHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  answerQuestion: { flex: 1, fontSize: 14, fontWeight: '500', lineHeight: 20 },
  answerDetails: { marginTop: 8, marginLeft: 28 },
  wrongAnswer: { fontSize: 13, lineHeight: 20 },
  correctAnswer: { fontSize: 13, lineHeight: 20, marginTop: 2 },
  actions: { flexDirection: 'row', gap: 12, marginTop: 24 },
  retryBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: 16, borderRadius: 14,
  },
  retryBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  homeBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: 16, borderRadius: 14, borderWidth: 1,
  },
  homeBtnText: { fontSize: 16, fontWeight: '600' },
});
