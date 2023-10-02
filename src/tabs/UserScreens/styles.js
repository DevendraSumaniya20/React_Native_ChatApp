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
  header: {
    width: '100%',
    height: hp(6),
    backgroundColor: 'white',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#258',
    fontSize: 20,
    fontWeight: '600',
  },
  userItem: {
    width: Dimensions.get('window').width - 35,
    alignSelf: 'center',
    marginTop: hp(4),
    flexDirection: 'row',
    height: hp(7),
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: wp(4),
    alignItems: 'center',
  },
  userIcon: {
    width: wp(8),
    height: hp(4),
  },
  name: {color: 'black', marginLeft: 20, fontSize: 20},
});

export default styles;
