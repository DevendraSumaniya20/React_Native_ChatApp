import {Dimensions, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp(0.6),
  },

  header: {
    width: '100%',
    height: hp(5),
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  userItem: {
    width: Dimensions.get('window').width - 35,
    alignSelf: 'center',
    marginTop: hp(4),
    flexDirection: 'row',
    height: hp(7),
    borderWidth: 1,
    borderRadius: 16,
    paddingLeft: wp(4),
    alignItems: 'center',
  },
  userIcon: {
    width: wp(8),
    height: hp(4),
  },
  name: {marginLeft: 20, fontSize: 20},
});

export default styles;
