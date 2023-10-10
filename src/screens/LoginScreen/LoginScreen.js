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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationString from '../../constants/NavigationString';
import Loader from '../../components/Loader';
import styles from './styles';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();
  const isDarkMode = useSelector(state => state.theme.isDarkmode); // Check if this is the correct state key

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email.trim() || !password.trim()) {
      setEmailError('Please enter both email and password.');
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (password === '') {
      setPasswordError('Please enter a password');
      isValid = false;
    }

    if (password.length < 4) {
      setPasswordError('Password must be at least 4 characters long');
      isValid = false;
    }

    return isValid;
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
        setError('User not found'); // You need to define the setError function
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred'); // You need to define the setError function
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
      setError('An error occurred while storing data'); // You need to define the setError function
    }
  };

  const keyboardVerticalOffset =
    Platform.OS === 'ios' || Platform.OS === 'android'
      ? heightPercentageToDP(1)
      : 0;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#000' : '#fff'},
      ]}>
      <StatusBar
        networkActivityIndicatorVisible
        showHideTransition={'slide'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <Text style={[styles.title, {color: isDarkMode ? '#fff' : '#000'}]}>
          Login
        </Text>

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
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

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
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
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
          <Text style={[styles.orLogin, {color: isDarkMode ? '#fff' : '#000'}]}>
            Or SignUp
          </Text>
        </TouchableOpacity>

        <Loader visible={visible} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
