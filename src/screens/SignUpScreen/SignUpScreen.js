import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import NavigationString from '../../constants/NavigationString';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import LottieAnimationPath from '../../constants/LottieAnimationPath';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigation = useNavigation();

  const isDarkMode = useSelector(state => state.theme.isDarkmode);

  const registerUser = async () => {
    const userId = uuid.v4();
    try {
      await firestore().collection('users').doc(userId).set({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        userId: userId,
      });

      console.log('User created successfully');
      navigation.navigate(NavigationString.LOGIN);
    } catch (error) {
      console.log(error);
      Alert.alert('An error occurred');
    }
  };

  const validate = () => {
    let isValid = true;

    setNameError('');
    setEmailError('');
    setMobileError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (name === '') {
      isValid = false;
      setNameError('Please enter your name');
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(email)) {
      isValid = false;
      setEmailError('Please enter a valid email address');
    }

    if (!/^\d{10}$/.test(mobile)) {
      isValid = false;
      setMobileError('Please enter a valid 10-digit mobile number');
    }

    if (password === '') {
      isValid = false;
      setPasswordError('Please enter a password');
    }

    if (password.length < 4) {
      isValid = false;
      setPasswordError('Password must be at least 4 characters long');
    }

    if (confirmPassword !== password) {
      isValid = false;
      setConfirmPasswordError('Passwords do not match');
    }

    return isValid;
  };

  const clearError = () => {
    setNameError('');
    setEmailError('');
    setMobileError('');
    setPasswordError('');
    setConfirmPasswordError('');
  };

  const keyboardVerticalOffset =
    Platform.OS === 'ios' || Platform.OS === 'android'
      ? heightPercentageToDP(30)
      : 0;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#000' : '#fff'},
      ]}>
      <ScrollView style={styles.container}>
        <StatusBar
          networkActivityIndicatorVisible
          showHideTransition={'slide'}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <View style={styles.backButton}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(NavigationString.LOGIN);
              }}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={heightPercentageToDP(4)}
                color={isDarkMode ? '#fff' : '#000'}
              />
            </TouchableOpacity>
          </View>
          <LottieView
            style={styles.lottieanimation}
            source={LottieAnimationPath.SIGNUP_ANIMATION}
            resizeMode="contain"
            autoPlay
            loop
          />
          <TextInput
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            style={[
              styles.input,
              {
                borderColor: isDarkMode ? '#fff' : '#000',
                color: isDarkMode ? '#fff' : '#000',
              },
            ]}
            placeholderTextColor={isDarkMode ? '#fff' : '#000'}
            placeholder="Enter Name"
            value={name}
            onChangeText={txt => {
              clearError();
              setName(txt);
            }}
          />
          <Text style={styles.errorText}>{nameError}</Text>

          <TextInput
            autoCapitalize="none"
            autoComplete="off"
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
            onChangeText={txt => {
              setEmail(txt);
              clearError();
            }}
            keyboardType="email-address"
          />
          <Text style={styles.errorText}>{emailError}</Text>

          <TextInput
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            style={[
              styles.input,
              {
                borderColor: isDarkMode ? '#fff' : '#000',
                color: isDarkMode ? '#fff' : '#000',
              },
            ]}
            placeholderTextColor={isDarkMode ? '#fff' : '#000'}
            keyboardType="number-pad"
            placeholder="Enter Mobile"
            value={mobile}
            onChangeText={txt => {
              setMobile(txt);
              clearError();
            }}
          />
          <Text style={styles.errorText}>{mobileError}</Text>

          <TextInput
            autoCapitalize="none"
            autoComplete="off"
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
            onChangeText={txt => {
              setPassword(txt);
              clearError();
            }}
          />
          <Text style={styles.errorText}>{passwordError}</Text>

          <TextInput
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            style={[
              styles.input,
              {
                borderColor: isDarkMode ? '#fff' : '#000',
                color: isDarkMode ? '#fff' : '#000',
              },
            ]}
            placeholderTextColor={isDarkMode ? '#fff' : '#000'}
            placeholder="Confirm Password"
            value={confirmPassword}
            secureTextEntry
            onChangeText={txt => {
              setConfirmPassword(txt), clearError();
            }}
          />
          <Text style={styles.errorText}>{confirmPasswordError}</Text>

          <TouchableOpacity
            style={[styles.button, {borderColor: isDarkMode ? '#fff' : '#000'}]}
            onPress={() => {
              if (validate()) {
                registerUser();
              } else {
                Alert.alert('Please Enter your details.');
              }
            }}>
            <Text
              style={[
                styles.buttonText,
                {
                  color: isDarkMode ? '#fff' : '#000',
                },
              ]}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(NavigationString.LOGIN)}>
            <Text
              style={[styles.orLogin, {color: isDarkMode ? '#fff' : '#000'}]}>
              Or Login
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
