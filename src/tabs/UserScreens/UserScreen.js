import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePath from '../../constants/ImagePath';
import {useNavigation} from '@react-navigation/native';
import NavigationString from '../../constants/NavigationString';

let id = '';

const UserScreen = () => {
  const [users, setUsers] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const email = await AsyncStorage.getItem('EMAIL');
      const userCollection = await firestore()
        .collection('users')
        .where('email', '!=', email)
        .get();

      const userList = userCollection.docs.map(doc => doc.data());
      setUsers(userList);
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(NavigationString.CHAT, {
            data: item,
            id: id,
          });
        }}>
        <View style={styles.userItems}>
          <Image source={ImagePath.PROFILE} style={styles.userImage} />
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat app</Text>
      </View>

      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.email}
      />
    </View>
  );
};

export default UserScreen;
