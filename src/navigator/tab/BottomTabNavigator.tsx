/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';

import { colors } from '../../constants/colors';
import { HomScreen, SettingsScreen, TripScreen } from '../../screens';
import { BottomTabParamList } from '../../types/navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.dark, 
        tabBarInactiveTintColor: colors.primary50,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Home':
              return <Foundation name="home" size={size} color={color} />;
            case 'Trip':
              return <FontAwesome5 name="truck" size={size} color={color} />;
            case 'Settings':
              return <Feather name="settings" size={size} color={color} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomScreen} />
      <Tab.Screen name="Trip" component={TripScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen}  />
    </Tab.Navigator>
  );
};
