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
import { cardShadow } from '@/components/ui/shadows';
import AnimatedPressable from '@/components/ui/AnimatedPressable';
import GradientProgressBar from '@/components/ui/GradientProgressBar';
import { useStaggeredEntry } from '@/components/ui/useStaggeredEntry';

function StaggeredCard({ index, children }: { index: number; children: React.ReactNode }) {
  const animStyle = useStaggeredEntry(index, 100);
  return <Animated.View style={animStyle}>{children}</Animated.View>;
}

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
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
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
          <StaggeredCard key={phase.id} index={index}>
            <AnimatedPressable
              style={[styles.phaseCard, { backgroundColor: colors.card }, cardShadow(colorScheme)]}
              onPress={() => router.push(`/phase/${phase.id}`)}>
              {/* Phase number with glow */}
              <LinearGradient
                colors={[phase.color, phase.color + 'BB']}
                style={[styles.phaseNumber, {
                  shadowColor: phase.color,
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                  elevation: 5,
                }]}>
                <Text style={styles.phaseNumberText}>{index + 1}</Text>
              </LinearGradient>

              <View style={styles.phaseContent}>
                {/* Title + status */}
                <View style={styles.phaseHeader}>
                  <Text style={[styles.phaseTitle, { color: colors.text }]}>{phase.title}</Text>
                  {status === 'completed' && (
                    <View style={[styles.statusBadge, { backgroundColor: '#2ECC7115' }]}>
                      <FontAwesome name="check" size={10} color="#2ECC71" />
                      <Text style={[styles.statusText, { color: '#2ECC71' }]}>Termine</Text>
                    </View>
                  )}
                  {status === 'in_progress' && (
                    <View style={[styles.statusBadge, { backgroundColor: phase.color + '15' }]}>
                      <FontAwesome name="clock-o" size={10} color={phase.color} />
                      <Text style={[styles.statusText, { color: phase.color }]}>En cours</Text>
                    </View>
                  )}
                </View>

                <Text style={[styles.phaseSubtitle, { color: colors.textSecondary }]} numberOfLines={2}>
                  {phase.subtitle}
                </Text>

                {/* Tags */}
                <View style={styles.tagsRow}>
                  {phase.tags.slice(0, 3).map((tag) => (
                    <View key={tag} style={[styles.tag, { backgroundColor: phase.color + '12' }]}>
                      <Text style={[styles.tagText, { color: phase.color }]}>{tag}</Text>
                    </View>
                  ))}
                </View>

                {/* Progress */}
                <View style={styles.progressRow}>
                  <View style={{ flex: 1 }}>
                    <GradientProgressBar
                      progress={progress}
                      colors={[phase.color, phase.color + 'CC'] as [string, string]}
                      height={6}
                      trackColor={colors.borderLight}
                    />
                  </View>
                  <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
                    {completedCount}/{phase.lessonIds.length}
                  </Text>
                </View>

                {/* Duration */}
                <View style={styles.durationRow}>
                  <FontAwesome name="calendar" size={11} color={colors.textTertiary} />
                  <Text style={[styles.durationText, { color: colors.textTertiary }]}>{phase.months}</Text>
                </View>
              </View>
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
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  title: { fontSize: 28, fontFamily: Fonts.extraBold },
  subtitle: { fontSize: 14, fontFamily: Fonts.medium, marginTop: 4, letterSpacing: 0.2 },
  phaseCard: {
    marginHorizontal: 20, marginVertical: 8, padding: 20, borderRadius: 20,
    flexDirection: 'row', gap: 16,
  },
  phaseNumber: {
    width: 50, height: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
  },
  phaseNumberText: { color: '#fff', fontSize: 20, fontFamily: Fonts.extraBold },
  phaseContent: { flex: 1 },
  phaseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  phaseTitle: { fontSize: 18, fontFamily: Fonts.bold, flex: 1, marginRight: 8 },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8,
  },
  statusText: { fontSize: 10, fontFamily: Fonts.bold },
  phaseSubtitle: { fontSize: 13, fontFamily: Fonts.regular, marginTop: 4, lineHeight: 19 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  tag: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  tagText: { fontSize: 11, fontFamily: Fonts.semiBold },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  progressLabel: { fontSize: 12, fontFamily: Fonts.semiBold, minWidth: 30 },
  durationRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  durationText: { fontSize: 11, fontFamily: Fonts.medium },
});
