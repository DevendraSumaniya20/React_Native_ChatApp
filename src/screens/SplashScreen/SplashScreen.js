import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import NavigationString from '../../constants/NavigationString';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import LottieAnimationPath from '../../constants/LottieAnimationPath';

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
    <LinearGradient colors={['#06BEB6', '#48B1BF']} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <LottieView
          style={styles.lottieanimation}
          source={LottieAnimationPath.SPLASH_ANIMATION}
          resizeMode="contain"
          autoPlay
          loop
        />

        <Text style={[styles.Text]}>Chat App</Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SplashScreen;
