import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { Fonts } from '@/constants/Colors';

interface XPToastProps {
  xp: number;
  visible: boolean;
  onHide: () => void;
}

export default function XPToast({ xp, visible, onHide }: XPToastProps) {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    if (visible && xp > 0) {
      translateY.value = withSequence(
        withTiming(-20, { duration: 400, easing: Easing.out(Easing.back(1.5)) }),
        withDelay(1500, withTiming(-60, { duration: 400 }))
      );
      opacity.value = withSequence(
        withTiming(1, { duration: 300 }),
        withDelay(1500, withTiming(0, { duration: 400 }, () => {
          runOnJS(onHide)();
        }))
      );
      scale.value = withSequence(
        withTiming(1.2, { duration: 200, easing: Easing.out(Easing.back(2)) }),
        withTiming(1, { duration: 200 })
      );
    }
  }, [visible, xp]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  if (!visible || xp <= 0) return null;

  return (
    <Animated.View style={[styles.toast, animatedStyle]}>
      <Text style={styles.text}>+{xp} XP</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,215,0,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.4)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    zIndex: 999,
  },
  text: {
    color: '#FFD700',
    fontSize: 20,
    fontFamily: Fonts.extraBold,
    letterSpacing: 1,
  },
});
