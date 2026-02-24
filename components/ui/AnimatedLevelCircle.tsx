import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { gradients, Fonts } from '@/constants/Colors';
import { getXPProgress } from '@/utils/gamification';

interface AnimatedLevelCircleProps {
  level: number;
  totalXP: number;
  size?: number;
  strokeWidth?: number;
}

export default function AnimatedLevelCircle({
  level,
  totalXP,
  size = 100,
  strokeWidth = 6,
}: AnimatedLevelCircleProps) {
  const progress = useSharedValue(0);
  const xpProgress = getXPProgress(totalXP);

  useEffect(() => {
    progress.value = withTiming(xpProgress, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });
  }, [xpProgress]);

  const rightRotateStyle = useAnimatedStyle(() => {
    const deg = progress.value <= 0.5 ? progress.value * 360 : 180;
    return { transform: [{ rotate: `${deg}deg` }] };
  });

  const leftRotateStyle = useAnimatedStyle(() => {
    const deg = progress.value > 0.5 ? (progress.value - 0.5) * 360 : 0;
    return { transform: [{ rotate: `${deg}deg` }] };
  });

  const innerSize = size - strokeWidth * 2;
  const bgColor = 'rgba(255,255,255,0.1)';
  const fgColor = '#9B59B6';

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Background ring */}
      <View
        style={[styles.circle, {
          width: size, height: size, borderRadius: size / 2,
          borderWidth: strokeWidth, borderColor: bgColor,
        }]}
      />

      {/* Right half (0-50%) */}
      <View style={[styles.halfClip, { width: size / 2, height: size, left: size / 2 }]}>
        <Animated.View
          style={[styles.halfCircle, {
            width: size, height: size, borderRadius: size / 2,
            borderWidth: strokeWidth, borderColor: fgColor,
            left: -(size / 2),
          }, rightRotateStyle]}
        />
      </View>

      {/* Left half (50-100%) */}
      <View style={[styles.halfClip, { width: size / 2, height: size, left: 0 }]}>
        <Animated.View
          style={[styles.halfCircle, {
            width: size, height: size, borderRadius: size / 2,
            borderWidth: strokeWidth, borderColor: fgColor,
            left: 0,
          }, leftRotateStyle]}
        />
      </View>

      {/* Center */}
      <View style={[styles.center, { width: innerSize, height: innerSize, borderRadius: innerSize / 2 }]}>
        <LinearGradient
          colors={gradients.level}
          style={[StyleSheet.absoluteFill, { borderRadius: innerSize / 2 }]}
        />
        <Text style={[styles.levelText, { fontSize: size * 0.3 }]}>{level}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  circle: { position: 'absolute' },
  halfClip: { position: 'absolute', overflow: 'hidden', top: 0 },
  halfCircle: {
    position: 'absolute', top: 0,
    borderLeftColor: 'transparent', borderBottomColor: 'transparent',
  },
  center: { alignItems: 'center', justifyContent: 'center' },
  levelText: { color: '#fff', fontFamily: Fonts.extraBold },
});
