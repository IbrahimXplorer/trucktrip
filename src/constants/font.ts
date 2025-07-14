import { Platform } from 'react-native';

export const isIOS = () => {
  return Platform.OS === 'ios';
};

export const fontFamilies = {
  INTER: {
    normal: isIOS() ? 'Inter 18pt Regular' : 'Inter-Regular',
    medium: isIOS() ? 'Inter 18pt Medium' : 'Inter-Medium',
    bold: isIOS() ? 'Inter 18pt Bold' : 'Inter-Bold',
    semiBold: isIOS() ? 'Inter 18pt SemiBold' : 'Inter-SemiBold',
  },
};
