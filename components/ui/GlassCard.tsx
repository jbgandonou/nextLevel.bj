import React from 'react';
import { View, ViewStyle, StyleProp, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Override glass background colors */
  glassColors?: readonly [string, string, ...string[]];
  /** Border color override */
  borderColor?: string;
  isDark?: boolean;
}

export default function GlassCard({
  children,
  style,
  glassColors,
  borderColor,
  isDark = true,
}: GlassCardProps) {
  const defaultColors = isDark
    ? (['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.04)'] as const)
    : (['rgba(255,255,255,0.7)', 'rgba(255,255,255,0.5)'] as const);

  const border = borderColor || (isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.8)');

  return (
    <View style={[styles.wrapper, { borderColor: border }, style]}>
      <LinearGradient
        colors={glassColors || defaultColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 20,
  },
});
