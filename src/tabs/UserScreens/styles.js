import {Dimensions, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: wp(100),
    height: hp(6),
    elevation: 50,
    shadowColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
    backgroundColor: 'white',
  },
  title: {
    color: '#258',
    fontSize: hp(2),
    fontWeight: '800',
  },
  userItems: {
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    marginTop: hp(5),
    flexDirection: 'row',
    height: hp(6),
    borderWidth: 0.6,
    borderRadius: 10,
  },
  userImage: {
    height: hp(3.7),
    width: wp(8),
    alignSelf: 'center',
    marginLeft: hp(1.5),
  },
  itemText: {
    fontSize: hp(3.4),
    marginLeft: hp(1.5),
    alignSelf: 'center',
    textAlign: 'center',
    color: '#000000',
  },
});

export default styles;
