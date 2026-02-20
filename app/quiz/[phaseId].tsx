import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useStore } from '@/store/useStore';
import { phases } from '@/data/phases';
import { getRandomQuestions } from '@/data/quizzes';
import { QuizQuestion } from '@/data/types';

const QUESTIONS_PER_QUIZ = 10;
const TIMER_SECONDS = 30;

export default function QuizScreen() {
  const { phaseId } = useLocalSearchParams<{ phaseId: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();
  const { submitQuiz } = useStore();

  const [questions] = useState<QuizQuestion[]>(() => getRandomQuestions(phaseId, QUESTIONS_PER_QUIZ));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: string; selectedIndex: number; correct: boolean }[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [quizFinished, setQuizFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const phase = phases.find((p) => p.id === phaseId);
  const currentQuestion = questions[currentIndex];

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

    scale.value = withSequence(withSpring(1.05), withSpring(1));

    setAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion.id, selectedIndex: index, correct },
    ]);
  }, [selectedIndex, currentQuestion, scale]);

  const handleNext = useCallback(async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setShowExplanation(false);
      setTimeLeft(TIMER_SECONDS);
    } else {
      // Quiz finished
      const finalAnswers = answers;
      const score = finalAnswers.filter((a) => a.correct).length;
      await submitQuiz({
        phaseId,
        score,
        totalQuestions: questions.length,
        answers: finalAnswers,
      });
      setQuizFinished(true);
      router.replace({
        pathname: '/quiz/results',
        params: {
          phaseId,
          score: score.toString(),
          total: questions.length.toString(),
          answersJson: JSON.stringify(finalAnswers),
        },
      });
    }
  }, [currentIndex, questions, answers, phaseId, submitQuiz, router]);

  const handleQuit = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    router.back();
  }, [router]);

  if (questions.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.center}>
          <Text style={{ color: colors.text, fontSize: 16 }}>Aucune question disponible</Text>
          <Pressable style={[styles.backBtn, { backgroundColor: colors.tint }]} onPress={() => router.back()}>
            <Text style={styles.backBtnText}>Retour</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const getOptionColor = (index: number) => {
    if (!showExplanation) {
      return { bg: colors.card, border: colors.border };
    }
    if (index === currentQuestion.correctIndex) {
      return { bg: colors.success + '20', border: colors.success };
    }
    if (index === selectedIndex && index !== currentQuestion.correctIndex) {
      return { bg: colors.error + '20', border: colors.error };
    }
    return { bg: colors.card, border: colors.border };
  };

  const timerColor = timeLeft <= 10 ? colors.error : timeLeft <= 20 ? colors.warning : colors.success;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable onPress={handleQuit} style={styles.quitBtn}>
          <FontAwesome name="times" size={20} color={colors.textSecondary} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: phase?.color || colors.tint }]}>
            {phase?.title || 'QCM'}
          </Text>
          <Text style={[styles.questionCount, { color: colors.textSecondary }]}>
            {currentIndex + 1}/{questions.length}
          </Text>
        </View>
        <View style={[styles.timerBadge, { backgroundColor: timerColor + '20' }]}>
          <FontAwesome name="clock-o" size={14} color={timerColor} />
          <Text style={[styles.timerText, { color: timerColor }]}>{timeLeft}s</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={[styles.quizProgress, { backgroundColor: colors.border }]}>
        <View style={[styles.quizProgressFill, {
          width: `${((currentIndex + (showExplanation ? 1 : 0)) / questions.length) * 100}%`,
          backgroundColor: phase?.color || colors.tint,
        }]} />
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer}>
        {/* Difficulty badge */}
        <View style={[styles.diffBadge, {
          backgroundColor: currentQuestion.difficulty === 'hard' ? colors.error + '20'
            : currentQuestion.difficulty === 'medium' ? colors.warning + '20' : colors.success + '20',
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
        <Animated.View style={animatedStyle}>
          {currentQuestion.options.map((option, index) => {
            const optColors = getOptionColor(index);
            return (
              <Pressable
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
              </Pressable>
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
          <Pressable
            style={[styles.nextBtn, { backgroundColor: phase?.color || colors.tint }]}
            onPress={handleNext}>
            <Text style={styles.nextBtnText}>
              {currentIndex < questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
            </Text>
            <FontAwesome name="arrow-right" size={16} color="#fff" />
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1,
  },
  quitBtn: { padding: 8 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 15, fontWeight: '600' },
  questionCount: { fontSize: 12, marginTop: 2 },
  timerBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12,
  },
  timerText: { fontSize: 14, fontWeight: '700' },
  quizProgress: { height: 3 },
  quizProgressFill: { height: '100%' },
  scrollContent: { flex: 1 },
  scrollContainer: { padding: 20 },
  diffBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 12 },
  diffText: { fontSize: 12, fontWeight: '600' },
  question: { fontSize: 18, fontWeight: '600', lineHeight: 26, marginBottom: 20 },
  option: {
    flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 14,
    borderWidth: 1.5, marginBottom: 10, gap: 12,
  },
  optionLetter: {
    width: 32, height: 32, borderRadius: 16, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  optionLetterText: { fontSize: 14, fontWeight: '600' },
  optionText: { flex: 1, fontSize: 15, lineHeight: 22 },
  explanationCard: {
    flexDirection: 'row', gap: 10, padding: 16, borderRadius: 12,
    borderLeftWidth: 4, marginTop: 10, alignItems: 'flex-start',
  },
  explanationText: { flex: 1, fontSize: 14, lineHeight: 22 },
  nextBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, padding: 16, borderRadius: 14, marginTop: 20,
  },
  nextBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  backBtn: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10, marginTop: 10 },
  backBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
