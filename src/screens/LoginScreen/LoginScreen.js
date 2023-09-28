import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationString from '../../constants/NavigationString';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();

  const loginUser = () => {
    setVisible(true);
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(res => {
        setVisible(false);
        if (res.docs !== []) {
          console.log(JSON.stringify(res.docs[0].data()));
          goToNext(
            res.docs[0].data().name,
            res.docs[0].data().email,
            res.docs[0].data().userId,
          );
        } else {
          Alert.alert('User not found');
        }
      })
      .catch(error => {
        setVisible(false);
        console.log(error);
        Alert.alert('User not found');
      });
  };

  const goToNext = async ({name, email, userId}) => {
    await AsyncStorage.setItem('NAME', name);
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('USERID', userId);
    navigation.navigate(NavigationString.MAIN);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        placeholderTextColor={'#000'}
        onChangeText={txt => setEmail(txt)}
      />

      <TextInput
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        placeholderTextColor={'#000'}
        onChangeText={txt => setPassword(txt)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          loginUser();
        }}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.orLogin}>Or SignUp</Text>
      </TouchableOpacity>

      <Loader visible={visible} />
    </SafeAreaView>
  );
};

export default LoginScreen;
