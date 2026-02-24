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
import { badges } from '@/data/badges';
import AnimatedPressable from '@/components/ui/AnimatedPressable';
import GradientProgressBar from '@/components/ui/GradientProgressBar';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedLevelCircle from '@/components/ui/AnimatedLevelCircle';
import BadgeIcon from '@/components/ui/BadgeIcon';
import { useStaggeredEntry } from '@/components/ui/useStaggeredEntry';
import { getXPForLevel, getLevelTitle, getXPProgress } from '@/utils/gamification';

function StaggeredView({ index, children, style }: { index: number; children: React.ReactNode; style?: any }) {
  const animStyle = useStaggeredEntry(index, 100);
  return <Animated.View style={[animStyle, style]}>{children}</Animated.View>;
}

export default function DashboardScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();
  const { completedLessons, quizAttempts, streak, isLoaded, totalXP, level, earnedBadgeIds } = useStore();
  const isDark = colorScheme === 'dark';

  if (!isLoaded) {
    return (
      <View style={[styles.center, { backgroundColor: 'transparent' }]}>
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
  const nextLevelXP = getXPForLevel(level + 1);
  const xpProgress = getXPProgress(totalXP);

  const recentBadges = badges.filter((b) => earnedBadgeIds.includes(b.id)).slice(-5);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 100 : 80 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Header */}
      <View style={styles.heroSection}>
        <StaggeredView index={0} style={styles.heroTop}>
          <View>
            <Text style={[styles.greeting, { color: isDark ? '#6BB5FF' : colors.tint }]}>NextLevel.bj</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              AI Security Engineer Roadmap
            </Text>
          </View>
          <AnimatedLevelCircle level={level} totalXP={totalXP} size={60} strokeWidth={4} />
        </StaggeredView>

        {/* XP Card */}
        <StaggeredView index={1}>
          <GlassCard isDark={isDark} style={styles.xpCard}>
            <View style={styles.xpHeader}>
              <View>
                <Text style={[styles.xpLabel, { color: colors.textSecondary }]}>Experience</Text>
                <Text style={[styles.xpValue, { color: '#FFD700' }]}>{totalXP} XP</Text>
              </View>
              <View style={styles.levelBadge}>
                <Text style={styles.levelBadgeText}>Niv. {level}</Text>
                <Text style={styles.levelTitle}>{getLevelTitle(level)}</Text>
              </View>
            </View>
            <GradientProgressBar
              progress={xpProgress}
              colors={gradients.xp}
              height={8}
              trackColor={isDark ? 'rgba(255,255,255,0.1)' : '#e0e0e0'}
            />
            <Text style={[styles.xpNext, { color: colors.textTertiary }]}>
              {nextLevelXP - totalXP} XP avant le niveau {level + 1}
            </Text>
          </GlassCard>
        </StaggeredView>

        {/* Global Progress Card */}
        <StaggeredView index={2}>
          <GlassCard isDark={isDark} style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <View>
                <Text style={[styles.progressTitle, { color: colors.text }]}>Progression globale</Text>
                <Text style={[styles.progressDetail, { color: colors.textSecondary }]}>
                  {completedCount} sur {totalLessons} lecons
                </Text>
              </View>
              <View style={[styles.percentBadge, { backgroundColor: isDark ? 'rgba(107,181,255,0.15)' : colors.tint + '18' }]}>
                <Text style={[styles.percentText, { color: isDark ? '#6BB5FF' : colors.tint }]}>{progressPercent}%</Text>
              </View>
            </View>
            <GradientProgressBar
              progress={progressPercent / 100}
              colors={isDark ? gradients.primaryDark : gradients.primary}
              height={10}
              trackColor={isDark ? 'rgba(255,255,255,0.1)' : colors.borderLight}
            />
          </GlassCard>
        </StaggeredView>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        {[
          { icon: 'fire' as const, color: '#FF6B35', value: `${streak}`, label: 'Streak' },
          { icon: 'check-circle' as const, color: '#2ECC71', value: `${completedCount}`, label: 'Lecons' },
          { icon: 'trophy' as const, color: '#F4C430', value: lastAttempt ? `${Math.round((lastAttempt.score / lastAttempt.totalQuestions) * 100)}%` : '-', label: 'Dernier QCM' },
        ].map((stat, i) => (
          <StaggeredView key={stat.label} index={i + 3}>
            <GlassCard isDark={isDark} style={styles.statCard}>
              <View style={[styles.statIconCircle, { backgroundColor: stat.color + '20' }]}>
                <FontAwesome name={stat.icon} size={20} color={stat.color} />
              </View>
              <Text style={[styles.statNumber, { color: colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
            </GlassCard>
          </StaggeredView>
        ))}
      </View>

      {/* Recent Badges */}
      {recentBadges.length > 0 && (
        <StaggeredView index={6}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Badges recents</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgesScroll}>
            {recentBadges.map((badge) => (
              <BadgeIcon key={badge.id} icon={badge.icon} rarity={badge.rarity} name={badge.name} size={56} earned />
            ))}
          </ScrollView>
        </StaggeredView>
      )}

      {/* Current Phase — Hero Card */}
      <StaggeredView index={7} style={{ paddingHorizontal: 20 }}>
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
      <StaggeredView index={8}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Acces rapide</Text>
        <View style={styles.quickActions}>
          <AnimatedPressable onPress={() => router.push('/(tabs)/phases')}>
            <GlassCard isDark={isDark} style={styles.actionBtn}>
              <View style={[styles.actionIconCircle, { backgroundColor: isDark ? 'rgba(107,181,255,0.15)' : colors.tint + '15' }]}>
                <FontAwesome name="list-ol" size={18} color={isDark ? '#6BB5FF' : colors.tint} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.actionTitle, { color: colors.text }]}>Toutes les phases</Text>
                <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>6 phases disponibles</Text>
              </View>
              <FontAwesome name="chevron-right" size={12} color={colors.textTertiary} />
            </GlassCard>
          </AnimatedPressable>
          <AnimatedPressable onPress={() => router.push(`/quiz/${currentPhase.id}`)}>
            <GlassCard isDark={isDark} style={styles.actionBtn}>
              <View style={[styles.actionIconCircle, { backgroundColor: '#9B59B620' }]}>
                <FontAwesome name="question-circle" size={18} color="#9B59B6" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.actionTitle, { color: colors.text }]}>Lancer un QCM</Text>
                <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>10 questions aleatoires</Text>
              </View>
              <FontAwesome name="chevron-right" size={12} color={colors.textTertiary} />
            </GlassCard>
          </AnimatedPressable>
        </View>
      </StaggeredView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { fontFamily: Fonts.medium, fontSize: 15 },
  // Hero
  heroSection: { paddingHorizontal: 20, paddingTop: 60, gap: 14 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 32, fontFamily: Fonts.extraBold, letterSpacing: 0.5 },
  subtitle: { fontSize: 15, fontFamily: Fonts.medium, marginTop: 4, letterSpacing: 0.2 },
  // XP Card
  xpCard: { padding: 18 },
  xpHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  xpLabel: { fontSize: 13, fontFamily: Fonts.medium },
  xpValue: { fontSize: 26, fontFamily: Fonts.extraBold, marginTop: 2 },
  levelBadge: { alignItems: 'flex-end' },
  levelBadgeText: { fontSize: 14, fontFamily: Fonts.bold, color: '#9B59B6' },
  levelTitle: { fontSize: 11, fontFamily: Fonts.medium, color: 'rgba(155,89,182,0.7)', marginTop: 2 },
  xpNext: { fontSize: 11, fontFamily: Fonts.medium, marginTop: 8 },
  // Progress
  progressCard: { padding: 18 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  progressTitle: { fontSize: 16, fontFamily: Fonts.bold },
  progressDetail: { fontSize: 13, fontFamily: Fonts.regular, marginTop: 3 },
  percentBadge: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12 },
  percentText: { fontSize: 20, fontFamily: Fonts.extraBold },
  // Stats
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginTop: 16 },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: 16, paddingHorizontal: 8, gap: 6 },
  statIconCircle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  statNumber: { fontSize: 22, fontFamily: Fonts.extraBold },
  statLabel: { fontSize: 11, fontFamily: Fonts.medium, letterSpacing: 0.3 },
  // Badges
  badgesScroll: { paddingHorizontal: 20, gap: 14 },
  // Hero Card
  heroCard: { marginTop: 4, padding: 24, borderRadius: 24, overflow: 'hidden' },
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
  sectionTitle: { fontSize: 20, fontFamily: Fonts.bold, paddingHorizontal: 20, marginTop: 24, marginBottom: 12 },
  // Quick actions
  quickActions: { paddingHorizontal: 20, gap: 10 },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16,
  },
  actionIconCircle: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  actionTitle: { fontSize: 15, fontFamily: Fonts.semiBold },
  actionSubtitle: { fontSize: 12, fontFamily: Fonts.regular, marginTop: 2 },
});
