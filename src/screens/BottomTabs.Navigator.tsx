import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Home } from './Home.screen';
import { History } from './History.screen';
import { Analytics } from './Analytics.screen';
import { AnalyticsIcon, HistoryIcon, HomeIcon, SettingsIcon } from '../components/Icons';
import { Text } from 'react-native';
import { theme } from '../theme';
import { Settings } from './Settings.screen';
import { useSettingsContext } from '../context/Settings.provider';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: React.FC = () => {

  const { userFont } = useSettingsContext()

  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        headerTitleStyle: {
            fontFamily: theme[userFont].fontFamilyRegular
        },
        tabBarActiveTintColor: theme.colorBlue,
        tabBarInactiveTintColor: theme.colorGrey,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Home':
              return <HomeIcon color={color} size={size} />;
            case 'History':
              return <HistoryIcon color={color} size={size} />;
            case 'Analytics':
              return <AnalyticsIcon color={color} size={size} />;
            case 'Settings':
              return <SettingsIcon color={color} size={size} />
            default:
              return <Text>{route.name}</Text>;
          }
        },
      })}>
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{ title: "Today's Mood" }}
      />
      <BottomTabs.Screen
        name="History"
        component={History}
        options={{ title: 'Past Moods' }}
      />
      <BottomTabs.Screen
        name="Analytics"
        component={Analytics}
        options={{ title: 'Analytics' }}
      />
      <BottomTabs.Screen
        name="Settings"
        component={Settings}
        options={{ title: 'Settings'}}
      />
    </BottomTabs.Navigator>
  );
};
