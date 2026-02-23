import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import Colors, { Spacing, Fonts } from '@/constants/Colors';
import { useStore } from '@/store/useStore';
import { phases } from '@/data/phases';
import { getLessonById } from '@/data/lessons';
import { getRandomQuestionsByLesson } from '@/data/quizzes';
import { QuizQuestion } from '@/data/types';
import AnimatedPressable from '@/components/ui/AnimatedPressable';
import GradientProgressBar from '@/components/ui/GradientProgressBar';

const QUESTIONS_PER_QUIZ = 10;
const TIMER_SECONDS = 30;

export default function LessonQuizScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();
  const { submitQuiz } = useStore();

  const lesson = getLessonById(lessonId);
  const phase = lesson ? phases.find((p) => p.id === lesson.phaseId) : null;

  const [questions] = useState<QuizQuestion[]>(() => getRandomQuestionsByLesson(lessonId, QUESTIONS_PER_QUIZ));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: string; selectedIndex: number; correct: boolean }[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [quizFinished, setQuizFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scale = useSharedValue(1);
  const shakeX = useSharedValue(0);
  const timerPulse = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const timerPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: timerPulse.value }],
  }));

  const currentQuestion = questions[currentIndex];

  // Timer pulse when < 10s
  useEffect(() => {
    if (timeLeft <= 10 && !showExplanation && !quizFinished) {
      timerPulse.value = withRepeat(
        withSequence(
          withTiming(1.15, { duration: 400, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) })
        ),
        -1, true
      );
    } else {
      timerPulse.value = withTiming(1, { duration: 200 });
    }
  }, [timeLeft <= 10, showExplanation, quizFinished]);

  // Timer
  useEffect(() => {
    if (showExplanation || quizFinished) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleTimeout();
          return TIMER_SECONDS;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, showExplanation, quizFinished]);

  const handleTimeout = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedIndex(-1);
    setShowExplanation(true);
    shakeX.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
    setAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion.id, selectedIndex: -1, correct: false },
    ]);
  }, [currentIndex, currentQuestion]);

  const handleSelect = useCallback((index: number) => {
    if (selectedIndex !== null) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const correct = index === currentQuestion.correctIndex;
    setSelectedIndex(index);
    setShowExplanation(true);

    if (correct) {
      scale.value = withSequence(withSpring(1.05), withSpring(1));
    } else {
      shakeX.value = withSequence(
        withTiming(-8, { duration: 50 }),
        withTiming(8, { duration: 50 }),
        withTiming(-8, { duration: 50 }),
        withTiming(8, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }

    setAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion.id, selectedIndex: index, correct },
    ]);
  }, [selectedIndex, currentQuestion, scale, shakeX]);

  const handleNext = useCallback(async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setShowExplanation(false);
      setTimeLeft(TIMER_SECONDS);
    } else {
      const finalAnswers = answers;
      const score = finalAnswers.filter((a) => a.correct).length;
      await submitQuiz({
        phaseId: lesson?.phaseId || '',
        lessonId,
        score,
        totalQuestions: questions.length,
        answers: finalAnswers,
      });
      setQuizFinished(true);
      router.replace({
        pathname: '/quiz/results',
        params: {
          phaseId: lesson?.phaseId || '',
          lessonId,
          score: score.toString(),
          total: questions.length.toString(),
          answersJson: JSON.stringify(finalAnswers),
        },
      });
    }
  }, [currentIndex, questions, answers, lessonId, lesson, submitQuiz, router]);

  const handleQuit = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    router.back();
  }, [router]);

  if (questions.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.center}>
          <Text style={[styles.emptyText, { color: colors.text }]}>Aucune question disponible pour cette lecon</Text>
          <AnimatedPressable style={[styles.backBtn, { backgroundColor: colors.tint }]} onPress={() => router.back()}>
            <Text style={styles.backBtnText}>Retour</Text>
          </AnimatedPressable>
        </View>
      </SafeAreaView>
    );
  }

  const getOptionColor = (index: number) => {
    if (!showExplanation) {
      return { bg: colors.card, border: colors.border };
    }
    if (index === currentQuestion.correctIndex) {
      return { bg: colors.successLight, border: colors.success };
    }
    if (index === selectedIndex && index !== currentQuestion.correctIndex) {
      return { bg: colors.errorLight, border: colors.error };
    }
    return { bg: colors.card, border: colors.border };
  };

  const timerColor = timeLeft <= 10 ? colors.error : timeLeft <= 20 ? colors.warning : colors.success;
  const quizProgress = (currentIndex + (showExplanation ? 1 : 0)) / questions.length;
  const accentColor = phase?.color || colors.tint;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <AnimatedPressable onPress={handleQuit} style={styles.quitBtn}>
          <FontAwesome name="times" size={20} color={colors.textSecondary} />
        </AnimatedPressable>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: accentColor }]} numberOfLines={1}>
            {lesson?.title || 'QCM'}
          </Text>
          <Text style={[styles.questionCount, { color: colors.textSecondary }]}>
            {currentIndex + 1}/{questions.length}
          </Text>
        </View>
        <Animated.View style={timerPulseStyle}>
          <View style={[styles.timerBadge, { backgroundColor: timerColor + '20' }]}>
            <FontAwesome name="clock-o" size={14} color={timerColor} />
            <Text style={[styles.timerText, { color: timerColor }]}>{timeLeft}s</Text>
          </View>
        </Animated.View>
      </View>

      {/* Progress bar */}
      <View style={{ paddingHorizontal: 0 }}>
        <GradientProgressBar
          progress={quizProgress}
          colors={[accentColor, accentColor + 'CC'] as [string, string]}
          height={4}
          trackColor={colors.borderLight}
        />
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer}>
        {/* Difficulty badge */}
        <View style={[styles.diffBadge, {
          backgroundColor: currentQuestion.difficulty === 'hard' ? colors.errorLight
            : currentQuestion.difficulty === 'medium' ? colors.warningLight : colors.successLight,
        }]}>
          <Text style={[styles.diffText, {
            color: currentQuestion.difficulty === 'hard' ? colors.error
              : currentQuestion.difficulty === 'medium' ? colors.warning : colors.success,
          }]}>
            {currentQuestion.difficulty === 'hard' ? 'Difficile' : currentQuestion.difficulty === 'medium' ? 'Moyen' : 'Facile'}
          </Text>
        </View>

        {/* Question */}
        <Text style={[styles.question, { color: colors.text }]}>{currentQuestion.question}</Text>

        {/* Options */}
        <Animated.View style={[animatedStyle, shakeStyle]}>
          {currentQuestion.options.map((option, index) => {
            const optColors = getOptionColor(index);
            return (
              <AnimatedPressable
                key={index}
                style={[styles.option, { backgroundColor: optColors.bg, borderColor: optColors.border }]}
                onPress={() => handleSelect(index)}
                disabled={showExplanation}>
                <View style={[styles.optionLetter, { borderColor: optColors.border }]}>
                  <Text style={[styles.optionLetterText, { color: colors.text }]}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text style={[styles.optionText, { color: colors.text }]}>{option}</Text>
                {showExplanation && index === currentQuestion.correctIndex && (
                  <FontAwesome name="check-circle" size={20} color={colors.success} />
                )}
                {showExplanation && index === selectedIndex && index !== currentQuestion.correctIndex && (
                  <FontAwesome name="times-circle" size={20} color={colors.error} />
                )}
              </AnimatedPressable>
            );
          })}
        </Animated.View>

        {/* Explanation */}
        {showExplanation && (
          <View style={[styles.explanationCard, {
            backgroundColor: colorScheme === 'dark' ? '#1c2128' : '#f0f7ff',
            borderColor: colors.tint,
          }]}>
            <FontAwesome name="lightbulb-o" size={18} color={colors.tint} />
            <Text style={[styles.explanationText, { color: colors.text }]}>
              {currentQuestion.explanation}
            </Text>
          </View>
        )}

        {/* Next button */}
        {showExplanation && (
          <AnimatedPressable onPress={handleNext} style={{ marginTop: Spacing.xl }}>
            <LinearGradient
              colors={[accentColor, accentColor + 'CC'] as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.nextBtn}>
              <Text style={styles.nextBtnText}>
                {currentIndex < questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
              </Text>
              <FontAwesome name="arrow-right" size={16} color="#fff" />
            </LinearGradient>
          </AnimatedPressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: Spacing.xl },
  emptyText: { fontSize: 16, fontFamily: Fonts.medium, textAlign: 'center' },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
  },
  quitBtn: { padding: Spacing.sm },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 15, fontFamily: Fonts.semiBold },
  questionCount: { fontSize: 12, fontFamily: Fonts.medium, marginTop: 2 },
  timerBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12,
  },
  timerText: { fontSize: 14, fontFamily: Fonts.bold },
  scrollContent: { flex: 1 },
  scrollContainer: { padding: Spacing.xl },
  diffBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, marginBottom: Spacing.md },
  diffText: { fontSize: 12, fontFamily: Fonts.semiBold },
  question: { fontSize: 18, fontFamily: Fonts.semiBold, lineHeight: 26, marginBottom: Spacing.xl },
  option: {
    flexDirection: 'row', alignItems: 'center', padding: Spacing.lg, borderRadius: 14,
    borderWidth: 1.5, marginBottom: 10, gap: 12,
  },
  optionLetter: {
    width: 32, height: 32, borderRadius: 16, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  optionLetterText: { fontSize: 14, fontFamily: Fonts.semiBold },
  optionText: { flex: 1, fontSize: 15, fontFamily: Fonts.regular, lineHeight: 22 },
  explanationCard: {
    flexDirection: 'row', gap: 10, padding: Spacing.lg, borderRadius: 12,
    borderLeftWidth: 4, marginTop: 10, alignItems: 'flex-start',
  },
  explanationText: { flex: 1, fontSize: 14, fontFamily: Fonts.regular, lineHeight: 22 },
  nextBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, padding: Spacing.lg, borderRadius: 14,
  },
  nextBtnText: { color: '#fff', fontSize: 16, fontFamily: Fonts.semiBold },
  backBtn: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10, marginTop: 10 },
  backBtnText: { color: '#fff', fontSize: 15, fontFamily: Fonts.semiBold },
});
