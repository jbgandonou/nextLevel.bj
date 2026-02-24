import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import Colors, { Fonts } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  focused: boolean;
}) {
  const { focused, ...rest } = props;
  return (
    <View style={{ alignItems: 'center' }}>
      <FontAwesome size={24} style={{ marginBottom: focused ? 2 : -3 }} {...rest} />
      {focused && (
        <View style={{
          width: 5,
          height: 5,
          borderRadius: 2.5,
          backgroundColor: props.color,
          marginTop: 2,
        }} />
      )}
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? '#6BB5FF' : colors.tint,
        tabBarInactiveTintColor: isDark ? 'rgba(255,255,255,0.35)' : colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : colors.card,
          borderTopWidth: isDark ? 1 : 0,
          borderTopColor: isDark ? 'rgba(255,255,255,0.08)' : 'transparent',
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
          position: isDark ? 'absolute' : 'relative',
          ...(isDark ? {} : Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
            },
            android: { elevation: 8 },
          })),
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: Fonts.semiBold,
          letterSpacing: 0.3,
        },
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTitleStyle: {
          fontFamily: Fonts.bold,
          color: colors.text,
        },
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerTransparent: isDark,
        sceneStyle: { backgroundColor: 'transparent' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="dashboard" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="phases"
        options={{
          title: 'Phases',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="list-ol" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: 'QCM',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="question-circle" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="user" color={color} focused={focused} />,
        }}
      />
    </Tabs>
  );
}
