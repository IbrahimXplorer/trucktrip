import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { Header, Button } from '../../components';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/font';
import { clearUser } from '../../store/slices/authSlice';
import { clearTrips } from '../../store/slices/tripSlice';
import { AppDispatch } from '../../store/store';
import { BottomTabParamList } from '../../types/navigation';

type SettingsScreenProps = BottomTabScreenProps<BottomTabParamList, 'Settings'>;

const AVATAR = require('../../assets/images/avatar.png');

export const SettingsScreen: FC<SettingsScreenProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearTrips());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header title="Settings" />
        <AvatarSection />
      </View>
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
};

const AvatarSection = () => (
  <View style={styles.avatarContainer}>
    <Image source={AVATAR} style={styles.avatar} />
    <View style={styles.avatarContent}>
      <Text style={styles.name}>Sophia Clark</Text>
      <Text style={styles.email}>sophia.clark@email.com</Text>
    </View>
  </View>
);

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.light,
    justifyContent: 'space-between',
  },
  avatarContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  avatarContent: {
    gap: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  name: {
    fontSize: 22,
    fontFamily: fontFamilies.INTER.bold,
    textAlign: 'center',
    color: colors.dark,
  },
  email: {
    fontSize: 16,
    fontFamily: fontFamilies.INTER.normal,
    textAlign: 'center',
    color: colors.primary50,
  },
});
