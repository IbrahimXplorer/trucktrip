import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { LoginScreen } from '../../screens';
import { BottomTabNavigator } from '../tab/BottomTabNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { RootStackParamList } from '../../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Root" component={BottomTabNavigator} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};
