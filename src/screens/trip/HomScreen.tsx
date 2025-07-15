import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Header, Input } from '../../components';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/font';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../types/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addTrip } from '../../store/slices/tripSlice';
import { locations } from '../../constants/location';
import Ionicons from 'react-native-vector-icons/Ionicons';

type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, 'Home'>;
type PickerType = 'load' | 'unload' | null;
type locationType = {
  id: string;
  name: string;
};

export const HomScreen = ({ navigation }: HomeScreenProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [loadLocation, setLoadLocation] = useState('');
  const [unloadLocation, setUnloadLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activePicker, setActivePicker] = useState<PickerType>(null);

  const disabled = !loadLocation || !unloadLocation || !date;

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%'], []);

  const openBottomSheet = useCallback((pickerType: PickerType) => {
    setActivePicker(pickerType);
    bottomSheetRef.current?.expand();
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    setActivePicker(null);
  }, []);

  const handleLocationPress = useCallback(
    (pickerType: PickerType) => {
      if (Platform.OS === 'android') openBottomSheet(pickerType);
    },
    [openBottomSheet],
  );

  const onSelectLocation = useCallback(
    (location: string) => {
      if (activePicker === 'load') {
        setLoadLocation(location);
      } else {
        setUnloadLocation(location);
      }
      closeBottomSheet();
    },
    [activePicker, closeBottomSheet],
  );

  const onChange = useCallback(
    (event: DateTimePickerEvent, selectedValue: Date | undefined) => {
      if (event.type === 'dismissed') {
        setShowDatePicker(false);
        setMode('date');
        return;
      }

      if (mode === 'date') {
        setDate(selectedValue || date);
        setMode('time');
        setShowDatePicker(true);
      } else {
        const selectedTime = selectedValue || date;
        const updatedDateTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          selectedTime.getHours(),
          selectedTime.getMinutes(),
        );
        setDate(updatedDateTime);
        setShowDatePicker(false);
        setMode('date');
      }
    },
    [date, mode],
  );

  const onCreateTrip = useCallback(() => {
    if (!loadLocation || !unloadLocation || !date) return;

    dispatch(
      addTrip({
        loadLocation,
        unloadLocation,
        date: date.toISOString(),
      }),
    );

    // Reset form fields
    setLoadLocation('');
    setUnloadLocation('');
    setDate(new Date());

    navigation.navigate('Trip');
  }, [dispatch, loadLocation, unloadLocation, date, navigation]);

  const filteredLocations = useMemo(() => {
    return locations
      .filter(loc =>
        activePicker === 'load'
          ? loc.name !== unloadLocation
          : activePicker === 'unload'
          ? loc.name !== loadLocation
          : true,
      )
      .map(loc => ({
        ...loc,
        id: String(loc.id),
      }));
  }, [activePicker, loadLocation, unloadLocation]);

  const renderItem = useCallback(
    ({ item }: { item: locationType }) => (
      <TouchableOpacity
        style={styles.locationItem}
        onPress={() => onSelectLocation(item.name)}
      >
        <Text>{item.name}</Text>
        <Ionicons name="arrow-forward" size={24} color={colors.dark} />
      </TouchableOpacity>
    ),
    [onSelectLocation],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Trip Planner" showIcon />
      <Text style={styles.title}>Design Your Trip</Text>

      <View style={styles.inputWrapper}>
        <TouchableOpacity onPress={() => handleLocationPress('load')}>
          <Input
            onPress={() => openBottomSheet('load')}
            placeholder="Load Location"
            value={loadLocation}
            color={colors.dark}
            placeholderTextColor={colors.dark}
            editable={false}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLocationPress('unload')}>
          <Input
            onPress={() => openBottomSheet('unload')}
            placeholder="Unload Location"
            value={unloadLocation}
            color={colors.dark}
            placeholderTextColor={colors.dark}
            editable={false}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setMode('date');
            setShowDatePicker(true);
          }}
        >
          <Input
            onPress={() => {
              setMode('date');
              setShowDatePicker(true);
            }}
            placeholder="Date & Time"
            value={date.toLocaleString()}
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
            value={date}
            mode={mode}
            is24Hour
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
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.sheetContainer}>
          <Text style={styles.sheetTitle}>
            Select {activePicker === 'load' ? 'Load' : 'Unload'} Location
          </Text>
          <FlatList
            data={filteredLocations}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimePickerbgIos: {
    backgroundColor: colors.dark,
    borderRadius: 10,
    marginTop: 10,
  },
});
