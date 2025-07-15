import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { fontFamilies } from '../../constants/font';
import { colors } from '../../constants/colors';

type HeaderProps = {
  title: string;
  showIcon?: boolean;
};

export const Header: FC<HeaderProps> = ({
  title = 'header',
  showIcon = false,
}) => {
  return (
    <View style={styles.header}>
      <View />
      <Text style={styles.headerText}>{title}</Text>
      {showIcon && <Feather name="settings" size={24} color={colors.dark} />}
      {!showIcon && <View />}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 18,
    fontFamily: fontFamilies.INTER.bold,
  },
});
