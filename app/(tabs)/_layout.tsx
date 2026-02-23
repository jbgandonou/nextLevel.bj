import React from 'react';
import { View, Platform } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: colorScheme === 'dark' ? 0.3 : 0.06,
              shadowRadius: 8,
            },
            android: { elevation: 8 },
          }),
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: Fonts.semiBold,
          letterSpacing: 0.3,
        },
        headerStyle: {
          backgroundColor: colors.card,
          ...Platform.select({
            ios: {
              shadowColor: 'transparent',
              shadowOpacity: 0,
            },
          }),
        },
        headerTitleStyle: {
          fontFamily: Fonts.bold,
        },
        headerShadowVisible: false,
        headerTintColor: colors.text,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
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
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="user" color={color} focused={focused} />,
        }}
      />
    </Tabs>
  );
}
