// LoginScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
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
import {toggleTheme} from '../../store/reducerSlice/themeSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const isDarkMode = useSelector(state => state.theme.isDarkmode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const loginUser = async () => {
    setVisible(true);
    try {
      const querySnapshot = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        goToNext(userData);
      } else {
        Alert.alert('User not found');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred');
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
      Alert.alert('An error occurred');
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
