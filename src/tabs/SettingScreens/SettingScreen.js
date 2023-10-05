import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
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

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="white" />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SettingScreen;
