import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp(100),
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp(0.9),
  },

  lottieanimation: {
    height: hp(25),
    width: wp(100),
    alignSelf: 'center',
  },

  input: {
    width: wp('90'),
    padding: hp(1.8),
    borderRadius: wp(2),
    borderWidth: 1,
    alignSelf: 'center',
    textAlign: 'left',
  },
  errorText: {
    color: 'red',
    fontSize: hp('1.5'),
    marginTop: hp('0.3'),
    marginLeft: wp('6'),
  },
  button: {
    width: wp('90%'),
    padding: hp('2.2'),
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: hp('3.5'),
  },
  buttonText: {
    textAlign: 'center',
    fontSize: hp('2.2'),
    fontWeight: '700',
  },
  orLogin: {
    alignSelf: 'center',
    marginTop: hp('1.8'),
    fontSize: hp('2'),
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});

export default styles;
