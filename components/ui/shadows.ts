import { Platform, ViewStyle } from 'react-native';

type ColorScheme = 'light' | 'dark';

export function cardShadow(colorScheme: ColorScheme): ViewStyle {
  if (Platform.OS === 'android') {
    return { elevation: 4 };
  }
  return colorScheme === 'dark'
    ? {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      };
}

export function cardShadowLight(colorScheme: ColorScheme): ViewStyle {
  if (Platform.OS === 'android') {
    return { elevation: 2 };
  }
  return colorScheme === 'dark'
    ? {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      };
}

export function cardShadowHeavy(colorScheme: ColorScheme): ViewStyle {
  if (Platform.OS === 'android') {
    return { elevation: 8 };
  }
  return colorScheme === 'dark'
    ? {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
      }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      };
}
