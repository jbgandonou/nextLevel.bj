import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Platform, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Markdown from 'react-native-markdown-display';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  Easing,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import Colors, { gradients, Spacing, Fonts } from '@/constants/Colors';
import { useStore } from '@/store/useStore';
import { getLessonById, getLessonsByPhase } from '@/data/lessons';
import { getQuizByLesson } from '@/data/quizzes';
import { phases } from '@/data/phases';
import AnimatedPressable from '@/components/ui/AnimatedPressable';
import GlassCard from '@/components/ui/GlassCard';
import DiagramBlock, { isDiagram } from '@/components/ui/DiagramBlock';
import GradientProgressBar from '@/components/ui/GradientProgressBar';
import VisualDiagram, { DiagramData } from '@/components/ui/VisualDiagram';
import PremiumTable, { parseMarkdownTable } from '@/components/ui/PremiumTable';
import XPToast from '@/components/ui/XPToast';
import LevelUpModal from '@/components/ui/LevelUpModal';
import FlashcardCarousel from '@/components/ui/FlashcardCarousel';
import InlineKnowledgeCheck from '@/components/ui/InlineKnowledgeCheck';
import { LESSON_XP } from '@/utils/gamification';

function getMotivationalText(progress: number): { text: string; icon: React.ComponentProps<typeof FontAwesome>['name'] } {
  if (progress <= 0.2) return { text: "C'est parti !", icon: 'rocket' };
  if (progress <= 0.5) return { text: 'Vous progressez bien !', icon: 'star' };
  if (progress <= 0.8) return { text: 'La fin approche !', icon: 'fire' };
  return { text: 'Derniere ligne droite !', icon: 'trophy' };
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = 220;

const TABLE_REGEX = /(?:^|\n)((?:\|[^\n]+\|\s*\n)\|[\s\-:|]+\|\s*\n(?:\|[^\n]+\|\s*\n?)+)/g;

function splitContentSegments(markdown: string): { type: 'md' | 'table'; content: string }[] {
  const segments: { type: 'md' | 'table'; content: string }[] = [];
  let lastIndex = 0;
  const matches = [...markdown.matchAll(TABLE_REGEX)];
  for (const match of matches) {
    const tableStart = match.index! + (match[0].startsWith('\n') ? 1 : 0);
    const tableStr = match[1];
    if (tableStart > lastIndex) {
      const textBefore = markdown.slice(lastIndex, tableStart).trim();
      if (textBefore) segments.push({ type: 'md', content: textBefore });
    }
    segments.push({ type: 'table', content: tableStr.trim() });
    lastIndex = tableStart + tableStr.length;
  }
  if (lastIndex < markdown.length) {
    const remaining = markdown.slice(lastIndex).trim();
    if (remaining) segments.push({ type: 'md', content: remaining });
  }
  if (segments.length === 0) segments.push({ type: 'md', content: markdown });
  return segments;
}

function splitIntoPages(content: string): string[] {
  const parts = content.split(/(?=^## )/m);
  const pages: string[] = [];
  let current = '';
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    if (current && (current.length + trimmed.length > 2000 || current.split('\n').length > 60)) {
      pages.push(current.trim());
      current = trimmed;
    } else {
      current = current ? current + '\n\n' + trimmed : trimmed;
    }
  }
  if (current.trim()) pages.push(current.trim());
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
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const { completedLessons, toggleLesson, level, clearNotifications } = useStore();
  const scrollRef = useRef<ScrollView>(null);

  const [showXPToast, setShowXPToast] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const scrollY = useSharedValue(0);

  const lesson = getLessonById(id);
  if (!lesson) {
    return (
      <View style={[styles.center, { backgroundColor: 'transparent' }]}>
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
  const phaseColor = phase?.color || colors.tint;

  const pages = useMemo(() => splitIntoPages(lesson.content), [lesson.content]);
  const [pageIndex, setPageIndex] = useState(0);
  const totalPages = pages.length;
  const currentPageContent = pages[pageIndex] || '';
  const isLastPage = pageIndex === totalPages - 1;
  const isFirstPage = pageIndex === 0;

  // Page transition animation
  const contentOpacity = useSharedValue(1);
  const contentTranslateX = useSharedValue(0);
  const [navDirection, setNavDirection] = useState<'forward' | 'backward'>('forward');

  const goToPage = useCallback((idx: number) => {
    const direction = idx > pageIndex ? 'forward' : 'backward';
    setNavDirection(direction);
    const dirX = direction === 'forward' ? -20 : 20;

    // Fade out
    contentOpacity.value = withTiming(0, { duration: 150, easing: Easing.in(Easing.ease) });
    contentTranslateX.value = withTiming(dirX, { duration: 150, easing: Easing.in(Easing.ease) });

    setTimeout(() => {
      setPageIndex(idx);
      scrollRef.current?.scrollTo({ y: 0, animated: true });

      // Reset position to opposite side and fade in
      contentTranslateX.value = -dirX;
      contentOpacity.value = withTiming(1, { duration: 250, easing: Easing.out(Easing.ease) });
      contentTranslateX.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.ease) });
    }, 160);
  }, [pageIndex]);

  const contentAnimStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateX: contentTranslateX.value }],
  }));

  // Quiz questions for inline knowledge check
  const lessonQuizzes = useMemo(() => getQuizByLesson(lesson.id), [lesson.id]);
  const inlineQuestion = useMemo(() => {
    if (lessonQuizzes.length === 0 || isLastPage || isFirstPage) return null;
    // Pick a question based on the page index for consistency
    return lessonQuizzes[pageIndex % lessonQuizzes.length];
  }, [lessonQuizzes, pageIndex, isLastPage, isFirstPage]);

  const handleComplete = async () => {
    await toggleLesson(lesson.id);
    if (!isCompleted) {
      setShowXPToast(true);
      setTimeout(() => {
        const state = useStore.getState();
        if (state.didLevelUp) setShowLevelUp(true);
      }, 500);
    }
  };

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
      case 'video': return { bg: '#E74C3C', fg: '#fff', label: 'Video' };
      case 'tool': return { bg: '#9B59B6', fg: '#fff', label: 'Outil' };
      case 'book': return { bg: '#F39C12', fg: '#fff', label: 'Livre' };
      case 'course': return { bg: '#2ECC71', fg: '#fff', label: 'Cours' };
      default: return { bg: phaseColor, fg: '#fff', label: 'Lien' };
    }
  };

  const codeBg = isDark ? '#0d1117' : '#F6F8FA';
  const codeAccent = phaseColor;

  // Parallax hero animation
  const heroAnimStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [0, HERO_HEIGHT], [0, -HERO_HEIGHT * 0.4], Extrapolation.CLAMP);
    const opacity = interpolate(scrollY.value, [0, HERO_HEIGHT * 0.6], [1, 0], Extrapolation.CLAMP);
    return { transform: [{ translateY }], opacity };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const mdStyles = {
    body: { color: colors.text, fontSize: 15.5, lineHeight: 26, fontFamily: Fonts.regular },
    heading1: { color: colors.text, fontSize: 26, fontFamily: Fonts.extraBold, marginTop: 28, marginBottom: 14 },
    heading2: { color: isDark ? '#fff' : '#1a1a2e', fontSize: 22, fontFamily: Fonts.bold, marginTop: 26, marginBottom: 12 },
    heading3: { color: isDark ? '#e0e0e0' : '#1a1a2e', fontSize: 18, fontFamily: Fonts.semiBold, marginTop: 20, marginBottom: 10 },
    paragraph: { color: colors.text, fontSize: 15.5, lineHeight: 26, fontFamily: Fonts.regular, marginBottom: 14 },
    listItem: { color: colors.text, fontSize: 15.5, lineHeight: 26, fontFamily: Fonts.regular },
    bullet_list_icon: { color: phaseColor, marginLeft: 10, marginRight: 10 },
    ordered_list_icon: { color: phaseColor, marginLeft: 10, marginRight: 10 },
    code_inline: {
      backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#EFF1F5',
      color: isDark ? '#e6edf3' : '#1F2937',
      paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6, fontSize: 13.5,
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    fence: { backgroundColor: 'transparent', borderWidth: 0, padding: 0, margin: 0 },
    code_block: { backgroundColor: 'transparent', borderWidth: 0, padding: 0, margin: 0 },
    blockquote: {
      backgroundColor: 'transparent', borderWidth: 0, borderLeftWidth: 0,
      padding: 0, margin: 0, marginVertical: 0,
    },
    strong: { color: isDark ? '#fff' : '#1a1a2e', fontFamily: Fonts.bold },
    em: { color: colors.text, fontStyle: 'italic' as const },
    hr: { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0', height: 1, marginVertical: 20 },
    link: { color: phaseColor, textDecorationLine: 'underline' as const },
  };

  const detectCalloutType = (node: any): { icon: React.ComponentProps<typeof FontAwesome>['name']; color: string; label: string } => {
    // Extract raw text from children nodes recursively
    const extractText = (n: any): string => {
      if (typeof n === 'string') return n;
      if (n?.content) return n.content;
      if (n?.children) return n.children.map(extractText).join('');
      if (Array.isArray(n)) return n.map(extractText).join('');
      return '';
    };
    const text = extractText(node).toLowerCase().trim();

    if (text.startsWith('pro tip') || text.startsWith('astuce') || text.startsWith('tip') || text.startsWith('conseil'))
      return { icon: 'lightbulb-o', color: '#2ECC71', label: 'PRO TIP' };
    if (text.startsWith('warning') || text.startsWith('attention') || text.startsWith('danger'))
      return { icon: 'exclamation-triangle', color: '#E74C3C', label: 'ATTENTION' };
    if (text.startsWith('important') || text.startsWith('note'))
      return { icon: 'exclamation-circle', color: '#F39C12', label: 'IMPORTANT' };
    if (text.startsWith('example') || text.startsWith('exemple'))
      return { icon: 'code', color: '#9B59B6', label: 'EXEMPLE' };

    // Default fallback
    return { icon: 'lightbulb-o', color: phaseColor, label: 'NOTE' };
  };

  const renderRules = {
    blockquote: (node: any, children: any, parent: any, rstyles: any) => {
      const callout = detectCalloutType(node);
      return (
        <View key={node.key} style={{
          marginVertical: 14, borderRadius: 16, overflow: 'hidden',
          borderWidth: 1, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
        }}>
          <LinearGradient
            colors={isDark
              ? [`${callout.color}18`, `${callout.color}08`]
              : [`${callout.color}12`, `${callout.color}06`]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 16, gap: 10 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={{
                width: 32, height: 32, borderRadius: 10,
                backgroundColor: callout.color + '25',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <FontAwesome name={callout.icon} size={16} color={callout.color} />
              </View>
              <View style={{
                backgroundColor: callout.color + '20',
                paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8,
              }}>
                <Text style={{
                  color: callout.color, fontSize: 10,
                  fontFamily: Fonts.bold, letterSpacing: 1,
                }}>{callout.label}</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>{children}</View>
          </LinearGradient>
          <View style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
            backgroundColor: callout.color,
          }} />
        </View>
      );
    },
    fence: (node: any) => {
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

      const lang = node.sourceInfo || '';

      return (
        <View key={node.key} style={{
          marginVertical: 14, borderRadius: 14, overflow: 'hidden',
          borderWidth: 1, borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0',
        }}>
          {/* Language label header */}
          <LinearGradient
            colors={[codeAccent, codeAccent + '99']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 6 }}
          >
            <FontAwesome name="code" size={11} color="rgba(255,255,255,0.8)" />
            <Text style={{
              color: 'rgba(255,255,255,0.9)', fontSize: 11,
              fontFamily: Fonts.semiBold, letterSpacing: 0.5, textTransform: 'uppercase',
            }}>{lang || 'code'}</Text>
          </LinearGradient>
          <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ backgroundColor: codeBg, paddingVertical: 14, paddingHorizontal: 16, minWidth: '100%' }}>
              {content.split('\n').map((line: string, i: number) => (
                <View key={i} style={{ flexDirection: 'row' }}>
                  <Text style={{
                    color: isDark ? '#484f58' : '#B0B8C4', fontSize: 11,
                    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
                    lineHeight: 20, width: 30, textAlign: 'right', marginRight: 14,
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
        <View key={node.key} style={{
          marginVertical: 14, borderRadius: 14, overflow: 'hidden',
          borderWidth: 1, borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0',
        }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ backgroundColor: codeBg, paddingVertical: 14, paddingHorizontal: 16, minWidth: '100%' }}>
              <Text style={{
                color: isDark ? '#e6edf3' : '#1F2937', fontSize: 12.5,
                fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', lineHeight: 20,
              }}>{content}</Text>
            </View>
          </ScrollView>
        </View>
      );
    },
  };

  const successGradient = gradients.success;
  const pageProgress = (pageIndex + 1) / totalPages;
  const quizCount = getQuizByLesson(lesson.id).length;
  const remainingMinutes = Math.max(1, Math.round(lesson.estimatedMinutes * (1 - pageProgress)));

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Sticky top progress bar */}
        <View style={styles.topBar}>
          <View style={styles.topBarInner}>
            <AnimatedPressable onPress={() => router.back()} style={styles.topBackBtn}>
              <FontAwesome name="chevron-left" size={16} color="#fff" />
            </AnimatedPressable>
            <View style={styles.topBarCenter}>
              <Text style={styles.topBarTitle} numberOfLines={1}>
                Lecon {currentIndex + 1}/{phaseLessons.length}
              </Text>
              {totalPages > 1 && (
                <Text style={styles.topBarSubtitle}>
                  Page {pageIndex + 1}/{totalPages}
                </Text>
              )}
            </View>
            {!isCompleted && (
              <View style={styles.topXpBadge}>
                <FontAwesome name="bolt" size={10} color="#FFD700" />
                <Text style={styles.topXpText}>+{LESSON_XP}</Text>
              </View>
            )}
            {isCompleted && (
              <View style={styles.topCompletedBadge}>
                <FontAwesome name="check" size={10} color="#2ECC71" />
              </View>
            )}
          </View>
          <GradientProgressBar
            progress={pageProgress}
            colors={[phaseColor, phaseColor + 'CC'] as [string, string]}
            height={3}
            trackColor="rgba(255,255,255,0.1)"
          />
        </View>

        <Animated.ScrollView
          ref={scrollRef as any}
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          {/* Hero header — first page only */}
          {isFirstPage && (
            <Animated.View style={heroAnimStyle}>
              <LinearGradient
                colors={[phaseColor, phaseColor + 'BB']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.hero}
              >
                {/* Decorative circles */}
                <View style={[styles.heroCircle, styles.heroCircle1, { backgroundColor: 'rgba(255,255,255,0.06)' }]} />
                <View style={[styles.heroCircle, styles.heroCircle2, { backgroundColor: 'rgba(255,255,255,0.04)' }]} />

                <View style={styles.heroContent}>
                  <View style={styles.heroBadgeRow}>
                    <View style={styles.heroPhaseBadge}>
                      <FontAwesome name={phase?.icon as any || 'book'} size={11} color="#fff" />
                      <Text style={styles.heroPhaseBadgeText}>{phase?.title}</Text>
                    </View>
                    <View style={styles.heroTimeBadge}>
                      <FontAwesome name="clock-o" size={11} color="rgba(255,255,255,0.8)" />
                      <Text style={styles.heroTimeText}>~{lesson.estimatedMinutes} min</Text>
                    </View>
                  </View>

                  <Text style={styles.heroTitle}>{lesson.title}</Text>

                  <View style={styles.heroFooter}>
                    <View style={styles.heroStatItem}>
                      <FontAwesome name="file-text-o" size={12} color="rgba(255,255,255,0.7)" />
                      <Text style={styles.heroStatText}>{totalPages} pages</Text>
                    </View>
                    {quizCount > 0 && (
                      <View style={styles.heroStatItem}>
                        <FontAwesome name="question-circle-o" size={12} color="rgba(255,255,255,0.7)" />
                        <Text style={styles.heroStatText}>{quizCount} QCM</Text>
                      </View>
                    )}
                    <View style={styles.heroStatItem}>
                      <FontAwesome name="check-circle-o" size={12} color="rgba(255,255,255,0.7)" />
                      <Text style={styles.heroStatText}>{lesson.keyPoints.length} points cles</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>
          )}

          <View style={styles.content}>
            {/* Key Points — first page, as flippable flashcard carousel */}
            {isFirstPage && lesson.keyPoints.length > 0 && (
              <FlashcardCarousel
                keyPoints={lesson.keyPoints}
                accentColor={phaseColor}
                isDark={isDark}
              />
            )}

            {/* Page indicator — multi-page lessons */}
            {totalPages > 1 && (
              <GlassCard isDark={isDark} style={styles.pageIndicatorCard}>
                <View style={styles.pageIndicatorRow}>
                  <View style={styles.pageIndicatorLeft}>
                    <Text style={[styles.pageIndicatorText, { color: colors.text }]}>
                      Page {pageIndex + 1} sur {totalPages}
                    </Text>
                    <Text style={[styles.pageTimeRemaining, { color: colors.textTertiary }]}>
                      ~{remainingMinutes} min restantes
                    </Text>
                  </View>
                  <View style={styles.pageDots}>
                    {pages.map((_, i) => (
                      <AnimatedPressable key={i} onPress={() => goToPage(i)}>
                        <View style={[
                          styles.pageDot,
                          {
                            backgroundColor: i === pageIndex ? phaseColor
                              : i < pageIndex ? phaseColor + '50'
                              : isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                            width: i === pageIndex ? 22 : 8,
                          },
                        ]} />
                      </AnimatedPressable>
                    ))}
                  </View>
                </View>
                {/* Motivational micro-text */}
                {(() => {
                  const motivation = getMotivationalText(pageProgress);
                  return (
                    <View style={styles.motivationRow}>
                      <FontAwesome name={motivation.icon} size={12} color={phaseColor} />
                      <Text style={[styles.motivationText, { color: phaseColor }]}>{motivation.text}</Text>
                    </View>
                  );
                })()}
              </GlassCard>
            )}

            {/* Markdown Content — animated page transitions */}
            <Animated.View style={[styles.markdownWrap, contentAnimStyle]}>
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

              {/* Inline knowledge check */}
              {inlineQuestion && (
                <InlineKnowledgeCheck
                  key={`kc-${pageIndex}-${inlineQuestion.id}`}
                  question={inlineQuestion}
                  accentColor={phaseColor}
                  isDark={isDark}
                />
              )}
            </Animated.View>

            {/* Page navigation */}
            {totalPages > 1 && (
              <View style={styles.pageNavRow}>
                {!isFirstPage ? (
                  <AnimatedPressable style={{ flex: 1 }} onPress={() => goToPage(pageIndex - 1)}>
                    <GlassCard isDark={isDark} style={styles.pageNavBtn}>
                      <FontAwesome name="chevron-left" size={14} color={phaseColor} />
                      <Text style={[styles.pageNavBtnText, { color: colors.text }]}>Precedent</Text>
                    </GlassCard>
                  </AnimatedPressable>
                ) : <View style={{ flex: 1 }} />}

                {!isLastPage ? (
                  <AnimatedPressable style={{ flex: 1 }} onPress={() => goToPage(pageIndex + 1)}>
                    <LinearGradient
                      colors={[phaseColor, phaseColor + 'CC'] as [string, string]}
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

            {/* Resources — last page */}
            {isLastPage && lesson.resources.length > 0 && (
              <View style={styles.resourcesSection}>
                <View style={styles.resourcesHeader}>
                  <FontAwesome name="bookmark" size={16} color={phaseColor} />
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>Pour aller plus loin</Text>
                </View>
                {lesson.resources.map((res, i) => {
                  const resColor = getResourceColor(res.type);
                  return (
                    <AnimatedPressable key={i} onPress={() => Linking.openURL(res.url)}>
                      <GlassCard isDark={isDark} style={styles.resourceRow}>
                        <LinearGradient
                          colors={[resColor.bg, resColor.bg + 'BB']}
                          style={styles.resourceIconCircle}
                        >
                          <FontAwesome name={getResourceIcon(res.type)} size={14} color={resColor.fg} />
                        </LinearGradient>
                        <View style={styles.resourceInfo}>
                          <Text style={[styles.resourceTitle, { color: colors.text }]}>{res.title}</Text>
                          <Text style={[styles.resourceType, { color: colors.textTertiary }]}>{resColor.label}</Text>
                        </View>
                        <FontAwesome name="external-link" size={12} color={colors.textTertiary} />
                      </GlassCard>
                    </AnimatedPressable>
                  );
                })}
              </View>
            )}
          </View>

          {/* Bottom actions — last page */}
          {isLastPage && (
            <View style={styles.bottomActions}>
              {/* Quiz CTA */}
              {quizCount > 0 && (
                <AnimatedPressable
                  style={styles.quizCTA}
                  onPress={() => router.push(`/quiz/lesson/${lesson.id}`)}>
                  <GlassCard
                    isDark={isDark}
                    style={styles.quizCTAInner}
                    glassColors={isDark
                      ? [`${phaseColor}20`, `${phaseColor}10`] as const
                      : [`${phaseColor}15`, `${phaseColor}08`] as const
                    }
                    borderColor={phaseColor + '40'}
                  >
                    <LinearGradient
                      colors={[phaseColor, phaseColor + 'BB']}
                      style={styles.quizCTAIcon}
                    >
                      <FontAwesome name="question" size={18} color="#fff" />
                    </LinearGradient>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.quizCTATitle, { color: colors.text }]}>Tester mes connaissances</Text>
                      <Text style={[styles.quizCTASub, { color: colors.textSecondary }]}>{quizCount} questions sur cette lecon</Text>
                    </View>
                    <FontAwesome name="play" size={14} color={phaseColor} />
                  </GlassCard>
                </AnimatedPressable>
              )}

              {/* Complete button */}
              <AnimatedPressable onPress={handleComplete}>
                <LinearGradient
                  colors={isCompleted ? successGradient : [phaseColor, phaseColor + 'DD'] as [string, string]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.completeBtn}>
                  <FontAwesome name={isCompleted ? 'check-circle' : 'circle-o'} size={22} color="#fff" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.completeBtnText}>
                      {isCompleted ? 'Lecon terminee !' : 'Marquer comme terminee'}
                    </Text>
                    {!isCompleted && (
                      <Text style={styles.completeBtnSub}>Gagnez {LESSON_XP} XP</Text>
                    )}
                  </View>
                  {!isCompleted && (
                    <View style={styles.completeBtnXP}>
                      <FontAwesome name="bolt" size={12} color="#FFD700" />
                      <Text style={styles.completeBtnXPText}>+{LESSON_XP}</Text>
                    </View>
                  )}
                </LinearGradient>
              </AnimatedPressable>

              {/* Lesson navigation */}
              <View style={styles.navRow}>
                {prevLesson ? (
                  <AnimatedPressable style={{ flex: 1 }} onPress={() => router.replace(`/lesson/${prevLesson.id}`)}>
                    <GlassCard isDark={isDark} style={styles.navBtn}>
                      <FontAwesome name="chevron-left" size={12} color={colors.textSecondary} />
                      <Text style={[styles.navBtnText, { color: colors.text }]} numberOfLines={1}>Precedente</Text>
                    </GlassCard>
                  </AnimatedPressable>
                ) : <View style={{ flex: 1 }} />}
                {nextLesson ? (
                  <AnimatedPressable style={{ flex: 1 }} onPress={() => router.replace(`/lesson/${nextLesson.id}`)}>
                    <GlassCard isDark={isDark} style={styles.navBtn}>
                      <Text style={[styles.navBtnText, { color: colors.text }]} numberOfLines={1}>Suivante</Text>
                      <FontAwesome name="chevron-right" size={12} color={colors.textSecondary} />
                    </GlassCard>
                  </AnimatedPressable>
                ) : <View style={{ flex: 1 }} />}
              </View>
            </View>
          )}

          <View style={{ height: 50 }} />
        </Animated.ScrollView>
      </View>

      <XPToast
        xp={LESSON_XP}
        visible={showXPToast}
        onHide={() => { setShowXPToast(false); clearNotifications(); }}
      />
      <LevelUpModal
        visible={showLevelUp}
        level={level}
        onClose={() => { setShowLevelUp(false); clearNotifications(); }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFound: { fontFamily: Fonts.medium, fontSize: 15 },
  scroll: { flex: 1 },

  // Top bar
  topBar: {
    paddingTop: Platform.OS === 'ios' ? 54 : 36,
    backgroundColor: 'rgba(10,14,26,0.85)',
    zIndex: 10,
  },
  topBarInner: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingBottom: 10, gap: 12,
  },
  topBackBtn: {
    width: 36, height: 36, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  topBarCenter: { flex: 1 },
  topBarTitle: { color: '#fff', fontSize: 14, fontFamily: Fonts.semiBold },
  topBarSubtitle: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: Fonts.medium, marginTop: 1 },
  topXpBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,215,0,0.15)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10,
  },
  topXpText: { color: '#FFD700', fontSize: 11, fontFamily: Fonts.bold },
  topCompletedBadge: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(46,204,113,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },

  // Hero
  hero: {
    height: HERO_HEIGHT, padding: 24, paddingTop: 20,
    justifyContent: 'flex-end', overflow: 'hidden',
  },
  heroCircle: { position: 'absolute', borderRadius: 999 },
  heroCircle1: { width: 200, height: 200, top: -60, right: -40 },
  heroCircle2: { width: 150, height: 150, bottom: -30, left: -30 },
  heroContent: { gap: 10 },
  heroBadgeRow: { flexDirection: 'row', gap: 8 },
  heroPhaseBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10,
  },
  heroPhaseBadgeText: { color: '#fff', fontSize: 11, fontFamily: Fonts.semiBold },
  heroTimeBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10,
  },
  heroTimeText: { color: 'rgba(255,255,255,0.8)', fontSize: 11, fontFamily: Fonts.medium },
  heroTitle: { color: '#fff', fontSize: 22, fontFamily: Fonts.extraBold, lineHeight: 28 },
  heroFooter: { flexDirection: 'row', gap: 16, marginTop: 4 },
  heroStatItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  heroStatText: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: Fonts.medium },

  // Content
  content: { padding: Spacing.xl },

  // Page indicator
  pageIndicatorCard: { padding: 14, marginBottom: 16 },
  pageIndicatorRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pageIndicatorLeft: {},
  pageIndicatorText: { fontSize: 13, fontFamily: Fonts.semiBold },
  pageTimeRemaining: { fontSize: 11, fontFamily: Fonts.medium, marginTop: 2 },
  pageDots: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  pageDot: { height: 8, borderRadius: 4 },
  motivationRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginTop: 10, justifyContent: 'center',
  },
  motivationText: { fontSize: 12, fontFamily: Fonts.semiBold },

  // Markdown
  markdownWrap: { marginTop: 4 },

  // Section
  sectionTitle: { fontSize: 18, fontFamily: Fonts.bold },

  // Page nav
  pageNavRow: { flexDirection: 'row', gap: 10, marginTop: Spacing.xxl },
  pageNavBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: 14,
  },
  pageNavBtnText: { fontSize: 14, fontFamily: Fonts.medium },
  pageNavBtnGradient: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: 14, borderRadius: 16,
  },
  pageNavBtnGradientText: { color: '#fff', fontSize: 15, fontFamily: Fonts.semiBold },

  // Resources
  resourcesSection: { marginTop: 28 },
  resourcesHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  resourceRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14,
    marginBottom: 8,
  },
  resourceIconCircle: {
    width: 38, height: 38, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  resourceInfo: { flex: 1 },
  resourceTitle: { fontSize: 14, fontFamily: Fonts.medium },
  resourceType: { fontSize: 11, fontFamily: Fonts.medium, marginTop: 2 },

  // Bottom actions
  bottomActions: { paddingHorizontal: Spacing.xl, gap: 12, marginTop: 8 },
  quizCTA: {},
  quizCTAInner: {
    flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16,
  },
  quizCTAIcon: {
    width: 44, height: 44, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  quizCTATitle: { fontSize: 15, fontFamily: Fonts.bold },
  quizCTASub: { fontSize: 12, fontFamily: Fonts.regular, marginTop: 2 },

  // Complete
  completeBtn: {
    padding: 18, borderRadius: 18,
    flexDirection: 'row', alignItems: 'center', gap: 14,
  },
  completeBtnText: { color: '#fff', fontSize: 16, fontFamily: Fonts.bold },
  completeBtnSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: Fonts.regular, marginTop: 2 },
  completeBtnXP: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10,
  },
  completeBtnXPText: { color: '#FFD700', fontSize: 13, fontFamily: Fonts.bold },

  // Nav
  navRow: { flexDirection: 'row', gap: 10 },
  navBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: 14,
  },
  navBtnText: { fontSize: 13, fontFamily: Fonts.medium },
});
