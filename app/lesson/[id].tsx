import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Markdown from 'react-native-markdown-display';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useStore } from '@/store/useStore';
import { getLessonById, getLessonsByPhase } from '@/data/lessons';
import { phases } from '@/data/phases';

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();
  const { completedLessons, toggleLesson } = useStore();

  const lesson = getLessonById(id);
  if (!lesson) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Leçon introuvable</Text>
      </View>
    );
  }

  const isCompleted = completedLessons.includes(lesson.id);
  const phase = phases.find((p) => p.id === lesson.phaseId);
  const phaseLessons = getLessonsByPhase(lesson.phaseId);
  const currentIndex = phaseLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? phaseLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < phaseLessons.length - 1 ? phaseLessons[currentIndex + 1] : null;

  const mdStyles = {
    body: { color: colors.text, fontSize: 15, lineHeight: 24 },
    heading1: { color: colors.text, fontSize: 24, fontWeight: 'bold' as const, marginTop: 20, marginBottom: 10 },
    heading2: { color: colors.text, fontSize: 20, fontWeight: 'bold' as const, marginTop: 18, marginBottom: 8 },
    heading3: { color: colors.text, fontSize: 17, fontWeight: '600' as const, marginTop: 14, marginBottom: 6 },
    paragraph: { color: colors.text, fontSize: 15, lineHeight: 24, marginBottom: 12 },
    listItem: { color: colors.text, fontSize: 15, lineHeight: 24 },
    code_inline: {
      backgroundColor: colorScheme === 'dark' ? '#2d333b' : '#f0f0f0',
      color: colorScheme === 'dark' ? '#e6edf3' : '#333',
      paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, fontSize: 14,
    },
    fence: {
      backgroundColor: colorScheme === 'dark' ? '#161b22' : '#f6f8fa',
      borderColor: colors.border, borderWidth: 1, borderRadius: 8,
      padding: 12, marginVertical: 8,
    },
    code_block: { color: colors.text, fontSize: 13 },
    blockquote: {
      backgroundColor: colorScheme === 'dark' ? '#1c2128' : '#f0f7ff',
      borderLeftColor: colors.tint, borderLeftWidth: 4, paddingLeft: 12,
      paddingVertical: 8, marginVertical: 8,
    },
    strong: { color: colors.text, fontWeight: 'bold' as const },
    em: { color: colors.text, fontStyle: 'italic' as const },
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: `Leçon ${currentIndex + 1}/${phaseLessons.length}`,
          headerTintColor: phase?.color,
        }}
      />
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <Text style={[styles.lessonTitle, { color: colors.text }]}>{lesson.title}</Text>
          <View style={styles.metaRow}>
            <FontAwesome name="clock-o" size={14} color={colors.textSecondary} />
            <Text style={[styles.metaText, { color: colors.textSecondary }]}>
              ~{lesson.estimatedMinutes} min
            </Text>
            {phase && (
              <>
                <View style={[styles.dot, { backgroundColor: phase.color }]} />
                <Text style={[styles.metaText, { color: phase.color }]}>{phase.title}</Text>
              </>
            )}
          </View>

          {/* Key Points */}
          <View style={[styles.keyPointsCard, { backgroundColor: colorScheme === 'dark' ? '#1c2128' : '#f0f7ff', borderColor: colors.tint }]}>
            <Text style={[styles.keyPointsTitle, { color: colors.tint }]}>Points clés</Text>
            {lesson.keyPoints.map((point, i) => (
              <View key={i} style={styles.keyPointRow}>
                <FontAwesome name="check" size={12} color={colors.tint} style={{ marginTop: 4 }} />
                <Text style={[styles.keyPointText, { color: colors.text }]}>{point}</Text>
              </View>
            ))}
          </View>

          {/* Markdown Content */}
          <Markdown style={mdStyles}>{lesson.content}</Markdown>

          {/* Resources */}
          {lesson.resources.length > 0 && (
            <View style={{ marginTop: 20 }}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Ressources</Text>
              {lesson.resources.map((res, i) => (
                <Pressable
                  key={i}
                  style={[styles.resourceRow, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => Linking.openURL(res.url)}>
                  <FontAwesome
                    name={res.type === 'video' ? 'play-circle' : res.type === 'tool' ? 'wrench' : 'external-link'}
                    size={16}
                    color={colors.tint}
                  />
                  <Text style={[styles.resourceTitle, { color: colors.tint }]}>{res.title}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Mark Complete Button */}
        <Pressable
          style={[styles.completeBtn, { backgroundColor: isCompleted ? colors.success : colors.tint }]}
          onPress={() => toggleLesson(lesson.id)}>
          <FontAwesome name={isCompleted ? 'check-circle' : 'circle-o'} size={20} color="#fff" />
          <Text style={styles.completeBtnText}>
            {isCompleted ? 'Terminée !' : 'Marquer comme terminée'}
          </Text>
        </Pressable>

        {/* Navigation */}
        <View style={styles.navRow}>
          {prevLesson ? (
            <Pressable
              style={[styles.navBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.replace(`/lesson/${prevLesson.id}`)}>
              <FontAwesome name="chevron-left" size={14} color={colors.text} />
              <Text style={[styles.navBtnText, { color: colors.text }]} numberOfLines={1}>Précédent</Text>
            </Pressable>
          ) : <View style={{ flex: 1 }} />}
          {nextLesson ? (
            <Pressable
              style={[styles.navBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.replace(`/lesson/${nextLesson.id}`)}>
              <Text style={[styles.navBtnText, { color: colors.text }]} numberOfLines={1}>Suivant</Text>
              <FontAwesome name="chevron-right" size={14} color={colors.text} />
            </Pressable>
          ) : <View style={{ flex: 1 }} />}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { padding: 20 },
  lessonTitle: { fontSize: 24, fontWeight: 'bold' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8, marginBottom: 16 },
  metaText: { fontSize: 13 },
  dot: { width: 6, height: 6, borderRadius: 3, marginLeft: 4 },
  keyPointsCard: { padding: 16, borderRadius: 12, borderLeftWidth: 4, marginBottom: 20 },
  keyPointsTitle: { fontSize: 15, fontWeight: '700', marginBottom: 8 },
  keyPointRow: { flexDirection: 'row', gap: 8, marginVertical: 3 },
  keyPointText: { flex: 1, fontSize: 14, lineHeight: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  resourceRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12,
    borderRadius: 10, borderWidth: 1, marginBottom: 6,
  },
  resourceTitle: { fontSize: 14, flex: 1 },
  completeBtn: {
    marginHorizontal: 20, padding: 16, borderRadius: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
  },
  completeBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  navRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginTop: 16 },
  navBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: 14, borderRadius: 12, borderWidth: 1,
  },
  navBtnText: { fontSize: 14, fontWeight: '500' },
});
