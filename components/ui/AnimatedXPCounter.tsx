import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { Fonts } from '@/constants/Colors';

interface AnimatedXPCounterProps {
  xp: number;
  color?: string;
  delay?: number;
}

export default function AnimatedXPCounter({ xp, color = '#FFD700', delay = 0 }: AnimatedXPCounterProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
    scale.value = withDelay(
      delay,
      withSequence(
        withTiming(1.3, { duration: 300, easing: Easing.out(Easing.back(2)) }),
        withTiming(1, { duration: 200, easing: Easing.out(Easing.cubic) })
      )
    );
  }, [xp]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  if (xp <= 0) return null;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={[styles.text, { color }]}>+{xp} XP</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255,215,0,0.15)',
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.extraBold,
    letterSpacing: 0.5,
  },
});
