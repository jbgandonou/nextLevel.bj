import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import Colors, { gradients, Spacing, Fonts } from '@/constants/Colors';
import { useStore } from '@/store/useStore';
import { phases } from '@/data/phases';
import { getAllLessons } from '@/data/lessons';
import { cardShadow } from '@/components/ui/shadows';
import AnimatedPressable from '@/components/ui/AnimatedPressable';
import GradientProgressBar from '@/components/ui/GradientProgressBar';
import { useStaggeredEntry } from '@/components/ui/useStaggeredEntry';

function StaggeredView({ index, children, style }: { index: number; children: React.ReactNode; style?: any }) {
  const animStyle = useStaggeredEntry(index, 100);
  return <Animated.View style={[animStyle, style]}>{children}</Animated.View>;
}

export default function DashboardScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();
  const { completedLessons, quizAttempts, streak, isLoaded } = useStore();
  const isDark = colorScheme === 'dark';

  if (!isLoaded) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.text }]}>Chargement...</Text>
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
  const gradientColors = isDark ? gradients.primaryDark : gradients.primary;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Header */}
      <LinearGradient
        colors={isDark ? ['#0d1117', '#161b22'] : ['#f5f6fa', '#eef1f6']}
        style={styles.heroSection}>
        <StaggeredView index={0}>
          <Text style={[styles.greeting, { color: colors.tint }]}>NextLevel.bj</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            AI Security Engineer Roadmap
          </Text>
        </StaggeredView>

        {/* Progress Card */}
        <StaggeredView index={1} style={[styles.progressCard, { backgroundColor: colors.card }, cardShadow(colorScheme)]}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={[styles.progressTitle, { color: colors.text }]}>Progression globale</Text>
              <Text style={[styles.progressDetail, { color: colors.textSecondary }]}>
                {completedCount} sur {totalLessons} lecons
              </Text>
            </View>
            <View style={[styles.percentBadge, { backgroundColor: colors.tint + '18' }]}>
              <Text style={[styles.percentText, { color: colors.tint }]}>{progressPercent}%</Text>
            </View>
          </View>
          <GradientProgressBar
            progress={progressPercent / 100}
            colors={gradientColors}
            height={10}
            trackColor={colors.borderLight}
          />
        </StaggeredView>
      </LinearGradient>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        {[
          { icon: 'fire' as const, color: '#FF6B35', bgColor: '#FF6B3515', value: `${streak}`, label: 'Streak' },
          { icon: 'check-circle' as const, color: '#2ECC71', bgColor: '#2ECC7115', value: `${completedCount}`, label: 'Lecons' },
          { icon: 'trophy' as const, color: '#F4C430', bgColor: '#F4C43015', value: lastAttempt ? `${Math.round((lastAttempt.score / lastAttempt.totalQuestions) * 100)}%` : '-', label: 'Dernier QCM' },
        ].map((stat, i) => (
          <StaggeredView key={stat.label} index={i + 2} style={[styles.statCard, { backgroundColor: colors.card }, cardShadow(colorScheme)]}>
            <View style={[styles.statIconCircle, { backgroundColor: stat.bgColor }]}>
              <FontAwesome name={stat.icon} size={22} color={stat.color} />
            </View>
            <Text style={[styles.statNumber, { color: colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
          </StaggeredView>
        ))}
      </View>

      {/* Current Phase — Hero Card */}
      <StaggeredView index={5} style={{ paddingHorizontal: 20 }}>
        <AnimatedPressable onPress={() => router.push(`/phase/${currentPhase.id}`)}>
          <LinearGradient
            colors={[currentPhase.color, currentPhase.color + 'BB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.heroCard, {
              shadowColor: currentPhase.color,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.35,
              shadowRadius: 14,
              elevation: 8,
            }]}>
            <View style={styles.heroCardInner}>
              <View style={styles.heroCardBadge}>
                <Text style={styles.heroCardBadgeText}>PHASE ACTUELLE</Text>
              </View>
              <Text style={styles.heroCardTitle}>{currentPhase.title}</Text>
              <Text style={styles.heroCardSubtitle}>{currentPhase.subtitle}</Text>
              <View style={styles.heroCardFooter}>
                <Text style={styles.heroCardMonths}>{currentPhase.months}</Text>
                <View style={styles.heroCardArrow}>
                  <FontAwesome name="arrow-right" size={14} color="#fff" />
                </View>
              </View>
            </View>
          </LinearGradient>
        </AnimatedPressable>
      </StaggeredView>

      {/* Quick Actions */}
      <StaggeredView index={6}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Acces rapide</Text>
        <View style={styles.quickActions}>
          <AnimatedPressable
            style={[styles.actionBtn, { backgroundColor: colors.card }, cardShadow(colorScheme)]}
            onPress={() => router.push('/(tabs)/phases')}>
            <View style={[styles.actionIconCircle, { backgroundColor: colors.tint + '15' }]}>
              <FontAwesome name="list-ol" size={18} color={colors.tint} />
            </View>
            <View>
              <Text style={[styles.actionTitle, { color: colors.text }]}>Toutes les phases</Text>
              <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>6 phases disponibles</Text>
            </View>
            <FontAwesome name="chevron-right" size={12} color={colors.textTertiary} style={{ marginLeft: 'auto' }} />
          </AnimatedPressable>
          <AnimatedPressable
            style={[styles.actionBtn, { backgroundColor: colors.card }, cardShadow(colorScheme)]}
            onPress={() => router.push(`/quiz/${currentPhase.id}`)}>
            <View style={[styles.actionIconCircle, { backgroundColor: '#9B59B615' }]}>
              <FontAwesome name="question-circle" size={18} color="#9B59B6" />
            </View>
            <View>
              <Text style={[styles.actionTitle, { color: colors.text }]}>Lancer un QCM</Text>
              <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>10 questions aleatoires</Text>
            </View>
            <FontAwesome name="chevron-right" size={12} color={colors.textTertiary} style={{ marginLeft: 'auto' }} />
          </AnimatedPressable>
        </View>
      </StaggeredView>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { fontFamily: Fonts.medium, fontSize: 15 },
  // Hero
  heroSection: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },
  greeting: { fontSize: 32, fontFamily: Fonts.extraBold, letterSpacing: 0.5 },
  subtitle: { fontSize: 15, fontFamily: Fonts.medium, marginTop: 4, letterSpacing: 0.2 },
  // Progress
  progressCard: { marginTop: 20, padding: 22, borderRadius: 20 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  progressTitle: { fontSize: 17, fontFamily: Fonts.bold },
  progressDetail: { fontSize: 13, fontFamily: Fonts.regular, marginTop: 3 },
  percentBadge: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12 },
  percentText: { fontSize: 20, fontFamily: Fonts.extraBold },
  // Stats
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginTop: 16 },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: 20, paddingHorizontal: 12, borderRadius: 20, gap: 8 },
  statIconCircle: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  statNumber: { fontSize: 24, fontFamily: Fonts.extraBold },
  statLabel: { fontSize: 11, fontFamily: Fonts.medium, letterSpacing: 0.3 },
  // Hero Card
  heroCard: { marginTop: 20, padding: 24, borderRadius: 24, overflow: 'hidden' },
  heroCardInner: { gap: 8 },
  heroCardBadge: {
    alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8,
  },
  heroCardBadgeText: { color: '#fff', fontSize: 10, fontFamily: Fonts.extraBold, letterSpacing: 1 },
  heroCardTitle: { color: '#fff', fontSize: 24, fontFamily: Fonts.extraBold, marginTop: 4 },
  heroCardSubtitle: { color: 'rgba(255,255,255,0.85)', fontSize: 15, fontFamily: Fonts.regular, lineHeight: 22 },
  heroCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  heroCardMonths: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: Fonts.semiBold },
  heroCardArrow: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  // Section
  sectionTitle: { fontSize: 20, fontFamily: Fonts.bold, paddingHorizontal: 20, marginTop: 24, marginBottom: 4 },
  // Quick actions
  quickActions: { paddingHorizontal: 20, gap: 10, marginTop: 12 },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    padding: 18, borderRadius: 18,
  },
  actionIconCircle: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  actionTitle: { fontSize: 15, fontFamily: Fonts.semiBold },
  actionSubtitle: { fontSize: 12, fontFamily: Fonts.regular, marginTop: 2 },
});
