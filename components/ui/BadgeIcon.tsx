import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { badgeGradients, Fonts } from '@/constants/Colors';
import type { BadgeRarity } from '@/data/types';

interface BadgeIconProps {
  icon: string;
  rarity: BadgeRarity;
  name: string;
  size?: number;
  earned?: boolean;
}

export default function BadgeIcon({
  icon,
  rarity,
  name,
  size = 64,
  earned = true,
}: BadgeIconProps) {
  const gradient = badgeGradients[rarity];
  const iconSize = size * 0.4;

  return (
    <View style={[styles.container, { width: size + 16 }]}>
      <View style={[styles.badgeCircle, { width: size, height: size, borderRadius: size / 2, opacity: earned ? 1 : 0.3 }]}>
        {earned ? (
          <LinearGradient
            colors={gradient}
            style={[StyleSheet.absoluteFill, { borderRadius: size / 2 }]}
          />
        ) : (
          <View style={[StyleSheet.absoluteFill, { borderRadius: size / 2, backgroundColor: 'rgba(255,255,255,0.08)' }]} />
        )}
        <FontAwesome
          name={icon as any}
          size={iconSize}
          color={earned ? '#fff' : 'rgba(255,255,255,0.3)'}
        />
      </View>
      <Text
        style={[styles.name, { color: earned ? '#e0e0e0' : 'rgba(255,255,255,0.3)' }]}
        numberOfLines={2}
      >
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 6 },
  badgeCircle: {
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.15)',
  },
  name: { fontSize: 10, fontFamily: Fonts.semiBold, textAlign: 'center' },
});
