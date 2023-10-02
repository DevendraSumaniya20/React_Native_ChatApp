import {Dimensions, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  ImageBackground: {
    height: hp(100),
    width: wp(100),
  },
  header: {
    width: '100%',
    height: hp(5),
    color: '#ffffff',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
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
    color: '#fff',
    borderColor: '#fff',
  },
  userIcon: {
    width: wp(8),
    height: hp(4),
    tintColor: '#fff',
  },
  name: {color: '#fff', marginLeft: 20, fontSize: 20},
});

export default styles;
