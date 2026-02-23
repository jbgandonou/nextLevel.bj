import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import Colors, { Spacing, Fonts } from '@/constants/Colors';
import { useStore } from '@/store/useStore';
import { phases } from '@/data/phases';
import { getLessonsByPhase } from '@/data/lessons';
import { getQuizByPhase } from '@/data/quizzes';
import { cardShadow, cardShadowLight, cardShadowHeavy } from '@/components/ui/shadows';
import AnimatedPressable from '@/components/ui/AnimatedPressable';
import GradientProgressBar from '@/components/ui/GradientProgressBar';
import { useStaggeredEntry } from '@/components/ui/useStaggeredEntry';

function StaggeredRow({ index, children }: { index: number; children: React.ReactNode }) {
  const animStyle = useStaggeredEntry(index, 80);
  return <Animated.View style={animStyle}>{children}</Animated.View>;
}

export default function PhaseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();
  const { completedLessons } = useStore();

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

  return (
    <>
      <Stack.Screen options={{ title: phase.title, headerTintColor: phase.color }} />
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Phase Header with Gradient */}
        <LinearGradient
          colors={[phase.color, phase.color + 'CC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.phaseHeader}>
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
          <View style={styles.progressSection}>
            <GradientProgressBar
              progress={progress}
              colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)'] as [string, string]}
              height={6}
              trackColor="rgba(255,255,255,0.3)"
            />
            <Text style={styles.progressLabel}>
              {completedCount}/{phase.lessonIds.length} leçons
            </Text>
          </View>
        </LinearGradient>

        {/* Deliverable */}
        <View style={[styles.deliverableCard, { backgroundColor: colors.card }, cardShadow(colorScheme)]}>
          <View style={styles.deliverableAccent} />
          <FontAwesome name="trophy" size={18} color={colors.warning} />
          <View style={styles.deliverableContent}>
            <Text style={[styles.deliverableTitle, { color: colors.text }]}>Livrable attendu</Text>
            <Text style={[styles.deliverableText, { color: colors.textSecondary }]}>{phase.deliverable}</Text>
          </View>
        </View>

        {/* Lessons */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Leçons ({completedCount}/{lessons.length})
        </Text>
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id);
          return (
            <StaggeredRow key={lesson.id} index={index}>
              <AnimatedPressable
                style={[styles.lessonRow, { backgroundColor: colors.card }, cardShadowLight(colorScheme)]}
                onPress={() => router.push(`/lesson/${lesson.id}`)}>
                <View style={[
                  styles.lessonCheck,
                  { borderColor: isCompleted ? colors.success : colors.border,
                    backgroundColor: isCompleted ? colors.success : 'transparent' },
                ]}>
                  {isCompleted && <FontAwesome name="check" size={12} color="#fff" />}
                </View>
                <View style={styles.lessonInfo}>
                  <Text style={[
                    styles.lessonTitle,
                    { color: colors.text, opacity: isCompleted ? 0.7 : 1 },
                  ]}>
                    {index + 1}. {lesson.title}
                  </Text>
                  <Text style={[styles.lessonDuration, { color: colors.textSecondary }]}>
                    ~{lesson.estimatedMinutes} min
                  </Text>
                </View>
                <FontAwesome name="chevron-right" size={14} color={colors.textSecondary} />
              </AnimatedPressable>
            </StaggeredRow>
          );
        })}

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
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFound: { fontFamily: Fonts.medium, fontSize: 15 },
  phaseHeader: { padding: 24, paddingTop: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  months: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: Fonts.semiBold },
  phaseTitle: { color: '#fff', fontSize: 26, fontFamily: Fonts.extraBold, marginTop: 8 },
  phaseSubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 15, fontFamily: Fonts.regular, marginTop: 4 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12 },
  tag: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  tagText: { color: '#fff', fontSize: 12, fontFamily: Fonts.medium },
  progressSection: { marginTop: 16 },
  progressLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontFamily: Fonts.medium, marginTop: 6 },
  deliverableCard: {
    marginHorizontal: Spacing.xl, marginTop: Spacing.lg, padding: Spacing.lg, borderRadius: 12,
    flexDirection: 'row', gap: 12, alignItems: 'flex-start', overflow: 'hidden',
  },
  deliverableAccent: {
    position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
    backgroundColor: '#F39C12', borderTopLeftRadius: 12, borderBottomLeftRadius: 12,
  },
  deliverableContent: { flex: 1 },
  deliverableTitle: { fontSize: 14, fontFamily: Fonts.semiBold },
  deliverableText: { fontSize: 13, fontFamily: Fonts.regular, marginTop: 4, lineHeight: 20 },
  sectionTitle: { fontSize: 18, fontFamily: Fonts.semiBold, paddingHorizontal: Spacing.xl, marginTop: Spacing.xxl, marginBottom: Spacing.sm },
  lessonRow: {
    marginHorizontal: Spacing.xl, marginVertical: 4, padding: 14, borderRadius: 12,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  lessonCheck: {
    width: 24, height: 24, borderRadius: 12, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },
  lessonInfo: { flex: 1 },
  lessonTitle: { fontSize: 15, fontFamily: Fonts.medium },
  lessonDuration: { fontSize: 12, fontFamily: Fonts.regular, marginTop: 2 },
  quizButton: {
    padding: 18, borderRadius: 16,
    flexDirection: 'row', alignItems: 'center', gap: 14,
  },
  quizButtonTitle: { color: '#fff', fontSize: 17, fontFamily: Fonts.bold },
  quizButtonSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontFamily: Fonts.regular, marginTop: 2 },
});
