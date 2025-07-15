import React, { FC } from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/font';

type InputProps = {
  color?: string;
} & TextInputProps;

export const Input: FC<InputProps> = ({
  color = colors.primary50,
  placeholderTextColor = colors.primary50,
  ...rest
}) => {
  return (
    <TextInput
      placeholderTextColor={placeholderTextColor}
      style={[styles.input, { color: color }]}
      {...rest}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.primary100,
    borderRadius: 8,
    padding: 15,
    fontFamily: fontFamilies.INTER.normal,
  },
});
