/* eslint-disable no-void */
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { RootStack } from './stack/RootStack';
import Toast from 'react-native-toast-message';
import BootSplash from 'react-native-bootsplash';

export const Navigator = () => {
  return (
    <NavigationContainer
      onReady={() => {
        void BootSplash.hide({ fade: true });
      }}
    >
      <RootStack />
      <Toast />
    </NavigationContainer>
  );
};

export default Navigator;
