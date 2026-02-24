import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import Colors, { Spacing, Fonts } from '@/constants/Colors';
import { useStore } from '@/store/useStore';
import { phases } from '@/data/phases';
import AnimatedPressable from '@/components/ui/AnimatedPressable';
import GlassCard from '@/components/ui/GlassCard';
import GradientProgressBar from '@/components/ui/GradientProgressBar';
import { useStaggeredEntry } from '@/components/ui/useStaggeredEntry';

function StaggeredCard({ index, children }: { index: number; children: React.ReactNode }) {
  const animStyle = useStaggeredEntry(index, 100);
  return <Animated.View style={animStyle}>{children}</Animated.View>;
}

function FlowingConnector({ status, color, isDark }: { status: 'completed' | 'in_progress' | 'pending'; color: string; isDark: boolean }) {
  const flowAnim = useSharedValue(0);

  useEffect(() => {
    if (status === 'in_progress') {
      flowAnim.value = withRepeat(
        withTiming(1, { duration: 1500, easing: Easing.linear }),
        -1,
        false,
      );
    }
  }, [status]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: status === 'in_progress'
      ? 0.4 + flowAnim.value * 0.6
      : 1,
  }));

  const lineColor = status === 'completed'
    ? color
    : status === 'in_progress'
      ? color
      : isDark ? 'rgba(255,255,255,0.12)' : '#D8D8D8';

  const dashCount = 5;
  return (
    <View style={styles.connectorWrap}>
      <Animated.View style={[styles.connectorInner, animStyle]}>
        {Array.from({ length: dashCount }).map((_, i) => (
          <View key={i} style={[styles.connectorDash, { backgroundColor: lineColor }]} />
        ))}
        <FontAwesome
          name="chevron-down"
          size={10}
          color={lineColor}
          style={{ marginTop: 2 }}
        />
      </Animated.View>
    </View>
  );
}

const PHASE_ICONS: Record<string, React.ComponentProps<typeof FontAwesome>['name']> = {
  shield: 'shield',
  server: 'server',
  lock: 'lock',
  bug: 'bug',
  sitemap: 'sitemap',
  cloud: 'cloud',
};

export default function PhasesScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const isDark = colorScheme === 'dark';
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 100 : 80 }}
      showsVerticalScrollIndicator={false}
    >
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
        const isLast = index === phases.length - 1;
        const nextPhase = !isLast ? phases[index + 1] : null;
        const nextStatus = nextPhase ? getPhaseStatus(nextPhase) : 'pending';
        const isPending = status === 'pending';
        const isCurrentPhase = status === 'in_progress';
        const icon = PHASE_ICONS[phase.icon] || 'book';

        return (
          <React.Fragment key={phase.id}>
            <StaggeredCard index={index}>
              <AnimatedPressable onPress={() => router.push(`/phase/${phase.id}`)}>
                <GlassCard
                  isDark={isDark}
                  style={[
                    styles.phaseCard,
                    isCurrentPhase && {
                      shadowColor: phase.color,
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.35,
                      shadowRadius: 16,
                      elevation: 8,
                    },
                  ]}
                  borderColor={isCurrentPhase ? phase.color + '60' : undefined}
                >
                  {/* Lock overlay for pending phases */}
                  {isPending && (
                    <View style={styles.lockOverlay}>
                      <FontAwesome name="lock" size={16} color={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'} />
                    </View>
                  )}

                  {/* Phase badge with icon */}
                  <View style={styles.badgeContainer}>
                    <LinearGradient
                      colors={[phase.color, phase.color + 'BB']}
                      style={[styles.phaseNumber, {
                        shadowColor: phase.color,
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: isCurrentPhase ? 0.6 : 0.4,
                        shadowRadius: isCurrentPhase ? 12 : 8,
                        elevation: isCurrentPhase ? 8 : 5,
                        opacity: isPending ? 0.5 : 1,
                      }]}>
                      <FontAwesome name={icon} size={20} color="#fff" />
                    </LinearGradient>
                    {/* Subscript number */}
                    <View style={[styles.subscriptBadge, { backgroundColor: phase.color }]}>
                      <Text style={styles.subscriptText}>{index + 1}</Text>
                    </View>
                    {/* Glow ring for current phase */}
                    {isCurrentPhase && (
                      <View style={[styles.glowRing, { borderColor: phase.color + '40' }]} />
                    )}
                  </View>

                  <View style={[styles.phaseContent, { opacity: isPending ? 0.5 : 1 }]}>
                    {/* Title + status */}
                    <View style={styles.phaseHeader}>
                      <Text style={[styles.phaseTitle, { color: colors.text }]}>{phase.title}</Text>
                      {status === 'completed' && (
                        <View style={[styles.statusBadge, { backgroundColor: '#2ECC7120' }]}>
                          <FontAwesome name="check" size={10} color="#2ECC71" />
                          <Text style={[styles.statusText, { color: '#2ECC71' }]}>Termine</Text>
                        </View>
                      )}
                      {status === 'in_progress' && (
                        <View style={[styles.statusBadge, { backgroundColor: phase.color + '20' }]}>
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
                        <View key={tag} style={[styles.tag, { backgroundColor: phase.color + '18' }]}>
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
                          trackColor={isDark ? 'rgba(255,255,255,0.1)' : colors.borderLight}
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
                </GlassCard>
              </AnimatedPressable>
            </StaggeredCard>

            {/* Connector between phases */}
            {!isLast && (
              <FlowingConnector
                status={status === 'completed' ? 'completed' : nextStatus === 'in_progress' ? 'in_progress' : 'pending'}
                color={phase.color}
                isDark={isDark}
              />
            )}
          </React.Fragment>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  title: { fontSize: 28, fontFamily: Fonts.extraBold },
  subtitle: { fontSize: 14, fontFamily: Fonts.medium, marginTop: 4, letterSpacing: 0.2 },

  // Phase card
  phaseCard: {
    marginHorizontal: 20, marginVertical: 4, padding: 18,
    flexDirection: 'row', gap: 16,
  },
  badgeContainer: { position: 'relative' },
  phaseNumber: {
    width: 50, height: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
  },
  subscriptBadge: {
    position: 'absolute', bottom: -4, right: -4,
    width: 18, height: 18, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(0,0,0,0.2)',
  },
  subscriptText: { color: '#fff', fontSize: 9, fontFamily: Fonts.bold },
  glowRing: {
    position: 'absolute', top: -4, left: -4, right: -4, bottom: -4,
    borderRadius: 20, borderWidth: 2,
  },
  lockOverlay: {
    position: 'absolute', top: 12, right: 12, zIndex: 10,
  },

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

  // Connectors
  connectorWrap: {
    alignItems: 'center', paddingVertical: 4, marginHorizontal: 20,
  },
  connectorInner: { alignItems: 'center', gap: 4 },
  connectorDash: {
    width: 3, height: 6, borderRadius: 1.5,
  },
});
