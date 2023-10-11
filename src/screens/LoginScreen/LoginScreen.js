import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationString from '../../constants/NavigationString';
import Loader from '../../components/Loader';
import styles from './styles';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import LottieAnimationPath from '../../constants/LottieAnimationPath';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });
  const navigation = useNavigation();
  const isDarkMode = useSelector(state => state.theme.isDarkmode);

  const validateForm = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const newErrors = {
      email: !email.trim() ? 'Please enter your email' : '',
      password: !password.trim() ? 'Please enter your password' : '',
      general: '',
    };

    if (!newErrors.email && !emailPattern.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!newErrors.password && password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters long';
    }

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  };

  const loginUser = async () => {
    if (!validateForm()) {
      return;
    }

    setVisible(true);

    try {
      const querySnapshot = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        await goToNext(userData);
      } else {
        setErrors({...errors, general: 'User not found'});
      }
    } catch (error) {
      console.error(error);
      setErrors({...errors, general: 'An error occurred'});
    } finally {
      setVisible(false);
    }
  };

  const goToNext = async ({name, email, userId}) => {
    try {
      await AsyncStorage.setItem('NAME', name);
      await AsyncStorage.setItem('EMAIL', email);
      await AsyncStorage.setItem('USERID', userId);
      navigation.navigate(NavigationString.MAIN);
    } catch (error) {
      console.error(error);
      setErrors({...errors, general: 'An error occurred while storing data'});
    }
  };

  const keyboardVerticalOffset =
    Platform.OS === 'ios' || Platform.OS === 'android' ? 50 : 0;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#000' : '#fff'},
      ]}>
      <ScrollView>
        <StatusBar
          networkActivityIndicatorVisible
          showHideTransition={'slide'}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />

        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <LottieView
            style={styles.lottieanimation}
            source={LottieAnimationPath.LOGIN_ANIMATION}
            resizeMode="contain"
            autoPlay
            loop
          />

          <TextInput
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            style={[
              styles.input,
              {
                borderColor: isDarkMode ? '#fff' : '#000',
                color: isDarkMode ? '#fff' : '#000',
              },
            ]}
            placeholderTextColor={isDarkMode ? '#fff' : '#000'}
            placeholder="Enter Email"
            value={email}
            onChangeText={txt => setEmail(txt)}
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}

          <TextInput
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            style={[
              styles.input,
              {
                borderColor: isDarkMode ? '#fff' : '#000',
                color: isDarkMode ? '#fff' : '#000',
              },
            ]}
            placeholderTextColor={isDarkMode ? '#fff' : '#000'}
            placeholder="Enter Password"
            value={password}
            secureTextEntry
            onChangeText={txt => setPassword(txt)}
          />
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}

          {errors.general ? (
            <Text style={styles.errorText}>{errors.general}</Text>
          ) : null}

          <TouchableOpacity
            style={[styles.button, {borderColor: isDarkMode ? '#fff' : '#000'}]}
            onPress={() => loginUser()}>
            <Text
              style={[
                styles.buttonText,
                {
                  color: isDarkMode ? '#fff' : '#000',
                },
              ]}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(NavigationString.SIGNUP)}>
            <Text
              style={[styles.orLogin, {color: isDarkMode ? '#fff' : '#000'}]}>
              Or SignUp
            </Text>
          </TouchableOpacity>

          <Loader visible={visible} />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
