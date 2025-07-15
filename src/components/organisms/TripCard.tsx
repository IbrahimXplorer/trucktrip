import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Trip } from '../../types/trip';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/font';
import { formatDate } from '../../helper/dataHelper';

type TripCardProps = {
  trip: Trip;
};

export const TripCard: FC<TripCardProps> = ({ trip }) => {
  const { loadLocation, unloadLocation, date } = trip;
  const formattedDate = formatDate(date);

  return (
    <View style={styles.tripContainer}>
      <View style={styles.tripContent}>
        <View style={styles.loadInfo}>
          <Text style={styles.loadText}>{loadLocation}</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.primary50} />
          <Text style={styles.loadText}>{unloadLocation}</Text>
        </View>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <Image
        source={require('../../assets/images/truck.png')}
        style={styles.truckImage}
      />
    </View>
  );
};

export default TripCard;

const styles = StyleSheet.create({
  tripContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripContent: {
    gap: 5,
  },
  loadInfo: {
    flexDirection: 'row',
    gap: 5,
  },
  loadText: {
    fontFamily: fontFamilies.INTER.normal,
    fontSize: 14,
    color: colors.primary50,
  },
  truckImage: {
    width: Dimensions.get('window').width / 4,
    height: 60,
    borderRadius: 10,
  },
  date:{
    fontSize:16,
    fontFamily:fontFamilies.INTER.bold
  }
});
