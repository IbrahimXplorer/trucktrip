import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Header, Input } from '../../components';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/font';
import { BottomTabParamList } from '../../types/navigation';

type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, 'Home'>;

export const HomScreen = ({ navigation }: HomeScreenProps) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Trip Planner" showIcon={true} />
      <Text style={styles.title}>Design Your Trip</Text>

      <View style={styles.inputWrapper}>
        <Input
          placeholder="Loand Location"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Unload Location"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Date & Time"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button title="Create Trip" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.light,
  },
  title: {
    fontSize: 28,
    fontFamily: fontFamilies.INTER.bold,
    marginVertical: 20,
  },
  inputWrapper: {
    gap: 20,
  },
});
