import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: hp(8),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  tab: {
    width: wp(50),
    height: hp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: wp(6.9),
    height: hp(3.3),
  },
});

export default styles;
