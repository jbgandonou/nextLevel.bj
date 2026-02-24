import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import Colors, { Spacing, Fonts } from '@/constants/Colors';
import { useStore } from '@/store/useStore';
import { phases } from '@/data/phases';
import { getLessonsByPhase } from '@/data/lessons';
import { getQuizByPhase, getQuizByLesson } from '@/data/quizzes';
import AnimatedPressable from '@/components/ui/AnimatedPressable';
import GlassCard from '@/components/ui/GlassCard';
import { useStaggeredEntry } from '@/components/ui/useStaggeredEntry';
import { cardShadowHeavy } from '@/components/ui/shadows';
import AnimatedLevelCircle from '@/components/ui/AnimatedLevelCircle';
import ConfettiBurst from '@/components/ui/ConfettiBurst';

function PulsingNode({ color, size }: { color: string; size: number }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[{
      width: size, height: size, borderRadius: size / 2,
      borderWidth: 3, borderColor: color,
      backgroundColor: color + '30',
      alignItems: 'center', justifyContent: 'center',
    }, animStyle]}>
      <View style={{
        width: size * 0.4, height: size * 0.4, borderRadius: size * 0.2,
        backgroundColor: color,
      }} />
    </Animated.View>
  );
}

function StaggeredRow({ index, children }: { index: number; children: React.ReactNode }) {
  const animStyle = useStaggeredEntry(index, 80);
  return <Animated.View style={animStyle}>{children}</Animated.View>;
}

function getMasteryText(progress: number): { text: string; icon: React.ComponentProps<typeof FontAwesome>['name'] } {
  if (progress >= 1) return { text: 'Phase maitrisee !', icon: 'trophy' };
  if (progress >= 0.75) return { text: 'Presque termine !', icon: 'fire' };
  if (progress >= 0.5) return { text: 'A mi-chemin !', icon: 'star' };
  if (progress >= 0.25) return { text: 'Bon debut !', icon: 'thumbs-up' };
  if (progress > 0) return { text: 'C\'est parti !', icon: 'rocket' };
  return { text: 'Pret a commencer ?', icon: 'play-circle' };
}

export default function PhaseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const { completedLessons, totalXP, level } = useStore();

  const phase = phases.find((p) => p.id === id);
  if (!phase) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.notFound, { color: colors.text }]}>Phase introuvable</Text>
      </View>
    );
  }

  const lessons = getLessonsByPhase(phase.id);
  const questions = getQuizByPhase(phase.id);
  const completedCount = phase.lessonIds.filter((lid) => completedLessons.includes(lid)).length;
  const progress = phase.lessonIds.length > 0 ? completedCount / phase.lessonIds.length : 0;
  const allCompleted = completedCount === phase.lessonIds.length && phase.lessonIds.length > 0;
  const mastery = getMasteryText(progress);

  // Determine first incomplete lesson for "in progress" status
  const firstIncompleteIndex = lessons.findIndex((l) => !completedLessons.includes(l.id));

  return (
    <>
      <Stack.Screen options={{ title: phase.title, headerTintColor: phase.color }} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Phase Header with Gradient */}
        <LinearGradient
          colors={[phase.color, phase.color + 'CC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.phaseHeader}>
          {/* Decorative circles */}
          <View style={[styles.heroCircle, { width: 180, height: 180, top: -50, right: -30, backgroundColor: 'rgba(255,255,255,0.06)' }]} />
          <View style={[styles.heroCircle, { width: 120, height: 120, bottom: -20, left: -20, backgroundColor: 'rgba(255,255,255,0.04)' }]} />

          <Text style={styles.months}>{phase.months}</Text>
          <Text style={styles.phaseTitle}>{phase.title}</Text>
          <Text style={styles.phaseSubtitle}>{phase.subtitle}</Text>
          <View style={styles.tagsRow}>
            {phase.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Mastery Meter */}
        <View style={styles.masterySection}>
          <AnimatedLevelCircle
            level={Math.round(progress * 100)}
            totalXP={Math.round(progress * 200)}
            size={80}
            strokeWidth={5}
          />
          <View style={styles.masteryInfo}>
            <Text style={[styles.masteryPercent, { color: phase.color }]}>
              {Math.round(progress * 100)}%
            </Text>
            <View style={styles.masteryTextRow}>
              <FontAwesome name={mastery.icon} size={14} color={phase.color} />
              <Text style={[styles.masteryLabel, { color: colors.text }]}>{mastery.text}</Text>
            </View>
            <Text style={[styles.masteryCount, { color: colors.textSecondary }]}>
              {completedCount}/{phase.lessonIds.length} lecons terminees
            </Text>
          </View>
        </View>

        {/* Deliverable */}
        <GlassCard isDark={isDark} style={styles.deliverableCard}>
          <View style={[styles.deliverableAccent, { backgroundColor: '#F39C12' }]} />
          <FontAwesome name="trophy" size={18} color={colors.warning} />
          <View style={styles.deliverableContent}>
            <Text style={[styles.deliverableTitle, { color: colors.text }]}>Livrable attendu</Text>
            <Text style={[styles.deliverableText, { color: colors.textSecondary }]}>{phase.deliverable}</Text>
          </View>
        </GlassCard>

        {/* Lessons Timeline */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Parcours d'apprentissage
        </Text>

        <View style={styles.timelineContainer}>
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isInProgress = !isCompleted && index === firstIncompleteIndex;
            const isPending = !isCompleted && !isInProgress;
            const isLast = index === lessons.length - 1;
            const quizCount = getQuizByLesson(lesson.id).length;

            return (
              <StaggeredRow key={lesson.id} index={index}>
                <View style={styles.timelineRow}>
                  {/* Timeline column: node + line */}
                  <View style={styles.timelineCol}>
                    {/* Node */}
                    {isCompleted ? (
                      <View style={[styles.timelineNodeCompleted, { backgroundColor: colors.success }]}>
                        <FontAwesome name="check" size={12} color="#fff" />
                      </View>
                    ) : isInProgress ? (
                      <PulsingNode color={phase.color} size={28} />
                    ) : (
                      <View style={[styles.timelineNodePending, {
                        borderColor: isDark ? 'rgba(255,255,255,0.2)' : '#D0D0D0',
                      }]} />
                    )}

                    {/* Connecting line */}
                    {!isLast && (
                      <View style={[styles.timelineLine, {
                        backgroundColor: isCompleted ? phase.color : (isDark ? 'rgba(255,255,255,0.12)' : '#E0E0E0'),
                      }]} />
                    )}
                  </View>

                  {/* Lesson card */}
                  <View style={styles.timelineCardWrap}>
                    <AnimatedPressable onPress={() => router.push(`/lesson/${lesson.id}`)}>
                      <GlassCard
                        isDark={isDark}
                        style={[styles.timelineCard, isInProgress && {
                          borderColor: phase.color + '50',
                        }]}
                        borderColor={isInProgress ? phase.color + '50' : undefined}
                      >
                        {/* Title row */}
                        <View style={styles.cardTitleRow}>
                          <Text style={[styles.cardTitle, {
                            color: colors.text,
                            opacity: isPending ? 0.5 : 1,
                          }]} numberOfLines={2}>
                            {lesson.title}
                          </Text>
                          <FontAwesome
                            name="chevron-right"
                            size={12}
                            color={isPending ? colors.textTertiary : colors.textSecondary}
                          />
                        </View>

                        {/* Meta pills */}
                        <View style={styles.cardPills}>
                          <View style={[styles.pill, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#F0F0F0' }]}>
                            <FontAwesome name="clock-o" size={10} color={colors.textSecondary} />
                            <Text style={[styles.pillText, { color: colors.textSecondary }]}>
                              {lesson.estimatedMinutes} min
                            </Text>
                          </View>
                          <View style={[styles.pill, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#F0F0F0' }]}>
                            <FontAwesome name="key" size={10} color={colors.textSecondary} />
                            <Text style={[styles.pillText, { color: colors.textSecondary }]}>
                              {lesson.keyPoints.length} points
                            </Text>
                          </View>
                          {quizCount > 0 && (
                            <View style={[styles.pill, { backgroundColor: phase.color + '18' }]}>
                              <FontAwesome name="question-circle" size={10} color={phase.color} />
                              <Text style={[styles.pillText, { color: phase.color }]}>
                                {quizCount} QCM
                              </Text>
                            </View>
                          )}
                        </View>

                        {/* Preview of first key point */}
                        {lesson.keyPoints.length > 0 && (
                          <Text
                            style={[styles.cardPreview, { color: colors.textTertiary }]}
                            numberOfLines={1}
                          >
                            {lesson.keyPoints[0]}
                          </Text>
                        )}
                      </GlassCard>
                    </AnimatedPressable>
                  </View>
                </View>
              </StaggeredRow>
            );
          })}
        </View>

        {/* Quiz Button */}
        <AnimatedPressable
          style={[{ marginHorizontal: Spacing.xl, marginTop: Spacing.xxl }, cardShadowHeavy(colorScheme)]}
          onPress={() => router.push(`/quiz/${phase.id}`)}>
          <LinearGradient
            colors={[phase.color, phase.color + 'BB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.quizButton}>
            <FontAwesome name="question-circle" size={22} color="#fff" />
            <View style={{ flex: 1 }}>
              <Text style={styles.quizButtonTitle}>Lancer le QCM</Text>
              <Text style={styles.quizButtonSub}>{questions.length} questions disponibles</Text>
            </View>
            <FontAwesome name="play" size={18} color="#fff" />
          </LinearGradient>
        </AnimatedPressable>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Confetti when all lessons completed */}
      {allCompleted && <ConfettiBurst />}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFound: { fontFamily: Fonts.medium, fontSize: 15 },

  // Header
  phaseHeader: { padding: 24, paddingTop: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: 'hidden' },
  heroCircle: { position: 'absolute', borderRadius: 999 },
  months: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: Fonts.semiBold },
  phaseTitle: { color: '#fff', fontSize: 26, fontFamily: Fonts.extraBold, marginTop: 8 },
  phaseSubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 15, fontFamily: Fonts.regular, marginTop: 4 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12 },
  tag: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  tagText: { color: '#fff', fontSize: 12, fontFamily: Fonts.medium },

  // Mastery
  masterySection: {
    flexDirection: 'row', alignItems: 'center', gap: 20,
    marginHorizontal: Spacing.xl, marginTop: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  masteryInfo: { flex: 1 },
  masteryPercent: { fontSize: 28, fontFamily: Fonts.extraBold },
  masteryTextRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  masteryLabel: { fontSize: 15, fontFamily: Fonts.semiBold },
  masteryCount: { fontSize: 12, fontFamily: Fonts.medium, marginTop: 4 },

  // Deliverable
  deliverableCard: {
    marginHorizontal: Spacing.xl, padding: Spacing.lg,
    flexDirection: 'row', gap: 12, alignItems: 'flex-start', overflow: 'hidden',
  },
  deliverableAccent: {
    position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
    borderTopLeftRadius: 20, borderBottomLeftRadius: 20,
  },
  deliverableContent: { flex: 1 },
  deliverableTitle: { fontSize: 14, fontFamily: Fonts.semiBold },
  deliverableText: { fontSize: 13, fontFamily: Fonts.regular, marginTop: 4, lineHeight: 20 },

  // Section
  sectionTitle: {
    fontSize: 18, fontFamily: Fonts.semiBold,
    paddingHorizontal: Spacing.xl, marginTop: Spacing.xxl, marginBottom: Spacing.md,
  },

  // Timeline
  timelineContainer: { paddingHorizontal: Spacing.xl },
  timelineRow: { flexDirection: 'row', minHeight: 90 },
  timelineCol: { width: 28, alignItems: 'center', paddingTop: 2 },
  timelineNodeCompleted: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  timelineNodePending: {
    width: 22, height: 22, borderRadius: 11, borderWidth: 2,
    marginHorizontal: 3,
  },
  timelineLine: {
    width: 3, flex: 1, marginVertical: 4,
    borderRadius: 1.5,
  },
  timelineCardWrap: { flex: 1, paddingLeft: 12, paddingBottom: 12 },
  timelineCard: { padding: 14, gap: 8 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 },
  cardTitle: { fontSize: 15, fontFamily: Fonts.semiBold, flex: 1 },
  cardPills: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8,
  },
  pillText: { fontSize: 11, fontFamily: Fonts.medium },
  cardPreview: { fontSize: 12, fontFamily: Fonts.regular, fontStyle: 'italic', lineHeight: 18 },

  // Quiz button
  quizButton: {
    padding: 18, borderRadius: 16,
    flexDirection: 'row', alignItems: 'center', gap: 14,
  },
  quizButtonTitle: { color: '#fff', fontSize: 17, fontFamily: Fonts.bold },
  quizButtonSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontFamily: Fonts.regular, marginTop: 2 },
});
