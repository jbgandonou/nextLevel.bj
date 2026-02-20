import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useStore } from '@/store/useStore';
import { phases } from '@/data/phases';
import { getAllLessons } from '@/data/lessons';

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { completedLessons, quizAttempts, streak } = useStore();

  const allLessons = getAllLessons();
  const totalLessons = allLessons.length;
  const completedCount = completedLessons.length;

  const phaseStats = phases.map((phase) => {
    const phaseLessons = phase.lessonIds.length;
    const phaseCompleted = phase.lessonIds.filter((id) => completedLessons.includes(id)).length;
    const phaseAttempts = quizAttempts.filter((a) => a.phaseId === phase.id);
    const avgScore = phaseAttempts.length > 0
      ? Math.round(phaseAttempts.reduce((sum, a) => sum + (a.score / a.totalQuestions) * 100, 0) / phaseAttempts.length)
      : null;
    return { phase, phaseLessons, phaseCompleted, attempts: phaseAttempts.length, avgScore };
  });

  const totalAttempts = quizAttempts.length;
  const overallAvg = totalAttempts > 0
    ? Math.round(quizAttempts.reduce((sum, a) => sum + (a.score / a.totalQuestions) * 100, 0) / totalAttempts)
    : 0;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
          <FontAwesome name="user" size={40} color="#fff" />
        </View>
        <Text style={[styles.name, { color: colors.text }]}>AI Security Learner</Text>
        <Text style={[styles.bio, { color: colors.textSecondary }]}>En route vers le niveau suivant</Text>
      </View>

      {/* Global Stats */}
      <View style={styles.statsGrid}>
        <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <FontAwesome name="fire" size={22} color={colors.warning} />
          <Text style={[styles.statValue, { color: colors.text }]}>{streak}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Jours streak</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <FontAwesome name="book" size={22} color={colors.tint} />
          <Text style={[styles.statValue, { color: colors.text }]}>{completedCount}/{totalLessons}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Leçons</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <FontAwesome name="pencil" size={22} color="#7B68EE" />
          <Text style={[styles.statValue, { color: colors.text }]}>{totalAttempts}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>QCM passés</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <FontAwesome name="bar-chart" size={22} color={colors.success} />
          <Text style={[styles.statValue, { color: colors.text }]}>{overallAvg}%</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Score moyen</Text>
        </View>
      </View>

      {/* Per Phase Stats */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Détails par phase</Text>
      {phaseStats.map(({ phase, phaseLessons, phaseCompleted, attempts, avgScore }) => (
        <View key={phase.id} style={[styles.phaseRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.phaseDot, { backgroundColor: phase.color }]} />
          <View style={styles.phaseInfo}>
            <Text style={[styles.phaseName, { color: colors.text }]}>{phase.title}</Text>
            <View style={styles.phaseDetails}>
              <Text style={[styles.phaseDetail, { color: colors.textSecondary }]}>
                {phaseCompleted}/{phaseLessons} leçons
              </Text>
              {avgScore !== null && (
                <Text style={[styles.phaseDetail, { color: avgScore >= 70 ? colors.success : colors.error }]}>
                  Score: {avgScore}%
                </Text>
              )}
              {attempts > 0 && (
                <Text style={[styles.phaseDetail, { color: colors.textSecondary }]}>
                  {attempts} QCM
                </Text>
              )}
            </View>
          </View>
          <View style={[styles.miniProgress, { backgroundColor: colors.border }]}>
            <View
              style={[
                styles.miniProgressFill,
                {
                  width: `${phaseLessons > 0 ? (phaseCompleted / phaseLessons) * 100 : 0}%`,
                  backgroundColor: phase.color,
                },
              ]}
            />
          </View>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', paddingTop: 30, paddingBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 22, fontWeight: 'bold', marginTop: 12 },
  bio: { fontSize: 14, marginTop: 4 },
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 10,
  },
  statBox: {
    width: '47%', flexGrow: 1, alignItems: 'center', padding: 16, borderRadius: 16, borderWidth: 1, gap: 6,
  },
  statValue: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '600', paddingHorizontal: 20, marginTop: 24, marginBottom: 10 },
  phaseRow: {
    marginHorizontal: 20, marginVertical: 4, padding: 14, borderRadius: 12,
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, gap: 12,
  },
  phaseDot: { width: 12, height: 12, borderRadius: 6 },
  phaseInfo: { flex: 1 },
  phaseName: { fontSize: 14, fontWeight: '600' },
  phaseDetails: { flexDirection: 'row', gap: 12, marginTop: 4 },
  phaseDetail: { fontSize: 12 },
  miniProgress: { width: 50, height: 5, borderRadius: 3, overflow: 'hidden' },
  miniProgressFill: { height: '100%', borderRadius: 3 },
});
