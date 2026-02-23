import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import Colors, { gradients, Spacing, Fonts } from '@/constants/Colors';
import { useStore } from '@/store/useStore';
import { phases } from '@/data/phases';
import { getAllLessons } from '@/data/lessons';
import { cardShadow, cardShadowLight } from '@/components/ui/shadows';
import GradientProgressBar from '@/components/ui/GradientProgressBar';
import { useStaggeredEntry } from '@/components/ui/useStaggeredEntry';

function StaggeredView({ index, children, style }: { index: number; children: React.ReactNode; style?: any }) {
  const animStyle = useStaggeredEntry(index, 100);
  return <Animated.View style={[animStyle, style]}>{children}</Animated.View>;
}

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const isDark = colorScheme === 'dark';
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

  const gradientColors = isDark ? gradients.primaryDark : gradients.primary;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <LinearGradient
        colors={isDark ? ['#161b22', '#0d1117'] : ['#eef1f6', '#f5f6fa']}
        style={styles.headerSection}>
        <StaggeredView index={0} style={styles.avatarContainer}>
          <View style={[styles.avatarGlow, { shadowColor: colors.tint }]}>
            <LinearGradient colors={gradientColors} style={styles.avatar}>
              <FontAwesome name="user" size={44} color="#fff" />
            </LinearGradient>
          </View>
          <Text style={[styles.name, { color: colors.text }]}>AI Security Learner</Text>
          <Text style={[styles.bio, { color: colors.textSecondary }]}>En route vers le niveau suivant</Text>
        </StaggeredView>
      </LinearGradient>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {[
          { icon: 'fire' as const, color: '#FF6B35', bgColor: '#FF6B3512', value: `${streak}`, label: 'Jours streak' },
          { icon: 'book' as const, color: colors.tint, bgColor: colors.tint + '12', value: `${completedCount}/${totalLessons}`, label: 'Lecons' },
          { icon: 'pencil' as const, color: '#9B59B6', bgColor: '#9B59B612', value: `${totalAttempts}`, label: 'QCM passes' },
          { icon: 'bar-chart' as const, color: '#2ECC71', bgColor: '#2ECC7112', value: `${overallAvg}%`, label: 'Score moyen' },
        ].map((stat, i) => (
          <StaggeredView key={stat.label} index={i + 1} style={[styles.statBox, { backgroundColor: colors.card }, cardShadow(colorScheme)]}>
            <View style={[styles.statIconCircle, { backgroundColor: stat.bgColor }]}>
              <FontAwesome name={stat.icon} size={22} color={stat.color} />
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
          </StaggeredView>
        ))}
      </View>

      {/* Phase Details */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Details par phase</Text>

      {phaseStats.map(({ phase, phaseLessons, phaseCompleted, attempts, avgScore }, i) => {
        const progress = phaseLessons > 0 ? phaseCompleted / phaseLessons : 0;
        return (
          <StaggeredView key={phase.id} index={i + 5}>
            <View style={[styles.phaseRow, { backgroundColor: colors.card }, cardShadowLight(colorScheme)]}>
              <LinearGradient
                colors={[phase.color, phase.color + 'BB']}
                style={styles.phaseIcon}>
                <Text style={styles.phaseIconText}>{i + 1}</Text>
              </LinearGradient>

              <View style={styles.phaseInfo}>
                <Text style={[styles.phaseName, { color: colors.text }]}>{phase.title}</Text>
                <View style={styles.phaseMetaRow}>
                  <Text style={[styles.phaseMeta, { color: colors.textSecondary }]}>
                    {phaseCompleted}/{phaseLessons} lecons
                  </Text>
                  {avgScore !== null && (
                    <View style={[styles.scoreBadge, { backgroundColor: (avgScore >= 70 ? '#2ECC71' : '#E74C3C') + '15' }]}>
                      <Text style={[styles.scoreText, { color: avgScore >= 70 ? '#2ECC71' : '#E74C3C' }]}>
                        {avgScore}%
                      </Text>
                    </View>
                  )}
                  {attempts > 0 && (
                    <Text style={[styles.phaseMeta, { color: colors.textTertiary }]}>
                      {attempts} QCM
                    </Text>
                  )}
                </View>
                <View style={{ marginTop: 8 }}>
                  <GradientProgressBar
                    progress={progress}
                    colors={[phase.color, phase.color + 'CC'] as [string, string]}
                    height={5}
                    trackColor={colors.borderLight}
                  />
                </View>
              </View>
            </View>
          </StaggeredView>
        );
      })}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  // Header
  headerSection: { paddingBottom: 28 },
  avatarContainer: { alignItems: 'center', paddingTop: 32 },
  avatarGlow: {
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    borderRadius: 50,
    elevation: 8,
  },
  avatar: {
    width: 100, height: 100, borderRadius: 50,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 4, borderColor: 'rgba(255,255,255,0.9)',
  },
  name: { fontSize: 24, fontFamily: Fonts.extraBold, marginTop: 16 },
  bio: { fontSize: 14, fontFamily: Fonts.medium, marginTop: 4 },
  // Stats
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 12, marginTop: -12,
  },
  statBox: {
    width: '47%', flexGrow: 1, alignItems: 'center',
    paddingVertical: 22, paddingHorizontal: 12, borderRadius: 20, gap: 8,
  },
  statIconCircle: { width: 50, height: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  statValue: { fontSize: 22, fontFamily: Fonts.extraBold },
  statLabel: { fontSize: 11, fontFamily: Fonts.medium, letterSpacing: 0.3 },
  // Section
  sectionTitle: { fontSize: 20, fontFamily: Fonts.bold, paddingHorizontal: 20, marginTop: 28, marginBottom: 12 },
  // Phase rows
  phaseRow: {
    marginHorizontal: 20, marginVertical: 5, padding: 16, borderRadius: 16,
    flexDirection: 'row', alignItems: 'center', gap: 14,
  },
  phaseIcon: {
    width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
  },
  phaseIconText: { color: '#fff', fontSize: 16, fontFamily: Fonts.extraBold },
  phaseInfo: { flex: 1 },
  phaseName: { fontSize: 15, fontFamily: Fonts.bold },
  phaseMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  phaseMeta: { fontSize: 12, fontFamily: Fonts.regular },
  scoreBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  scoreText: { fontSize: 11, fontFamily: Fonts.bold },
});
