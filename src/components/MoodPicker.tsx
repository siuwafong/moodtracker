import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { MoodOptionType } from '../types';
import { theme } from '../theme';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { AppText } from './AppText';

export const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '🥰', description: 'loved'},
  { emoji: '😤', description: 'frustrated' },
  { emoji: '😪', description: 'sleepy'},
  { emoji: '😰', description: 'anxious'},
];

interface MoodPickerProps {
  onSelect: (mood: MoodOptionType) => void;
}

const imageSrc = require('../../assets/img/butterflies.png');

export const MoodPicker: React.FC<MoodPickerProps> = ({ onSelect }) => {
  const [selectedMood, setSelectedMood] = useState<MoodOptionType>();
  const [previousSelectedMood, setPreviousSelectedMood] =
    useState<MoodOptionType>();
  const [hasSelected, setHasSelected] = useState<boolean>(false);

  const ReanimatedPressable = Animated.createAnimatedComponent(Pressable);

  const selectedMoodScale = useSharedValue(0);
  const altSelectedMoodScale = useSharedValue(1);

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
    },
    image: {
      alignSelf: 'center',
    },
    moodListDefault: {
      width: 300,
    }
  });

  const buttonStyle = useAnimatedStyle(() => {
    return {
      opacity: selectedMood !== undefined ? withTiming(1) : withTiming(0.5),
      transform: [{ scale: selectedMood ? withTiming(1) : 0.8 }],
    };
  }, [selectedMood]);

  const backgroundStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: selectedMood
            ? withTiming(selectedMoodScale.value, { duration: 200 })
            : 0,
        },
      ],
    };
  }, [selectedMood]);

  const altBackgroundStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: selectedMood
            ? withTiming(altSelectedMoodScale.value, { duration: 200 })
            : 0,
        },
      ],
    };
  }, [selectedMood]);

  const handleSelect = React.useCallback(() => {
    if (selectedMood) {
      onSelect(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [onSelect, selectedMood]);

  useEffect(() => {
    if (selectedMoodScale.value === 1 && selectedMood) {
      selectedMoodScale.value = 0;
      altSelectedMoodScale.value = 1;
    } else if (selectedMoodScale.value === 0 && selectedMood) {
      selectedMoodScale.value = 1;
      altSelectedMoodScale.value = 0;
    }
  }, [selectedMood]);

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image source={imageSrc} style={styles.image} />
        <Pressable style={styles.button} onPress={() => setHasSelected(false)}>
          <AppText style={styles.buttonText} fontWeight='bold'>Choose Another</AppText>
        </Pressable>
      </View>
    );
  }

  const handleSelectMood = (option: MoodOptionType) => {
    setSelectedMood(option);
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.heading} fontWeight="bold">How are you right now?</AppText>
      <View style={styles.moodList}>
        {moodOptions.map(option => (
          <View key={option.emoji}>
            <Pressable
              onPress={() => {
                selectedMood?.emoji !== option.emoji
                  ? handleSelectMood(option)
                  : null;
                selectedMood && selectedMood?.emoji !== option.emoji ? setPreviousSelectedMood(selectedMood) : null;
              }}
              style={[styles.moodItem]}>
              <Animated.View
                style={[
                  styles.moodListDefault,
                  (option.emoji === selectedMood?.emoji &&
                    selectedMoodScale.value === 0) ||
                  (option.emoji === previousSelectedMood?.emoji &&
                    selectedMoodScale.value === 1)
                    ? backgroundStyle
                    : null,
                  (option.emoji === selectedMood?.emoji &&
                    altSelectedMoodScale.value === 0) ||
                  (option.emoji === previousSelectedMood?.emoji &&
                    altSelectedMoodScale.value === 1)
                    ? altBackgroundStyle
                    : null,
                  option.emoji === selectedMood?.emoji
                    ? styles.selectedMoodItem
                    : undefined,
                ]}
              />
              <Text style={styles.moodText}>{option.emoji}</Text>
            </Pressable>
            <AppText style={styles.descriptionText} fontWeight='bold'>
              {selectedMood?.emoji === option.emoji ? option.description : ' '}
            </AppText>
          </View>
        ))}
      </View>
      <ReanimatedPressable
        style={[styles.button, buttonStyle]}
        onPress={handleSelect}>
        <AppText style={styles.buttonText} fontWeight='bold'>Choose</AppText>
      </ReanimatedPressable>
    </View>
  );
};
