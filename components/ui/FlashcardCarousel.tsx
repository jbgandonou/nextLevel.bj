import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Fonts } from '@/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 80;
const CARD_HEIGHT = 160;

interface FlashcardProps {
  index: number;
  text: string;
  total: number;
  accentColor: string;
  isDark: boolean;
}

function Flashcard({ index, text, total, accentColor, isDark }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);
  const rotation = useSharedValue(0);

  const handleFlip = () => {
    const newFlipped = !flipped;
    setFlipped(newFlipped);
    rotation.value = withTiming(newFlipped ? 180 : 0, {
      duration: 400,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const frontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 180], [0, 180]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden' as const,
      opacity: rotateY > 90 ? 0 : 1,
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 180], [180, 360]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden' as const,
      opacity: rotateY > 90 && rotateY < 270 ? 1 : 0,
    };
  });

  return (
    <Pressable onPress={handleFlip} style={styles.cardContainer}>
      {/* Front */}
      <Animated.View style={[styles.card, frontStyle]}>
        <LinearGradient
          colors={[accentColor, accentColor + 'BB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}
        >
          <View style={styles.cardNumber}>
            <Text style={styles.cardNumberText}>{index + 1}/{total}</Text>
          </View>
          <FontAwesome name="key" size={28} color="rgba(255,255,255,0.3)" />
          <Text style={styles.frontLabel}>Tapez pour reveler</Text>
          <View style={styles.tapIcon}>
            <FontAwesome name="hand-pointer-o" size={14} color="rgba(255,255,255,0.6)" />
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Back */}
      <Animated.View style={[styles.card, styles.cardBack, backStyle]}>
        <View style={[styles.cardBackInner, {
          backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#fff',
          borderColor: isDark ? 'rgba(255,255,255,0.12)' : accentColor + '30',
        }]}>
          <View style={[styles.backNumber, { backgroundColor: accentColor + '20' }]}>
            <Text style={[styles.backNumberText, { color: accentColor }]}>{index + 1}</Text>
          </View>
          <Text style={[styles.backText, { color: isDark ? '#e0e0e0' : '#1a1a2e' }]} numberOfLines={5}>
            {text}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

interface FlashcardCarouselProps {
  keyPoints: string[];
  accentColor: string;
  isDark: boolean;
}

export default function FlashcardCarousel({ keyPoints, accentColor, isDark }: FlashcardCarouselProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          colors={[accentColor, accentColor + 'BB']}
          style={styles.headerIcon}
        >
          <FontAwesome name="key" size={14} color="#fff" />
        </LinearGradient>
        <View>
          <Text style={[styles.headerTitle, { color: isDark ? '#e0e0e0' : '#1a1a2e' }]}>
            Points cles a retenir
          </Text>
          <Text style={[styles.headerSub, { color: isDark ? '#999' : '#666' }]}>
            {keyPoints.length} flashcards — glissez et tapez
          </Text>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 12}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
      >
        {keyPoints.map((point, i) => (
          <Flashcard
            key={i}
            index={i}
            text={point}
            total={keyPoints.length}
            accentColor={accentColor}
            isDark={isDark}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  headerIcon: {
    width: 36, height: 36, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 16, fontFamily: Fonts.bold },
  headerSub: { fontSize: 12, fontFamily: Fonts.medium, marginTop: 1 },
  scrollContent: { paddingRight: 20 },
  cardContainer: {
    width: CARD_WIDTH, height: CARD_HEIGHT,
    marginRight: 12,
  },
  card: {
    width: CARD_WIDTH, height: CARD_HEIGHT,
    borderRadius: 16, position: 'absolute',
  },
  cardBack: {},
  cardGradient: {
    flex: 1, borderRadius: 16, padding: 18,
    alignItems: 'center', justifyContent: 'center', gap: 8,
    overflow: 'hidden',
  },
  cardNumber: {
    position: 'absolute', top: 12, left: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
  },
  cardNumberText: { color: '#fff', fontSize: 11, fontFamily: Fonts.bold },
  frontLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontFamily: Fonts.medium },
  tapIcon: {
    position: 'absolute', bottom: 12, right: 14,
  },
  cardBackInner: {
    flex: 1, borderRadius: 16, padding: 18,
    borderWidth: 1, justifyContent: 'center',
  },
  backNumber: {
    position: 'absolute', top: 12, left: 14,
    width: 26, height: 26, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
  },
  backNumberText: { fontSize: 12, fontFamily: Fonts.bold },
  backText: { fontSize: 14, fontFamily: Fonts.regular, lineHeight: 21, paddingTop: 14 },
});
