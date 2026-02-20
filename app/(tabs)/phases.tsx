import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useStore } from '@/store/useStore';
import { phases } from '@/data/phases';

export default function PhasesScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();
  const { completedLessons } = useStore();

  const getPhaseStatus = (phase: typeof phases[0]) => {
    const completed = phase.lessonIds.filter((id) => completedLessons.includes(id)).length;
    const total = phase.lessonIds.length;
    if (completed === total && total > 0) return 'completed';
    if (completed > 0) return 'in_progress';
    return 'pending';
  };

  const getPhaseProgress = (phase: typeof phases[0]) => {
    const completed = phase.lessonIds.filter((id) => completedLessons.includes(id)).length;
    return phase.lessonIds.length > 0 ? completed / phase.lessonIds.length : 0;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Les 6 Phases</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          12 mois pour devenir AI Security Engineer
        </Text>
      </View>

      {phases.map((phase, index) => {
        const status = getPhaseStatus(phase);
        const progress = getPhaseProgress(phase);
        const completedCount = phase.lessonIds.filter((id) => completedLessons.includes(id)).length;

        return (
          <Pressable
            key={phase.id}
            style={[styles.phaseCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push(`/phase/${phase.id}`)}>
            <View style={[styles.phaseNumber, { backgroundColor: phase.color }]}>
              <Text style={styles.phaseNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.phaseContent}>
              <View style={styles.phaseHeader}>
                <Text style={[styles.phaseTitle, { color: colors.text }]}>{phase.title}</Text>
                {status === 'completed' && (
                  <FontAwesome name="check-circle" size={20} color={colors.success} />
                )}
                {status === 'in_progress' && (
                  <FontAwesome name="spinner" size={20} color={phase.color} />
                )}
              </View>
              <Text style={[styles.phaseSubtitle, { color: colors.textSecondary }]}>
                {phase.subtitle}
              </Text>
              <Text style={[styles.phaseMonths, { color: phase.color }]}>{phase.months}</Text>

              <View style={styles.tagsRow}>
                {phase.tags.slice(0, 3).map((tag) => (
                  <View key={tag} style={[styles.tag, { backgroundColor: phase.color + '20' }]}>
                    <Text style={[styles.tagText, { color: phase.color }]}>{tag}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.progressRow}>
                <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                  <View
                    style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: phase.color }]}
                  />
                </View>
                <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
                  {completedCount}/{phase.lessonIds.length}
                </Text>
              </View>
            </View>
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
  phaseCard: {
    marginHorizontal: 20, marginVertical: 8, padding: 16, borderRadius: 16,
    flexDirection: 'row', borderWidth: 1, gap: 14,
  },
  phaseNumber: {
    width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center',
  },
  phaseNumberText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  phaseContent: { flex: 1 },
  phaseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  phaseTitle: { fontSize: 17, fontWeight: '700', flex: 1, marginRight: 8 },
  phaseSubtitle: { fontSize: 13, marginTop: 2 },
  phaseMonths: { fontSize: 12, fontWeight: '600', marginTop: 4 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  tag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  tagText: { fontSize: 11, fontWeight: '600' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
  progressBar: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  progressLabel: { fontSize: 12, minWidth: 30 },
});
