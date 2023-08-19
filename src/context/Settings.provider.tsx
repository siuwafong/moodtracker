import React, {
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  createContext,
} from 'react';
import { moodOptions } from '../components/MoodPicker';

export enum UserFont {
  roboto = 'Roboto',
  merriweather = 'Merriweather',
  kalam = 'Kalam',
}

type SettingsContextType = {
  userFont: UserFont;
  setUserFont: Dispatch<SetStateAction<UserFont>>;
};

const moodWords = moodOptions.map(mood => mood.description)
const defaultAvailableMoods = moodWords.map(mood => ({
  [mood]: (mood === 'studious' || mood === 'pensive' || mood === 'celebratory' || mood === 'happy' || mood === 'frustrated') ?  true : false
}))

console.log({ defaultAvailableMoods })

const defaultValue = {
  userFont: UserFont.roboto,
  setUserFont: () => {},
};

interface SettingsProviderProps {
  children: React.ReactNode
}

const SettingsContext = createContext<SettingsContextType>(defaultValue);

export const SettingsProvider: React.FC<SettingsProviderProps> = props => {
    const { children } = props

    const [userFont, setUserFont] = useState<UserFont>(UserFont.roboto);

    return (
        <SettingsContext.Provider
            value={{
                userFont,
                setUserFont
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
}


export const useSettingsContext = () => useContext(SettingsContext)