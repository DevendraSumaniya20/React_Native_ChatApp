import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {toggleTheme} from '../../store/reducerSlice/themeSlice';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import NavigationString from '../../constants/NavigationString';

const SettingScreen = ({onLogOut}) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.theme.isDarkmode);
  const navigation = useNavigation();

  const [scaleValue] = useState(new Animated.Value(1));

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = async () => {
    try {
      navigation.navigate(NavigationString.LOGIN);
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

  const pressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.2, // Increase the size to 1.2 times
      useNativeDriver: false,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1.2,
      useNativeDriver: false,
    }).start();
  };

  const handlePress = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      pressOut();
    });
  };

  const gotoLogin = () => {
    Alert.alert(
      'Are you sure you want to go to the login screen?',
      'Press OK to proceed or Cancel to stay on this screen.',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate(NavigationString.LOGIN);
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#000' : '#fff'},
      ]}>
      <TouchableOpacity style={styles.darkModeButton} onPress={handleToggle}>
        <MaterialIcons
          name={isDarkMode ? 'light-mode' : 'dark-mode'}
          size={24}
          color={isDarkMode ? '#fff' : '#000'}
        />
        <Text
          style={[styles.buttonText, {color: isDarkMode ? '#fff' : '#000'}]}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Text>
      </TouchableOpacity>

      <TouchableWithoutFeedback
        onPress={() => {
          gotoLogin();
          handlePress();
        }}
        onPressIn={pressIn}>
        <Animated.View
          style={[
            styles.logoutButton,
            {
              transform: [{scale: scaleValue}],
            },
          ]}>
          <MaterialIcons name="logout" size={24} color="white" />
          <Text style={styles.buttonText}>Logout</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SettingScreen;
