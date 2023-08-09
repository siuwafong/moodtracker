import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MoodPicker } from '../components/MoodPicker';
import { MoodItemRow } from '../components/MoodItemRow';
import { useAppContext } from '../App.provider';

export const Home: React.FC = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
  });

  const { handleSelectMood } = useAppContext()

  return (
    <View style={styles.container}>
      <MoodPicker onSelect={handleSelectMood} />
    </View>
  );
};
