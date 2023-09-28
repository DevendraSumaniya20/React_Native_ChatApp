import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import NavigationString from '../../constants/NavigationString';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 2000);
  }, []);

  const checkLogin = async () => {
    const id = await AsyncStorage.getItem('USERID');
    if (id !== null) {
      navigation.navigate(NavigationString.MAIN);
    } else {
      navigation.navigate(NavigationString.LOGIN);
    }
  };
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.Text}>Chat App</Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SplashScreen;
