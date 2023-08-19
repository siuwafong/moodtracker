import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useAppContext } from '../context/App.provider';
import { theme } from '../theme';
import { AppText } from '../components/AppText';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { UserFont, useSettingsContext } from '../context/Settings.provider';

interface LabelProps {
  children: string;
}

export const Settings: React.FC = () => {
  const { moodList } = useAppContext();
  const { userFont, setUserFont } = useSettingsContext();

  const [openDropdown, setOpenDropdown] = useState(false);

  const Label: React.FC<LabelProps> = props => {
    return (
      <View style={{ marginVertical: 10 }}>
        <AppText fontWeight="bold" size={24}>
          {props.children}
        </AppText>
      </View>
    );
  };

  const moodListWords = useMemo(() => {
    return moodList.map(mood => mood.mood.description)
  }, [moodList])

  return (
    <View style={styles.container}>
      <Label>Font</Label>
      <DropDownPicker
        items={Object.values(UserFont).map(font => ({
          label: font,
          value: font,
        }))}
        multiple={false}
        value={userFont}
        setValue={setUserFont}
        open={openDropdown}
        setOpen={setOpenDropdown}
        style={{ borderWidth: 0 }}
        labelStyle={{ fontFamily: theme[userFont].fontFamilyRegular }}
        textStyle={{ fontFamily: theme[userFont].fontFamilyRegular }}
      />
      <Label>Available Moods</Label>
      {moodList.map(mood => (
        <BouncyCheckbox
          text={mood.mood.description}
          textStyle={{
            textDecorationLine: 'none',
          }}
          isChecked={moodListWords.includes(mood.mood.description)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
