// LoginScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationString from '../../constants/NavigationString';
import Loader from '../../components/Loader';
import styles from './styles';
import ImagePath from '../../constants/ImagePath';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

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
      ? heightPercentageToDP(30)
      : 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        networkActivityIndicatorVisible
        showHideTransition={'slide'}
        barStyle={'dark-content'}
      />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <ImageBackground
          source={ImagePath.BACKGROUNDIMAGE}
          style={styles.ImageBackground}>
          <Text style={styles.title}>Login</Text>

          <TextInput
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            style={styles.input}
            placeholder="Enter Email"
            value={email}
            placeholderTextColor="#fff"
            onChangeText={txt => setEmail(txt)}
          />

          <TextInput
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            style={styles.input}
            placeholder="Enter Password"
            value={password}
            placeholderTextColor="#fff"
            secureTextEntry
            onChangeText={txt => setPassword(txt)}
          />

          <TouchableOpacity style={styles.button} onPress={() => loginUser()}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(NavigationString.SIGNUP)}>
            <Text style={styles.orLogin}>Or SignUp</Text>
          </TouchableOpacity>

          <Loader visible={visible} />
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
