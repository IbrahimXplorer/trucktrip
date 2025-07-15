import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { Button, Input } from '../../components';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/font';
import { setUser } from '../../store/slices/authSlice';
import { AppDispatch } from '../../store/store';
import { RootStackParamList } from '../../types/navigation';

type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>;
type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type LoginProps = {
  route: LoginRouteProp;
  navigation: LoginNavigationProp;
};

export const LoginScreen: FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const validateEmail = (val: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(val);
  };

  const handleLogin = () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Please fill in both fields!',
      });
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid email address!',
      });
      return;
    }

    if (password.length < 3) {
      Toast.show({
        type: 'error',
        text1: 'Password must be at least 3 characters!',
      });
      return;
    }

    dispatch(setUser({ email, password }));
    navigation.replace('Root', { screen: 'Home' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome</Text>

      <View style={styles.inputWrapper}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <Input
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(prev => !prev)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={colors.primary50}
            />
          </TouchableOpacity>
        </View>

        <Button onPress={handleLogin} title="Login" />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.light,
  },
  title: {
    fontSize: 28,
    fontFamily: fontFamilies.INTER.bold,
    alignSelf: 'center',
    marginBottom: 30,
  },
  inputWrapper: {
    gap: 20,
  },
  passwordContainer:{},
  eyeIcon:{
    position:'absolute',right:20,
    zIndex:10,
    top:15,
  }
});
