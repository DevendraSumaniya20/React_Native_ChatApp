import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  ImageBackground: {
    width: wp(100),
    height: hp(100),
  },
  title: {
    fontSize: hp('3'),
    alignSelf: 'center',
    margin: hp('14'),
    color: '#FFFFFF',
  },
  input: {
    width: wp('90'),
    padding: wp('5'),
    borderRadius: wp('2'),
    borderWidth: 1,
    alignSelf: 'center',
    textAlign: 'left',
    marginTop: hp('2'),
    borderColor: '#fff',
    color: '#fff',
  },
  button: {
    width: wp('90%'),
    padding: hp('2.5'),
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: hp('5'),
    backgroundColor: '#147560',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: hp('2.6'),
    color: '#fff',
    fontWeight: '900',
  },
  orLogin: {
    alignSelf: 'center',
    marginTop: hp('2'),
    fontSize: hp('2'),
    textDecorationLine: 'underline',
    fontWeight: '600',
    color: '#fff',
  },
});

export default styles;
