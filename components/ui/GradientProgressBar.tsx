import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface GradientProgressBarProps {
  progress: number; // 0-1
  colors?: readonly [string, string, ...string[]];
  height?: number;
  trackColor?: string;
}

export default function GradientProgressBar({
  progress,
  colors = ['#4A90D9', '#6BB5FF'],
  height = 10,
  trackColor = '#e0e0e0',
}: GradientProgressBarProps) {
  const animatedWidth = useSharedValue(0);

  useEffect(() => {
    animatedWidth.value = withTiming(Math.min(Math.max(progress, 0), 1), {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress]);

  const widthStyle = useAnimatedStyle(() => ({
    width: `${animatedWidth.value * 100}%` as any,
  }));

  return (
    <View style={[styles.track, { height, borderRadius: height / 2, backgroundColor: trackColor }]}>
      <Animated.View style={[styles.fill, { height, borderRadius: height / 2 }, widthStyle]}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, { borderRadius: height / 2 }]}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: { overflow: 'hidden', width: '100%' },
  fill: { overflow: 'hidden' },
});
