import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import 'react-native-reanimated';

import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { Inter_800ExtraBold } from '@expo-google-fonts/inter/800ExtraBold';

import { useColorScheme } from '@/components/useColorScheme';
import { useStore } from '@/store/useStore';
import { gradients } from '@/constants/Colors';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });
  const loadData = useStore((s) => s.loadData);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      loadData().then(() => SplashScreen.hideAsync());
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'transparent',
    card: 'transparent',
    primary: '#6BB5FF',
  },
};

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f5f6fa',
    primary: '#4A90D9',
  },
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemeProvider value={isDark ? CustomDarkTheme : CustomLightTheme}>
      <View style={styles.root}>
        {isDark && (
          <LinearGradient
            colors={gradients.backgroundDark}
            style={StyleSheet.absoluteFill}
          />
        )}
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: 'transparent' },
            headerTransparent: isDark,
            headerShadowVisible: false,
            contentStyle: { backgroundColor: isDark ? 'transparent' : '#f5f6fa' },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="phase/[id]"
            options={{ headerShown: true, title: 'Phase', headerBackTitle: 'Retour', headerShadowVisible: false }}
          />
          <Stack.Screen
            name="lesson/[id]"
            options={{ headerShown: true, title: 'Lecon', headerBackTitle: 'Retour', headerShadowVisible: false }}
          />
          <Stack.Screen
            name="quiz/[phaseId]"
            options={{ headerShown: false, presentation: 'fullScreenModal' }}
          />
          <Stack.Screen
            name="quiz/lesson/[lessonId]"
            options={{ headerShown: false, presentation: 'fullScreenModal' }}
          />
          <Stack.Screen
            name="quiz/results"
            options={{ headerShown: false, presentation: 'fullScreenModal' }}
          />
        </Stack>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0a0e1a' },
});
