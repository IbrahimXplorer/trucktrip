import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/font';

type ButtonProps = TouchableOpacityProps & {
  title: string;
};

const Button: React.FC<ButtonProps> = ({ title, ...props }) => {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.light,
    fontFamily: fontFamilies.INTER.bold,
  },
});
