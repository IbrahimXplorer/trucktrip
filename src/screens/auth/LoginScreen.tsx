import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { Input } from '../../components';
import Button from '../../components/atoms/Button';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/font';
import { RootStackParamList } from '../../navigator/stack/RootStack';
import { setUser } from '../../store/slices/authSlice';
import { AppDispatch } from '../../store/store';

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
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Pleas fill both field to continue!',
      });

      return;
    }

    dispatch(setUser({ email, password }));

    navigation.replace('Root');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome</Text>

      <View style={styles.inputWrapper}>
        <Input placeholder="Email" value={email} onChangeText={setEmail} />

        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

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
    marginTop: 100,
  },
  inputWrapper: {
    gap: 20,
  },
});
