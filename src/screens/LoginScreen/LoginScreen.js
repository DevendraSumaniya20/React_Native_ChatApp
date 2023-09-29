// LoginScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationString from '../../constants/NavigationString';
import Loader from '../../components/Loader';
import styles from './styles';

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        placeholderTextColor="#000"
        onChangeText={txt => setEmail(txt)}
      />

      <TextInput
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        placeholderTextColor="#000"
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
    </SafeAreaView>
  );
};

export default LoginScreen;
