import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts } from '@/constants/Colors';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated';

interface AnimatedScoreCircleProps {
  percent: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color: string;
  backgroundColor?: string;
  textColor?: string;
  subtitleColor?: string;
  score: number;
  total: number;
}

export default function AnimatedScoreCircle({
  percent,
  size = 140,
  strokeWidth = 6,
  color,
  backgroundColor = '#e0e0e0',
  textColor,
  subtitleColor,
  score,
  total,
}: AnimatedScoreCircleProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(percent / 100, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, [percent]);

  // Left half (covers 50-100%)
  const leftRotateStyle = useAnimatedStyle(() => {
    const deg = progress.value > 0.5 ? (progress.value - 0.5) * 360 : 0;
    return { transform: [{ rotate: `${deg}deg` }] };
  });

  // Right half (covers 0-50%)
  const rightRotateStyle = useAnimatedStyle(() => {
    const deg = progress.value <= 0.5 ? progress.value * 360 : 180;
    return { transform: [{ rotate: `${deg}deg` }] };
  });

  const displayPercent = useDerivedValue(() => Math.round(progress.value * 100));

  const innerSize = size - strokeWidth * 2;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Background circle */}
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: backgroundColor,
          },
        ]}
      />

      {/* Right half clip (0-50%) */}
      <View style={[styles.halfClip, { width: size / 2, height: size, left: size / 2 }]}>
        <Animated.View
          style={[
            styles.halfCircle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: color,
              left: -(size / 2),
            },
            rightRotateStyle,
          ]}
        />
      </View>

      {/* Left half clip (50-100%) */}
      <View style={[styles.halfClip, { width: size / 2, height: size, left: 0 }]}>
        <Animated.View
          style={[
            styles.halfCircle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: color,
              left: 0,
            },
            leftRotateStyle,
          ]}
        />
      </View>

      {/* Center content */}
      <View style={[styles.center, { width: innerSize, height: innerSize, borderRadius: innerSize / 2 }]}>
        <Text style={[styles.percentText, { color: textColor || color, fontSize: size * 0.25 }]}>
          {percent}%
        </Text>
        <Text style={[styles.scoreText, { color: subtitleColor || '#999', fontSize: size * 0.11 }]}>
          {score}/{total}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  circle: { position: 'absolute' },
  halfClip: { position: 'absolute', overflow: 'hidden', top: 0 },
  halfCircle: {
    position: 'absolute',
    top: 0,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  center: { alignItems: 'center', justifyContent: 'center' },
  percentText: { fontFamily: Fonts.extraBold },
  scoreText: { fontFamily: Fonts.medium, marginTop: 2 },
});
