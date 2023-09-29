import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import NavigationString from '../../constants/NavigationString';

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <Text style={styles.errorText}>{nameError}</Text>

      <TextInput
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={txt => setEmail(txt)}
        keyboardType="email-address"
      />
      <Text style={styles.errorText}>{emailError}</Text>

      <TextInput
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        style={styles.input}
        keyboardType="number-pad"
        placeholder="Enter Mobile"
        value={mobile}
        onChangeText={txt => setMobile(txt)}
      />
      <Text style={styles.errorText}>{mobileError}</Text>

      <TextInput
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        secureTextEntry
        onChangeText={txt => setPassword(txt)}
      />
      <Text style={styles.errorText}>{passwordError}</Text>

      <TextInput
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        secureTextEntry
        onChangeText={txt => setConfirmPassword(txt)}
      />
      <Text style={styles.errorText}>{confirmPasswordError}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (validate()) {
            registerUser();
          } else {
            Alert.alert('Please Enter your details.');
          }
        }}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(NavigationString.LOGIN)}>
        <Text style={styles.orLogin}>Or Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUpScreen;
