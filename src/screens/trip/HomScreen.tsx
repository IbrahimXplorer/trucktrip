import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Header, Input } from '../../components';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/font';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../types/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addTrip } from '../../store/slices/tripSlice';

type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, 'Home'>;

const locations = [
  { id: 1, name: 'Dhaka' },
  { id: 2, name: 'Chittagong' },
  { id: 3, name: 'Sylhet' },
  { id: 4, name: 'Khulna' },
  { id: 5, name: 'Rajshahi' },
];

type PickerType = 'load' | 'unload' | null;

export const HomScreen = ({ navigation }: HomeScreenProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loadLocation, setLoadLocation] = useState('');
  const [unloadLocation, setUnloadLocation] = useState('');
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activePicker, setActivePicker] = useState<PickerType>(null);
  const disabled = !loadLocation || !unloadLocation || !date;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%'], []);

  const openBottomSheet = (pickerType: PickerType) => {
    setActivePicker(pickerType);
    bottomSheetRef.current?.expand();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setActivePicker(null);
  };

  const onSelectLocation = (location: string) => {
    if (activePicker === 'load') {
      setLoadLocation(location);
    } else {
      setUnloadLocation(location);
    }
    closeBottomSheet();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);
  };
  const onCreateTrip = () => {
    console.log('execute');
    if (!loadLocation || !unloadLocation || !date) return;

    const trip = {
      loadLocation,
      unloadLocation,
      date: date.toISOString(),
    };

    dispatch(addTrip(trip));
    navigation.navigate('Trip');
  };

  const filteredLocations = useMemo(() => {
    return locations.filter(loc => {
      if (activePicker === 'load') return loc.name !== unloadLocation;
      if (activePicker === 'unload') return loc.name !== loadLocation;
      return true;
    });
  }, [activePicker, loadLocation, unloadLocation]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Trip Planner" showIcon />
      <Text style={styles.title}>Design Your Trip</Text>

      <View style={styles.inputWrapper}>
        <TouchableOpacity
          onPress={() =>
            Platform.OS === 'android' ? openBottomSheet('load') : null
          }
        >
          <Input
            onPress={() =>
              Platform.OS === 'ios' ? openBottomSheet('load') : null
            }
            placeholder="Load Location"
            value={loadLocation}
            editable={false}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Platform.OS === 'android' ? openBottomSheet('load') : null
          }
        >
          <Input
            onPress={() =>
              Platform.OS === 'ios' ? openBottomSheet('unload') : null
            }
            placeholder="Unload Location"
            value={unloadLocation}
            editable={false}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Platform.OS === 'android' ? setShowDatePicker(true) : null
          }
        >
          <Input
            onPress={() =>
              Platform.OS === 'ios' ? setShowDatePicker(true) : null
            }
            placeholder="Date & Time"
            value={date ? date.toLocaleString() : ''}
            editable={false}
          />
        </TouchableOpacity>

        <Button
          title="Create Trip"
          disabled={disabled}
          onPress={onCreateTrip}
        />
      </View>

      {showDatePicker && (
        <View style={styles.dateTimePickerbgIos}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={onChange}
          />
        </View>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={closeBottomSheet}
      >
        <BottomSheetView style={styles.sheetContainer}>
          <Text style={styles.sheetTitle}>
            Select {activePicker === 'load' ? 'Load' : 'Unload'} Location
          </Text>
          <FlatList
            data={filteredLocations}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.locationItem}
                onPress={() => onSelectLocation(item.name)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </BottomSheetView>
      </BottomSheet>
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
  sheetContainer: {
    flex: 1,
    padding: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontFamily: fontFamilies.INTER.medium,
    marginBottom: 12,
  },
  locationItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dateTimePickerbgIos: {
    backgroundColor: colors.dark,
    borderRadius: 10,
    marginTop: 10,
  },
});
