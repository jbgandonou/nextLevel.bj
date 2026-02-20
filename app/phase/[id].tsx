import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useStore } from '@/store/useStore';
import { phases } from '@/data/phases';
import { getLessonsByPhase } from '@/data/lessons';
import { getQuizByPhase } from '@/data/quizzes';

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
        <Text style={{ color: colors.text }}>Phase introuvable</Text>
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
        {/* Phase Header */}
        <View style={[styles.phaseHeader, { backgroundColor: phase.color }]}>
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
            <View style={styles.headerProgressBar}>
              <View style={[styles.headerProgressFill, { width: `${progress * 100}%` }]} />
            </View>
            <Text style={styles.progressLabel}>
              {completedCount}/{phase.lessonIds.length} leçons
            </Text>
          </View>
        </View>

        {/* Deliverable */}
        <View style={[styles.deliverableCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
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
            <Pressable
              key={lesson.id}
              style={[styles.lessonRow, { backgroundColor: colors.card, borderColor: colors.border }]}
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
            </Pressable>
          );
        })}

        {/* Quiz Button */}
        <Pressable
          style={[styles.quizButton, { backgroundColor: phase.color }]}
          onPress={() => router.push(`/quiz/${phase.id}`)}>
          <FontAwesome name="question-circle" size={22} color="#fff" />
          <View style={{ flex: 1 }}>
            <Text style={styles.quizButtonTitle}>Lancer le QCM</Text>
            <Text style={styles.quizButtonSub}>{questions.length} questions disponibles</Text>
          </View>
          <FontAwesome name="play" size={18} color="#fff" />
        </Pressable>

        <View style={{ height: 40 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  phaseHeader: { padding: 24, paddingTop: 16 },
  months: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '600' },
  phaseTitle: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginTop: 8 },
  phaseSubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 15, marginTop: 4 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12 },
  tag: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  tagText: { color: '#fff', fontSize: 12, fontWeight: '500' },
  progressSection: { marginTop: 16 },
  headerProgressBar: { height: 6, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 3, overflow: 'hidden' },
  headerProgressFill: { height: '100%', backgroundColor: '#fff', borderRadius: 3 },
  progressLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 6 },
  deliverableCard: {
    marginHorizontal: 20, marginTop: 16, padding: 16, borderRadius: 12,
    flexDirection: 'row', gap: 12, borderWidth: 1, alignItems: 'flex-start',
  },
  deliverableContent: { flex: 1 },
  deliverableTitle: { fontSize: 14, fontWeight: '600' },
  deliverableText: { fontSize: 13, marginTop: 4, lineHeight: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', paddingHorizontal: 20, marginTop: 24, marginBottom: 8 },
  lessonRow: {
    marginHorizontal: 20, marginVertical: 4, padding: 14, borderRadius: 12,
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, gap: 12,
  },
  lessonCheck: {
    width: 24, height: 24, borderRadius: 12, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },
  lessonInfo: { flex: 1 },
  lessonTitle: { fontSize: 15, fontWeight: '500' },
  lessonDuration: { fontSize: 12, marginTop: 2 },
  quizButton: {
    marginHorizontal: 20, marginTop: 24, padding: 18, borderRadius: 16,
    flexDirection: 'row', alignItems: 'center', gap: 14,
  },
  quizButtonTitle: { color: '#fff', fontSize: 17, fontWeight: '700' },
  quizButtonSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 },
});
