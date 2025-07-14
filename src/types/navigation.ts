import { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabParamList = {
  Home: undefined;
  Trip: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Root: NavigatorScreenParams<BottomTabParamList>;
};
