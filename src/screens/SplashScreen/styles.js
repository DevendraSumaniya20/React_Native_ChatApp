import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieanimation: {
    height: hp(30),
    width: wp(30),
  },
  Text: {
    fontSize: hp('5%'),
    color: '#FFFFFF',
    fontFamily: 'LEMONMILK-MediumItalic',
  },
});

export default styles;
