import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Fonts } from '@/constants/Colors';
import { QuizQuestion } from '@/data/types';

interface InlineKnowledgeCheckProps {
  question: QuizQuestion;
  accentColor: string;
  isDark: boolean;
}

export default function InlineKnowledgeCheck({ question, accentColor, isDark }: InlineKnowledgeCheckProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const scale = useSharedValue(1);
  const shakeX = useSharedValue(0);

  const isCorrect = selectedIndex === question.correctIndex;

  const handleSelect = useCallback((index: number) => {
    if (answered) return;
    setSelectedIndex(index);
    setAnswered(true);

    if (index === question.correctIndex) {
      scale.value = withSpring(1.05, { damping: 8, stiffness: 200 }, () => {
        scale.value = withSpring(1);
      });
    } else {
      shakeX.value = withSequence(
        withTiming(-8, { duration: 50 }),
        withTiming(8, { duration: 50 }),
        withTiming(-6, { duration: 50 }),
        withTiming(6, { duration: 50 }),
        withTiming(0, { duration: 50 }),
      );
    }
  }, [answered, question.correctIndex]);

  const containerAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateX: shakeX.value }],
  }));

  const getOptionStyle = (index: number) => {
    if (!answered) {
      return {
        bg: isDark ? 'rgba(255,255,255,0.06)' : '#F5F5F5',
        border: isDark ? 'rgba(255,255,255,0.12)' : '#E0E0E0',
        textColor: isDark ? '#e0e0e0' : '#1a1a2e',
      };
    }
    if (index === question.correctIndex) {
      return {
        bg: '#2ECC7118',
        border: '#2ECC71',
        textColor: '#2ECC71',
      };
    }
    if (index === selectedIndex) {
      return {
        bg: '#E74C3C18',
        border: '#E74C3C',
        textColor: '#E74C3C',
      };
    }
    return {
      bg: isDark ? 'rgba(255,255,255,0.03)' : '#FAFAFA',
      border: isDark ? 'rgba(255,255,255,0.06)' : '#EEE',
      textColor: isDark ? 'rgba(255,255,255,0.3)' : '#BBB',
    };
  };

  return (
    <Animated.View style={[styles.container, containerAnimStyle]}>
      <View style={[styles.card, {
        backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#E8E8E8',
      }]}>
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={[accentColor, accentColor + 'BB']}
            style={styles.headerIcon}
          >
            <FontAwesome name="bolt" size={12} color="#fff" />
          </LinearGradient>
          <Text style={[styles.headerTitle, { color: isDark ? '#e0e0e0' : '#1a1a2e' }]}>
            Verifiez vos connaissances
          </Text>
        </View>

        {/* Question */}
        <Text style={[styles.question, { color: isDark ? '#e0e0e0' : '#1a1a2e' }]}>
          {question.question}
        </Text>

        {/* Options */}
        <View style={styles.options}>
          {question.options.map((option, i) => {
            const optStyle = getOptionStyle(i);
            return (
              <Pressable key={i} onPress={() => handleSelect(i)}>
                <View style={[styles.option, {
                  backgroundColor: optStyle.bg,
                  borderColor: optStyle.border,
                }]}>
                  <View style={[styles.optionLetter, { backgroundColor: optStyle.border + '30' }]}>
                    <Text style={[styles.optionLetterText, { color: optStyle.textColor }]}>
                      {String.fromCharCode(65 + i)}
                    </Text>
                  </View>
                  <Text style={[styles.optionText, { color: optStyle.textColor }]} numberOfLines={2}>
                    {option}
                  </Text>
                  {answered && i === question.correctIndex && (
                    <FontAwesome name="check-circle" size={16} color="#2ECC71" />
                  )}
                  {answered && i === selectedIndex && i !== question.correctIndex && (
                    <FontAwesome name="times-circle" size={16} color="#E74C3C" />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Explanation */}
        {answered && (
          <View style={[styles.explanation, {
            backgroundColor: isCorrect ? '#2ECC7112' : '#E74C3C12',
            borderColor: isCorrect ? '#2ECC7130' : '#E74C3C30',
          }]}>
            <FontAwesome
              name={isCorrect ? 'check-circle' : 'info-circle'}
              size={14}
              color={isCorrect ? '#2ECC71' : '#E74C3C'}
            />
            <Text style={[styles.explanationText, { color: isDark ? '#ccc' : '#555' }]}>
              {question.explanation}
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  card: {
    borderRadius: 20, borderWidth: 1, padding: 18,
    overflow: 'hidden',
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  headerIcon: {
    width: 30, height: 30, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 14, fontFamily: Fonts.semiBold },
  question: { fontSize: 15, fontFamily: Fonts.medium, lineHeight: 22, marginBottom: 14 },
  options: { gap: 8 },
  option: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 14, paddingVertical: 12, borderRadius: 14,
    borderWidth: 1,
  },
  optionLetter: {
    width: 24, height: 24, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
  },
  optionLetterText: { fontSize: 12, fontFamily: Fonts.bold },
  optionText: { flex: 1, fontSize: 13, fontFamily: Fonts.regular, lineHeight: 19 },
  explanation: {
    flexDirection: 'row', gap: 8, marginTop: 14,
    padding: 12, borderRadius: 12, borderWidth: 1,
    alignItems: 'flex-start',
  },
  explanationText: { flex: 1, fontSize: 12, fontFamily: Fonts.regular, lineHeight: 18 },
});
