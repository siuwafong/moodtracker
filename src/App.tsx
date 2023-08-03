import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { BottomTabsNavigator } from './screens/BottomTabs.Navigator'

export const App: React.FC = () => {
  return (
    <NavigationContainer> 
      <BottomTabsNavigator />
    </NavigationContainer>
  )
}
