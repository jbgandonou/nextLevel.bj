import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useStore } from '@/store/useStore';
import { phases } from '@/data/phases';
import { getAllLessons } from '@/data/lessons';

export default function DashboardScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();
  const { completedLessons, quizAttempts, streak, isLoaded } = useStore();

  if (!isLoaded) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Chargement...</Text>
      </View>
    );
  }

  const allLessons = getAllLessons();
  const totalLessons = allLessons.length;
  const completedCount = completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const currentPhase = phases.find((phase) => {
    return !phase.lessonIds.every((id) => completedLessons.includes(id));
  }) || phases[phases.length - 1];

  const lastAttempt = quizAttempts.length > 0 ? quizAttempts[0] : null;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.text }]}>NextLevel.bj</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          AI Security Engineer Roadmap
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Progression globale</Text>
        <View style={styles.progressBarRow}>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View
              style={[styles.progressFill, { width: `${progressPercent}%`, backgroundColor: colors.tint }]}
            />
          </View>
          <Text style={[styles.progressText, { color: colors.tint }]}>{progressPercent}%</Text>
        </View>
        <Text style={[styles.progressDetail, { color: colors.textSecondary }]}>
          {completedCount}/{totalLessons} leçons terminées
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <FontAwesome name="fire" size={24} color={colors.warning} />
          <Text style={[styles.statNumber, { color: colors.text }]}>{streak}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Streak</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <FontAwesome name="check-circle" size={24} color={colors.success} />
          <Text style={[styles.statNumber, { color: colors.text }]}>{completedCount}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Leçons</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <FontAwesome name="trophy" size={24} color="#F39C12" />
          <Text style={[styles.statNumber, { color: colors.text }]}>
            {lastAttempt ? `${Math.round((lastAttempt.score / lastAttempt.totalQuestions) * 100)}%` : '-'}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Dernier QCM</Text>
        </View>
      </View>

      <Pressable
        style={[styles.currentPhaseCard, { backgroundColor: currentPhase.color }]}
        onPress={() => router.push(`/phase/${currentPhase.id}`)}>
        <View style={styles.currentPhaseContent}>
          <Text style={styles.phaseLabel}>Phase actuelle</Text>
          <Text style={styles.phaseTitle}>{currentPhase.title}</Text>
          <Text style={styles.phaseSubtitle}>{currentPhase.subtitle}</Text>
          <Text style={styles.phaseMonths}>{currentPhase.months}</Text>
        </View>
        <FontAwesome name="chevron-right" size={20} color="rgba(255,255,255,0.8)" />
      </Pressable>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Accès rapide</Text>
      <View style={styles.quickActions}>
        <Pressable
          style={[styles.actionBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => router.push('/(tabs)/phases')}>
          <FontAwesome name="list-ol" size={20} color={colors.tint} />
          <Text style={[styles.actionText, { color: colors.text }]}>Toutes les phases</Text>
        </Pressable>
        <Pressable
          style={[styles.actionBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => router.push(`/quiz/${currentPhase.id}`)}>
          <FontAwesome name="question-circle" size={20} color={colors.tint} />
          <Text style={[styles.actionText, { color: colors.text }]}>Lancer un QCM</Text>
        </Pressable>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  greeting: { fontSize: 28, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginTop: 4 },
  card: { marginHorizontal: 20, marginVertical: 10, padding: 20, borderRadius: 16, borderWidth: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  progressBarRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  progressBar: { flex: 1, height: 10, borderRadius: 5, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 5 },
  progressText: { fontSize: 18, fontWeight: 'bold', minWidth: 45, textAlign: 'right' },
  progressDetail: { fontSize: 13, marginTop: 8 },
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginVertical: 10 },
  statCard: { flex: 1, alignItems: 'center', padding: 16, borderRadius: 16, borderWidth: 1, gap: 6 },
  statNumber: { fontSize: 22, fontWeight: 'bold' },
  statLabel: { fontSize: 12 },
  currentPhaseCard: {
    marginHorizontal: 20, marginVertical: 10, padding: 20, borderRadius: 16,
    flexDirection: 'row', alignItems: 'center',
  },
  currentPhaseContent: { flex: 1 },
  phaseLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '600', textTransform: 'uppercase' },
  phaseTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  phaseSubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 14, marginTop: 4 },
  phaseMonths: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '600', paddingHorizontal: 20, marginTop: 10 },
  quickActions: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginTop: 10 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 16, borderRadius: 12, borderWidth: 1 },
  actionText: { fontSize: 14, fontWeight: '500' },
});
