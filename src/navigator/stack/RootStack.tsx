import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { LoginScreen } from '../../screens';
import { BottomTabNavigator } from '../tab/BottomTabNavigator';

export type RootStackParamList = {
  Login: undefined;
  Root: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
