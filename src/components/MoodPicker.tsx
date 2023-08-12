import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { MoodOptionType } from '../types';
import { theme } from '../theme';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';

const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

interface MoodPickerProps {
  onSelect: (mood: MoodOptionType) => void;
}

const imageSrc = require('../../assets/img/butterflies.png');

export const MoodPicker: React.FC<MoodPickerProps> = ({ onSelect }) => {

  const styles = StyleSheet.create({
    moodText: {
      fontSize: 24,
    },
    moodList: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    moodItem: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      marginBottom: 5,
    },
    selectedMoodItem: {
      position: 'absolute',
      backgroundColor: theme.colorPurple,
      borderColor: theme.colorWhite,
      width: 60,
      height: 60,
      borderWidth: 2,
      borderRadius: 30,
    },
    descriptionText: {
      color: theme.colorPurple,
      fontWeight: 'bold',
      fontSize: 10,
      textAlign: 'center',
      fontFamily: theme.fontFamilyBold,
    },
    container: {
      height: 250,
      borderWidth: 2,
      borderColor: theme.colorPurple,
      margin: 10,
      borderRadius: 10,
      padding: 20,
      justifyContent: 'space-between',
      backgroundColor: 'rgba(0,0,0,0.3)', // using rgba will give just the background opacity. If you use 'opacity' then everything inside will also be opaque
    },
    heading: {
      fontSize: 20,
      letterSpacing: 1,
      textAlign: 'center',
      color: theme.colorWhite,
      fontFamily: theme.fontFamilyBold,
    },
    button: {
      backgroundColor: theme.colorPurple,
      width: 150,
      borderRadius: 20,
      alignSelf: 'center',
      padding: 10,
    },
    buttonText: {
      color: theme.colorWhite,
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: theme.fontFamilyBold,
    },
    image: {
      alignSelf: 'center',
    },
  });

  
  const [selectedMood, setSelectedMood] = useState<MoodOptionType>();
  const [previousSelectedMood, setPreviousSelectedMood] =
    useState<MoodOptionType>();
  const [hasSelected, setHasSelected] = useState<boolean>(false);

  const ReanimatedPressable = Animated.createAnimatedComponent(Pressable);

  const selectedMoodSize = useSharedValue(0);

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedMood !== undefined ? withTiming(1) : withTiming(0.5),
      transform: [{ scale: selectedMood ? withTiming(1) : 0.8 }],
    }),
    [selectedMood],
  );

  const handleSelect = React.useCallback(() => {
    if (selectedMood) {
      onSelect(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [onSelect, selectedMood]);

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image source={imageSrc} style={styles.image} />
        <Pressable style={styles.button} onPress={() => setHasSelected(false)}>
          <Text style={styles.buttonText}>Choose Another</Text>
        </Pressable>
      </View>
    );
  }

  console.log({ selectedMood, previousSelectedMood });

  const startIncreaseAnimation = () => {
    selectedMoodSize.value = withTiming(60, { duration: 200 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now?</Text>
      <View style={styles.moodList}>
        {moodOptions.map(option => (
          <View key={option.emoji}>
            <Pressable
              onPress={() => {
                setSelectedMood(option);
                selectedMood ? setPreviousSelectedMood(selectedMood) : null;
              }}
              style={[styles.moodItem]}>
              <View
                style={
                  option.emoji === selectedMood?.emoji
                    ? styles.selectedMoodItem
                    : undefined
                }
              />
              <Text style={styles.moodText}>{option.emoji}</Text>
            </Pressable>
            <Text style={styles.descriptionText}>
              {selectedMood?.emoji === option.emoji ? option.description : ' '}
            </Text>
          </View>
        ))}
      </View>
      <ReanimatedPressable
        style={[styles.button, buttonStyle]}
        onPress={handleSelect}>
        <Text style={styles.buttonText}>Choose</Text>
      </ReanimatedPressable>
    </View>
  );
};

