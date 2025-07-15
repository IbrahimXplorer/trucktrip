import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Header, TripCard } from '../../components';
import { colors } from '../../constants/colors';
import { RootState } from '../../store/store';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../types/navigation';

type TripScreenProps = BottomTabScreenProps<BottomTabParamList, 'Trip'>;

const ItemSeparator = () => <View style={styles.itemSeparator} />;

export const TripScreen: FC<TripScreenProps> = () => {
  const { trips } = useSelector((state: RootState) => state.trip);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Your Trips" />
      <FlatList
        data={trips}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <TripCard trip={item} />}
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={ItemSeparator}
      />
    </SafeAreaView>
  );
};

export default TripScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.light,
  },
  itemSeparator: {
    height: 20,
  },
});
