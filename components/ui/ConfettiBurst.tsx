import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PARTICLE_COUNT = 20;
const COLORS = ['#FFD700', '#FF6B6B', '#4ECDC4', '#9B59B6', '#2ECC71', '#E74C3C', '#3498DB', '#F39C12'];

interface ConfettiParticleProps {
  index: number;
}

function ConfettiParticle({ index }: ConfettiParticleProps) {
  const translateY = useSharedValue(-20);
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(0);

  const startX = Math.random() * SCREEN_WIDTH;
  const endX = startX + (Math.random() - 0.5) * 200;
  const endY = SCREEN_HEIGHT * 0.5 + Math.random() * SCREEN_HEIGHT * 0.4;
  const color = COLORS[index % COLORS.length];
  const size = 6 + Math.random() * 6;
  const isSquare = index % 3 !== 0;

  useEffect(() => {
    const delay = index * 50 + Math.random() * 200;
    const duration = 1500 + Math.random() * 1000;

    scale.value = withDelay(delay, withTiming(1, { duration: 200 }));
    translateY.value = withDelay(delay, withTiming(endY, {
      duration,
      easing: Easing.out(Easing.quad),
    }));
    translateX.value = withDelay(delay, withTiming(endX - startX, {
      duration,
      easing: Easing.inOut(Easing.sin),
    }));
    rotate.value = withDelay(delay, withTiming(360 * (2 + Math.random() * 3), {
      duration,
    }));
    opacity.value = withDelay(delay + duration * 0.6, withTiming(0, {
      duration: duration * 0.4,
    }));
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[{
        position: 'absolute',
        left: startX,
        top: -10,
        width: size,
        height: isSquare ? size : size * 0.5,
        backgroundColor: color,
        borderRadius: isSquare ? 2 : size,
      }, animStyle]}
    />
  );
}

export default function ConfettiBurst() {
  return (
    <View style={styles.container} pointerEvents="none">
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <ConfettiParticle key={i} index={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    pointerEvents: 'none',
  },
});
