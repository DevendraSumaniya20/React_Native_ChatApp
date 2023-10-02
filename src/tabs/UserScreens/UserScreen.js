import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ImagePath from '../../constants/ImagePath';
import styles from './styles';
import NavigationString from '../../constants/NavigationString';
let id = '';
const UserScreen = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const [mode, setMode] = useState('LIGHT');
  const isFocued = useIsFocused();
  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    getMode();
  }, [isFocued]);
  const getMode = async () => {
    setMode(await AsyncStorage.getItem('MODE'));
  };
  const getUsers = async () => {
    id = await AsyncStorage.getItem('USERID');
    let tempData = [];
    const email = await AsyncStorage.getItem('EMAIL');
    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then(res => {
        if (res.docs != []) {
          res.docs.map(item => {
            tempData.push(item.data());
          });
        }
        setUsers(tempData);
      });
  };
  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat App</Text>
      </View>
      <FlatList
        data={users}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={[styles.userItem, {backgroundColor: 'white'}]}
              onPress={() => {
                navigation.navigate(NavigationString.CHAT, {
                  data: item,
                  id: id,
                });
              }}>
              <Image source={ImagePath.PROFILE} style={styles.userIcon} />
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default UserScreen;
