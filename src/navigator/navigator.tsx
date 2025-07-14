import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { RootStack } from './stack/RootStack';
import Toast from 'react-native-toast-message';

export const Navigator = () => {
  return (
    <NavigationContainer>
      <RootStack />
       <Toast />
    </NavigationContainer>
  );
};

export default Navigator;
