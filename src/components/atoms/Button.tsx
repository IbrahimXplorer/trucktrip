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

export const Button: React.FC<ButtonProps> = ({
  title,
  disabled = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? colors.primary50 : colors.primary },
      ]}
      {...props}
    >
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
    fontFamily: fontFamilies.INTER.semiBold,
    fontSize: 16,
  },
});
