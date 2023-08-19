import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  LayoutAnimation,
} from 'react-native';
import format from 'date-fns/format';
import { MoodOptionWithTimestamp } from '../types';
import { theme } from '../theme';
import { useAppContext } from '../context/App.provider';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Reanimated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { AppText } from './AppText';

type MoodItemRowProps = {
  item: MoodOptionWithTimestamp;
};

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ item }) => {
  const { handleDeleteMood } = useAppContext();
  const translateX = useSharedValue(0);

  const maxSwipe = 18;

  const handleDelete = useCallback(
    () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      handleDeleteMood(item);
    },
    [handleDeleteMood, item],
  );

  const deleteWithDelay = useCallback(() => {
    setTimeout(() => {
      handleDelete();
    }, 500);
  }, [handleDelete]);

  const onGestureEvent = useAnimatedGestureHandler(
    {
      onActive: event => {
        translateX.value = event.translationX;
      },
      onEnd: event => {
        if (Math.abs(event.translationX) > maxSwipe) {
          translateX.value = withTiming(1000 * Math.sign(event.translationX));
          runOnJS(deleteWithDelay)()
        } else {
          translateX.value = withTiming(0); // move the row back to the original position when you stop swiping
        }
      },
    },
    [],
  );

  const cardStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: translateX.value }],
    }),
    [],
  );

  return (
    <GestureHandlerRootView>
      <PanGestureHandler
        activeOffsetY={100}
        activeOffsetX={1}
        onGestureEvent={onGestureEvent}>
        <Reanimated.View style={[styles.moodItem, cardStyle]}>
          <View style={styles.iconAndDescription}>
            <AppText style={styles.moodValue}>{item.mood.emoji}</AppText>
            <AppText style={styles.moodDescription} fontWeight='bold'>{item.mood.description}</AppText>
          </View>
          <AppText style={styles.moodDate}>
            {format(new Date(item.timestamp), "do MMM, yy 'at' h:mmaaa")}
          </AppText>
          <Pressable hitSlop={16} onPress={() => handleDelete()}>
            <AppText style={styles.deleteText} fontWeight='light'>Delete</AppText>
          </Pressable>
        </Reanimated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  moodValue: {
    textAlign: 'center',
    fontSize: 40,
    marginRight: 10,
  },
  moodDate: {
    textAlign: 'center',
    color: theme.colorLavender,
  },
  moodItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodDescription: {
    fontSize: 18,
    color: theme.colorPurple,
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteText: {
    color: theme.colorBlue,
  },
});
