import React, { FC } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Header, TripCard } from '../../components';
import { colors } from '../../constants/colors';
import { RootState } from '../../store/store';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../types/navigation';

type TripScreenProps = BottomTabScreenProps<BottomTabParamList, 'Trip'>;

const ItemSeparator = () => <View style={styles.itemSeparator} />;

const EmptyComponent = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No trips found</Text>
  </View>
);

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
        ListEmptyComponent={EmptyComponent}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: colors.darkGray,
  },
});
