import React, { useState, useRef, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Platform } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Markdown from 'react-native-markdown-display';

import { useColorScheme } from '@/components/useColorScheme';
import Colors, { gradients, Spacing, Fonts } from '@/constants/Colors';
import { useStore } from '@/store/useStore';
import { getLessonById, getLessonsByPhase } from '@/data/lessons';
import { getQuizByLesson } from '@/data/quizzes';
import { phases } from '@/data/phases';
import { cardShadow, cardShadowLight } from '@/components/ui/shadows';
import AnimatedPressable from '@/components/ui/AnimatedPressable';
import DiagramBlock, { isDiagram } from '@/components/ui/DiagramBlock';
import GradientProgressBar from '@/components/ui/GradientProgressBar';
import VisualDiagram, { DiagramData } from '@/components/ui/VisualDiagram';
import PremiumTable, { parseMarkdownTable } from '@/components/ui/PremiumTable';

/** Regex to match markdown tables (header + separator + rows) */
const TABLE_REGEX = /(?:^|\n)((?:\|[^\n]+\|\s*\n)\|[\s\-:|]+\|\s*\n(?:\|[^\n]+\|\s*\n?)+)/g;

/** Split markdown content into segments: text and tables */
function splitContentSegments(markdown: string): { type: 'md' | 'table'; content: string }[] {
  const segments: { type: 'md' | 'table'; content: string }[] = [];
  let lastIndex = 0;

  const matches = [...markdown.matchAll(TABLE_REGEX)];
  for (const match of matches) {
    const tableStart = match.index! + (match[0].startsWith('\n') ? 1 : 0);
    const tableStr = match[1];

    // Text before the table
    if (tableStart > lastIndex) {
      const textBefore = markdown.slice(lastIndex, tableStart).trim();
      if (textBefore) segments.push({ type: 'md', content: textBefore });
    }

    segments.push({ type: 'table', content: tableStr.trim() });
    lastIndex = tableStart + tableStr.length;
  }

  // Remaining text after last table
  if (lastIndex < markdown.length) {
    const remaining = markdown.slice(lastIndex).trim();
    if (remaining) segments.push({ type: 'md', content: remaining });
  }

  // If no tables found, return the whole thing as markdown
  if (segments.length === 0) {
    segments.push({ type: 'md', content: markdown });
  }

  return segments;
}

/** Split markdown content into pages by ## headings */
function splitIntoPages(content: string): string[] {
  // Split by ## (h2) headings — keep the heading with its section
  const parts = content.split(/(?=^## )/m);
  const pages: string[] = [];
  let current = '';

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    // If adding this part would make the page very long, start a new page
    // But always keep at least one section per page
    if (current && (current.length + trimmed.length > 2000 || current.split('\n').length > 60)) {
      pages.push(current.trim());
      current = trimmed;
    } else {
      current = current ? current + '\n\n' + trimmed : trimmed;
    }
  }
  if (current.trim()) pages.push(current.trim());

  // If only 1 page, try splitting by ### instead for finer granularity
  if (pages.length <= 1 && content.length > 2500) {
    const h3Parts = content.split(/(?=^### )/m);
    const h3Pages: string[] = [];
    let h3Current = '';
    for (const part of h3Parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      if (h3Current && (h3Current.length + trimmed.length > 2000 || h3Current.split('\n').length > 60)) {
        h3Pages.push(h3Current.trim());
        h3Current = trimmed;
      } else {
        h3Current = h3Current ? h3Current + '\n\n' + trimmed : trimmed;
      }
    }
    if (h3Current.trim()) h3Pages.push(h3Current.trim());
    if (h3Pages.length > 1) return h3Pages;
  }

  return pages.length > 0 ? pages : [content];
}

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();
  const { completedLessons, toggleLesson } = useStore();
  const scrollRef = useRef<ScrollView>(null);

  const lesson = getLessonById(id);
  if (!lesson) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.notFound, { color: colors.text }]}>Lecon introuvable</Text>
      </View>
    );
  }

  const isCompleted = completedLessons.includes(lesson.id);
  const phase = phases.find((p) => p.id === lesson.phaseId);
  const phaseLessons = getLessonsByPhase(lesson.phaseId);
  const currentIndex = phaseLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? phaseLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < phaseLessons.length - 1 ? phaseLessons[currentIndex + 1] : null;

  // Pagination
  const pages = useMemo(() => splitIntoPages(lesson.content), [lesson.content]);
  const [pageIndex, setPageIndex] = useState(0);
  const totalPages = pages.length;
  const currentPageContent = pages[pageIndex] || '';
  const isLastPage = pageIndex === totalPages - 1;
  const isFirstPage = pageIndex === 0;

  const goToPage = useCallback((idx: number) => {
    setPageIndex(idx);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  const getResourceIcon = (type: string): React.ComponentProps<typeof FontAwesome>['name'] => {
    switch (type) {
      case 'video': return 'play-circle';
      case 'tool': return 'wrench';
      case 'book': return 'book';
      case 'course': return 'graduation-cap';
      default: return 'external-link';
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'video': return { bg: '#E74C3C20', fg: '#E74C3C' };
      case 'tool': return { bg: '#9B59B620', fg: '#9B59B6' };
      case 'book': return { bg: '#F39C1220', fg: '#F39C12' };
      case 'course': return { bg: '#2ECC7120', fg: '#2ECC71' };
      default: return { bg: colors.tintLight, fg: colors.tint };
    }
  };

  const isDark = colorScheme === 'dark';
  const codeBg = isDark ? '#0d1117' : '#F6F8FA';
  const codeAccent = phase?.color || colors.tint;
  const tableBorderColor = isDark ? '#2d333b' : '#D8DEE4';

  const mdStyles = {
    body: { color: colors.text, fontSize: 15, lineHeight: 24, fontFamily: Fonts.regular },
    heading1: { color: colors.text, fontSize: 24, fontFamily: Fonts.extraBold, marginTop: 24, marginBottom: 12 },
    heading2: { color: colors.text, fontSize: 20, fontFamily: Fonts.bold, marginTop: 22, marginBottom: 10 },
    heading3: { color: colors.text, fontSize: 17, fontFamily: Fonts.semiBold, marginTop: 18, marginBottom: 8 },
    paragraph: { color: colors.text, fontSize: 15, lineHeight: 24, fontFamily: Fonts.regular, marginBottom: 12 },
    listItem: { color: colors.text, fontSize: 15, lineHeight: 24, fontFamily: Fonts.regular },
    bullet_list_icon: { color: colors.tint, marginLeft: 10, marginRight: 10 },
    ordered_list_icon: { color: colors.tint, marginLeft: 10, marginRight: 10 },
    code_inline: {
      backgroundColor: isDark ? '#2d333b' : '#EFF1F5',
      color: isDark ? '#e6edf3' : '#1F2937',
      paddingHorizontal: 7, paddingVertical: 2, borderRadius: 5, fontSize: 13,
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    fence: { backgroundColor: 'transparent', borderWidth: 0, padding: 0, margin: 0 },
    code_block: { backgroundColor: 'transparent', borderWidth: 0, padding: 0, margin: 0 },
    blockquote: {
      backgroundColor: isDark ? '#1c2128' : '#f0f7ff',
      borderLeftColor: colors.tint, borderLeftWidth: 4, paddingLeft: 14,
      paddingVertical: 10, paddingRight: 14, marginVertical: 10, borderRadius: 6,
    },
    strong: { color: colors.text, fontFamily: Fonts.bold },
    em: { color: colors.text, fontStyle: 'italic' as const },
    hr: { backgroundColor: tableBorderColor, height: 1, marginVertical: 16 },
    link: { color: colors.tint, textDecorationLine: 'underline' as const },
  };

  const renderRules = {
    fence: (node: any) => {
      let content = node.content;
      if (typeof content === 'string' && content.endsWith('\n')) content = content.slice(0, -1);

      // Route to VisualDiagram for ```diagram blocks
      if (node.sourceInfo === 'diagram') {
        try {
          const diagramData: DiagramData = JSON.parse(content);
          return <VisualDiagram key={node.key} data={diagramData} isDark={isDark} />;
        } catch { /* fall through to code block */ }
      }

      // Route to DiagramBlock if ASCII art detected
      if (isDiagram(content)) {
        return <DiagramBlock key={node.key} content={content} accentColor={codeAccent} isDark={isDark} />;
      }

      return (
        <View
          key={node.key}
          style={{
            marginVertical: 12, borderRadius: 12, overflow: 'hidden', borderWidth: 1,
            borderColor: isDark ? '#2d333b' : '#E2E8F0',
            ...(isDark
              ? { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 6, elevation: 4 }
              : { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }),
          }}>
          <View style={{ flexDirection: 'row' }}>
            <LinearGradient colors={[codeAccent, codeAccent + '88']} style={{ width: 4 }} />
            <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={{ flexGrow: 1 }}>
              <View style={{ backgroundColor: codeBg, paddingVertical: 14, paddingHorizontal: 16, minWidth: '100%' }}>
                {content.split('\n').map((line: string, i: number) => (
                  <View key={i} style={{ flexDirection: 'row' }}>
                    <Text style={{
                      color: isDark ? '#484f58' : '#B0B8C4', fontSize: 11,
                      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
                      lineHeight: 20, width: 30, textAlign: 'right', marginRight: 12,
                    }}>{i + 1}</Text>
                    <Text style={{
                      color: isDark ? '#e6edf3' : '#1F2937', fontSize: 12.5,
                      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', lineHeight: 20,
                    }}>{line || ' '}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      );
    },
    code_block: (node: any) => {
      let content = node.content;
      if (typeof content === 'string' && content.endsWith('\n')) content = content.slice(0, -1);

      if (node.sourceInfo === 'diagram') {
        try {
          const diagramData: DiagramData = JSON.parse(content);
          return <VisualDiagram key={node.key} data={diagramData} isDark={isDark} />;
        } catch { /* fall through */ }
      }

      if (isDiagram(content)) {
        return <DiagramBlock key={node.key} content={content} accentColor={codeAccent} isDark={isDark} />;
      }

      return (
        <View
          key={node.key}
          style={{
            marginVertical: 12, borderRadius: 12, overflow: 'hidden', borderWidth: 1,
            borderColor: isDark ? '#2d333b' : '#E2E8F0',
            ...(isDark
              ? { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 6, elevation: 4 }
              : { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }),
          }}>
          <View style={{ flexDirection: 'row' }}>
            <LinearGradient colors={[codeAccent, codeAccent + '88']} style={{ width: 4 }} />
            <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={{ flexGrow: 1 }}>
              <View style={{ backgroundColor: codeBg, paddingVertical: 14, paddingHorizontal: 16, minWidth: '100%' }}>
                <Text style={{
                  color: isDark ? '#e6edf3' : '#1F2937', fontSize: 12.5,
                  fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', lineHeight: 20,
                }}>{content}</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    },
  };

  const successGradient = gradients.success;
  const pageProgress = (pageIndex + 1) / totalPages;

  return (
    <>
      <Stack.Screen
        options={{
          title: `Lecon ${currentIndex + 1}/${phaseLessons.length}`,
          headerTintColor: phase?.color,
        }}
      />
      <ScrollView ref={scrollRef} style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          {/* Title & meta — only on first page */}
          {isFirstPage && (
            <>
              <Text style={[styles.lessonTitle, { color: colors.text }]}>{lesson.title}</Text>
              <View style={styles.metaRow}>
                <FontAwesome name="clock-o" size={14} color={colors.textSecondary} />
                <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                  ~{lesson.estimatedMinutes} min
                </Text>
                {phase && (
                  <>
                    <View style={[styles.dot, { backgroundColor: phase.color }]} />
                    <Text style={[styles.metaPhase, { color: phase.color }]}>{phase.title}</Text>
                  </>
                )}
              </View>

              {/* Key Points */}
              <View style={[styles.keyPointsCard, { backgroundColor: isDark ? '#1c2128' : '#f0f7ff' }, cardShadow(colorScheme)]}>
                <View style={[styles.keyPointsAccent, { backgroundColor: colors.tint }]} />
                <Text style={[styles.keyPointsTitle, { color: colors.tint }]}>Points cles</Text>
                {lesson.keyPoints.map((point, i) => (
                  <View key={i} style={styles.keyPointRow}>
                    <FontAwesome name="check" size={12} color={colors.tint} style={{ marginTop: 4 }} />
                    <Text style={[styles.keyPointText, { color: colors.text }]}>{point}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Page progress indicator */}
          {totalPages > 1 && (
            <View style={styles.pageIndicatorContainer}>
              <View style={styles.pageIndicatorRow}>
                <Text style={[styles.pageIndicatorText, { color: colors.textSecondary }]}>
                  Page {pageIndex + 1} / {totalPages}
                </Text>
                <View style={styles.pageDots}>
                  {pages.map((_, i) => (
                    <AnimatedPressable key={i} onPress={() => goToPage(i)}>
                      <View style={[
                        styles.pageDot,
                        {
                          backgroundColor: i === pageIndex ? (phase?.color || colors.tint) : colors.borderLight,
                          width: i === pageIndex ? 20 : 8,
                        },
                      ]} />
                    </AnimatedPressable>
                  ))}
                </View>
              </View>
              <GradientProgressBar
                progress={pageProgress}
                colors={[phase?.color || colors.tint, (phase?.color || colors.tint) + 'CC'] as [string, string]}
                height={3}
                trackColor={colors.borderLight}
              />
            </View>
          )}

          {/* Current page Content — tables extracted and rendered separately */}
          {splitContentSegments(currentPageContent).map((segment, segIdx) => {
            if (segment.type === 'table') {
              const parsed = parseMarkdownTable(segment.content);
              if (parsed) {
                return (
                  <PremiumTable
                    key={`table-${segIdx}`}
                    headers={parsed.headers}
                    rows={parsed.rows}
                    accentColor={codeAccent}
                    isDark={isDark}
                  />
                );
              }
            }
            return (
              <Markdown key={`md-${segIdx}`} style={mdStyles} rules={renderRules}>
                {segment.content}
              </Markdown>
            );
          })}

          {/* Page navigation */}
          {totalPages > 1 && (
            <View style={styles.pageNavRow}>
              {!isFirstPage ? (
                <AnimatedPressable
                  style={[styles.pageNavBtn, { backgroundColor: colors.card }, cardShadowLight(colorScheme)]}
                  onPress={() => goToPage(pageIndex - 1)}>
                  <FontAwesome name="chevron-left" size={14} color={phase?.color || colors.tint} />
                  <Text style={[styles.pageNavBtnText, { color: colors.text }]}>Precedent</Text>
                </AnimatedPressable>
              ) : <View style={{ flex: 1 }} />}

              {!isLastPage ? (
                <AnimatedPressable style={{ flex: 1 }} onPress={() => goToPage(pageIndex + 1)}>
                  <LinearGradient
                    colors={[phase?.color || colors.tint, (phase?.color || colors.tint) + 'CC'] as [string, string]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.pageNavBtnGradient}>
                    <Text style={styles.pageNavBtnGradientText}>Suivant</Text>
                    <FontAwesome name="chevron-right" size={14} color="#fff" />
                  </LinearGradient>
                </AnimatedPressable>
              ) : <View style={{ flex: 1 }} />}
            </View>
          )}

          {/* Resources & complete button — only on last page */}
          {isLastPage && (
            <>
              {lesson.resources.length > 0 && (
                <View style={{ marginTop: Spacing.xl }}>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>Ressources</Text>
                  {lesson.resources.map((res, i) => {
                    const resColor = getResourceColor(res.type);
                    return (
                      <AnimatedPressable
                        key={i}
                        style={[styles.resourceRow, { backgroundColor: colors.card }, cardShadowLight(colorScheme)]}
                        onPress={() => Linking.openURL(res.url)}>
                        <View style={[styles.resourceIcon, { backgroundColor: resColor.bg }]}>
                          <FontAwesome name={getResourceIcon(res.type)} size={14} color={resColor.fg} />
                        </View>
                        <Text style={[styles.resourceTitle, { color: colors.tint }]}>{res.title}</Text>
                      </AnimatedPressable>
                    );
                  })}
                </View>
              )}
            </>
          )}
        </View>

        {/* Quiz Button — only on last page if questions exist */}
        {isLastPage && getQuizByLesson(lesson.id).length > 0 && (
          <AnimatedPressable
            style={{ marginHorizontal: Spacing.xl, marginBottom: Spacing.md }}
            onPress={() => router.push(`/quiz/lesson/${lesson.id}`)}>
            <LinearGradient
              colors={[phase?.color || colors.tint, (phase?.color || colors.tint) + 'CC'] as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.completeBtn}>
              <FontAwesome name="question-circle" size={20} color="#fff" />
              <Text style={styles.completeBtnText}>Tester mes connaissances</Text>
            </LinearGradient>
          </AnimatedPressable>
        )}

        {/* Mark Complete Button — only on last page */}
        {isLastPage && (
          <AnimatedPressable
            style={{ marginHorizontal: Spacing.xl }}
            onPress={() => toggleLesson(lesson.id)}>
            <LinearGradient
              colors={isCompleted ? successGradient : ([colors.tint, colors.tint + 'DD'] as [string, string])}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.completeBtn}>
              <FontAwesome name={isCompleted ? 'check-circle' : 'circle-o'} size={20} color="#fff" />
              <Text style={styles.completeBtnText}>
                {isCompleted ? 'Terminee !' : 'Marquer comme terminee'}
              </Text>
            </LinearGradient>
          </AnimatedPressable>
        )}

        {/* Lesson navigation — only on last page */}
        {isLastPage && (
          <View style={styles.navRow}>
            {prevLesson ? (
              <AnimatedPressable
                style={[styles.navBtn, { backgroundColor: colors.card }, cardShadowLight(colorScheme)]}
                onPress={() => router.replace(`/lesson/${prevLesson.id}`)}>
                <FontAwesome name="chevron-left" size={14} color={colors.text} />
                <Text style={[styles.navBtnText, { color: colors.text }]} numberOfLines={1}>Precedent</Text>
              </AnimatedPressable>
            ) : <View style={{ flex: 1 }} />}
            {nextLesson ? (
              <AnimatedPressable
                style={[styles.navBtn, { backgroundColor: colors.card }, cardShadowLight(colorScheme)]}
                onPress={() => router.replace(`/lesson/${nextLesson.id}`)}>
                <Text style={[styles.navBtnText, { color: colors.text }]} numberOfLines={1}>Lecon suivante</Text>
                <FontAwesome name="chevron-right" size={14} color={colors.text} />
              </AnimatedPressable>
            ) : <View style={{ flex: 1 }} />}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFound: { fontFamily: Fonts.medium, fontSize: 15 },
  content: { padding: Spacing.xl },
  lessonTitle: { fontSize: 24, fontFamily: Fonts.extraBold },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: Spacing.sm, marginBottom: Spacing.lg },
  metaText: { fontSize: 13, fontFamily: Fonts.regular },
  metaPhase: { fontSize: 13, fontFamily: Fonts.semiBold },
  dot: { width: 6, height: 6, borderRadius: 3, marginLeft: 4 },
  keyPointsCard: { padding: Spacing.lg, borderRadius: 12, marginBottom: Spacing.xl, overflow: 'hidden' },
  keyPointsAccent: {
    position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
    borderTopLeftRadius: 12, borderBottomLeftRadius: 12,
  },
  keyPointsTitle: { fontSize: 15, fontFamily: Fonts.bold, marginBottom: Spacing.sm },
  keyPointRow: { flexDirection: 'row', gap: 8, marginVertical: 3 },
  keyPointText: { flex: 1, fontSize: 14, fontFamily: Fonts.regular, lineHeight: 20 },
  sectionTitle: { fontSize: 18, fontFamily: Fonts.semiBold, marginBottom: 10 },
  // Page indicator
  pageIndicatorContainer: { marginBottom: Spacing.lg },
  pageIndicatorRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8,
  },
  pageIndicatorText: { fontSize: 12, fontFamily: Fonts.semiBold },
  pageDots: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  pageDot: { height: 8, borderRadius: 4 },
  // Page navigation
  pageNavRow: { flexDirection: 'row', gap: 10, marginTop: Spacing.xl },
  pageNavBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: 14, borderRadius: 12,
  },
  pageNavBtnText: { fontSize: 14, fontFamily: Fonts.medium },
  pageNavBtnGradient: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: 14, borderRadius: 12,
  },
  pageNavBtnGradientText: { color: '#fff', fontSize: 15, fontFamily: Fonts.semiBold },
  // Resources
  resourceRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.md,
    borderRadius: 10, marginBottom: 6,
  },
  resourceIcon: { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  resourceTitle: { fontSize: 14, fontFamily: Fonts.medium, flex: 1 },
  // Complete button
  completeBtn: {
    padding: Spacing.lg, borderRadius: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
  },
  completeBtnText: { color: '#fff', fontSize: 16, fontFamily: Fonts.semiBold },
  // Lesson navigation
  navRow: { flexDirection: 'row', paddingHorizontal: Spacing.xl, gap: 10, marginTop: Spacing.lg },
  navBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: 14, borderRadius: 12,
  },
  navBtnText: { fontSize: 14, fontFamily: Fonts.medium },
});
