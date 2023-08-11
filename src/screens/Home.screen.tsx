import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { MoodPicker } from '../components/MoodPicker';
import { useAppContext } from '../App.provider';


export const Home: React.FC = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    square: {
        width: 100,
        height: 100,
        backgroundColor: 'lightgreen'
    }
  });

  const { handleSelectMood } = useAppContext();

  const imageSrc = require('../../assets/img/background.png')

  return (
    <ImageBackground source={imageSrc} style={styles.container}>
      <MoodPicker onSelect={handleSelectMood} />
    </ImageBackground>
  );
};
