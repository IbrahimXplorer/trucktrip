import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/font';

export const Input = (props: TextInputProps) => {
  return (
    <TextInput
      placeholderTextColor={colors.primary50}
      style={styles.input}
      {...props}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.primary100,
    borderRadius: 8,
    color: colors.dark,
    padding: 15,
    fontFamily: fontFamilies.INTER.normal,
  },
});
