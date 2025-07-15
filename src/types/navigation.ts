import { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabParamList = {
  Home: undefined;
  Trip: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Root: NavigatorScreenParams<BottomTabParamList>;
};
