import React from 'react';
import { Pressable, PressableProps, ViewStyle, StyleProp } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

interface AnimatedPressableProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  scaleValue?: number;
}

export default function AnimatedPressable({
  style,
  scaleValue = 0.97,
  children,
  ...props
}: AnimatedPressableProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressableBase
      {...props}
      style={[animatedStyle, style]}
      onPressIn={(e) => {
        scale.value = withSpring(scaleValue, { damping: 15, stiffness: 150 });
        props.onPressIn?.(e);
      }}
      onPressOut={(e) => {
        scale.value = withSpring(1, { damping: 15, stiffness: 150 });
        props.onPressOut?.(e);
      }}>
      {children}
    </AnimatedPressableBase>
  );
}
