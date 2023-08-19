import React, { useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { theme } from '../theme';
import { useSettingsContext } from '../context/Settings.provider';

type FontWeight = 'bold' | 'light' | 'regular';

interface AppTextProps {
  children: string;
  style?: TextStyle;
  fontWeight?: FontWeight;
  size?: number
}

export const AppText: React.FC<AppTextProps> = props => {
  const { style, fontWeight = 'regular', size = 12 } = props;

  const { userFont } = useSettingsContext();

  const getFontWeightType = (fontWeight: FontWeight) => {
    switch (fontWeight) {
      case 'light':
        return 'fontFamilyLight';
      case 'bold':
        return 'fontFamilyBold';
      case 'regular':
        return 'fontFamilyRegular';
      default:
        return 'fontFamilyRegular';
    }
  };

  const fontWeightType = useMemo(() => getFontWeightType(fontWeight), [fontWeight])

  return (
    <Text style={{ fontSize: size, ...style, fontFamily: theme[userFont][fontWeightType]}}>
      {props.children}
    </Text>
  );
};
