import React, { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';
import { useAppContext } from '../context/App.provider';
import { AppText } from '../components/AppText';

interface MoodGraphData {
  [key: string]: number;
}

export const Analytics: React.FC = () => {
  const { moodList } = useAppContext();

  const styles = StyleSheet.create({
    chartContainer: {
      width: '120%',
      paddingLeft: 10,
    },
  });

  const data: MoodGraphData = {};

  moodList.forEach(mood => {
    if (data[mood.mood.description] === undefined) {
      data[mood.mood.description] = 1;
    } else {
      data[mood.mood.description] = data[mood.mood.description] + 1;
    }
  });

  return (
    <View>
      <View style={styles.chartContainer}>
        <AppText>Total</AppText>
        <VictoryPie
          data={Object.keys(data).map(mood => ({
            x: mood,
            y: data[mood],
          }))}
          colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
          width={400}
          labelPlacement={'perpendicular'}
        />
      </View>
    </View>
  );
};
