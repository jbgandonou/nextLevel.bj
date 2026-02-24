import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { gradients, Fonts } from '@/constants/Colors';
import AnimatedPressable from './AnimatedPressable';
import { getLevelTitle } from '@/utils/gamification';

interface LevelUpModalProps {
  visible: boolean;
  level: number;
  onClose: () => void;
}

export default function LevelUpModal({ visible, level, onClose }: LevelUpModalProps) {
  const scale = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSequence(
        withTiming(0, { duration: 0 }),
        withSpring(1.1, { damping: 8, stiffness: 100 }),
        withSpring(1, { damping: 15, stiffness: 150 })
      );
      rotate.value = withDelay(
        200,
        withSequence(
          withTiming(-5, { duration: 100 }),
          withTiming(5, { duration: 100 }),
          withTiming(0, { duration: 100 })
        )
      );
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
    opacity: opacity.value,
  }));

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <LinearGradient
            colors={gradients.level}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.iconCircle}>
            <FontAwesome name="arrow-up" size={32} color="#FFD700" />
          </View>
          <Text style={styles.title}>LEVEL UP!</Text>
          <Text style={styles.level}>Niveau {level}</Text>
          <Text style={styles.subtitle}>{getLevelTitle(level)}</Text>
          <AnimatedPressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Continuer</Text>
          </AnimatedPressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  card: {
    width: '100%',
    borderRadius: 28,
    padding: 32,
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#FFD700',
    fontSize: 28,
    fontFamily: Fonts.extraBold,
    letterSpacing: 3,
  },
  level: {
    color: '#fff',
    fontSize: 40,
    fontFamily: Fonts.extraBold,
    marginTop: 8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    fontFamily: Fonts.medium,
    marginTop: 4,
  },
  button: {
    marginTop: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
});
