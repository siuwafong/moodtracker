import React, { useContext, useState, useCallback, useEffect } from 'react';
import { MoodOptionType, MoodOptionWithTimestamp } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
};

type AppData = {
  moodList: MoodOptionWithTimestamp[];
};

const dataKey = 'my-app-data';

const setAppData = async (appData: AppData): Promise<void> => {
  try {
    const result = await AsyncStorage.setItem(dataKey, JSON.stringify(appData));
  } catch (error) {}
};

const getAppData = async (): Promise<AppData | null> => {
  try {
    const result = await AsyncStorage.getItem(dataKey);
    if (result) {
      return JSON.parse(result);
    }
  } catch (error) {}

  return null;
};

const defaultValue = {
  moodList: [],
  handleSelectMood: () => {},
};

interface AppProviderProps {
  children: React.ReactNode;
}

const AppContext = React.createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC<AppProviderProps> = props => {
  const { children } = props;

  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = useCallback((mood: MoodOptionType) => {
    setMoodList(current => {
      const newMoodList = [...current, { mood, timestamp: Date.now() }];
      setAppData({ moodList: newMoodList });
      return newMoodList;
    });
  }, []);

  useEffect(() => {
    const fetchAppData = async () => {
      const data = await getAppData();
      if (data) {
        setMoodList(data.moodList);
      }
    };
    fetchAppData();
  }, []);

  return (
    <AppContext.Provider value={{ moodList, handleSelectMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
