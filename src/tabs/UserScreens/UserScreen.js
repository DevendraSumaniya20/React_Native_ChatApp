import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import ImagePath from '../../constants/ImagePath';
import styles from './styles';
import NavigationString from '../../constants/NavigationString';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {heightPercentageToDP} from 'react-native-responsive-screen';
let id = '';

const UserScreen = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  const isDarkMode = useSelector(state => state.theme.isDarkmode);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    id = await AsyncStorage.getItem('USERID');
    let tempData = [];
    const email = await AsyncStorage.getItem('EMAIL');
    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then(res => {
        if (res.docs.length > 0) {
          res.docs.forEach(item => {
            tempData.push(item.data());
          });
        }
        setUsers(tempData);
      });
  };

  const gotoLogin = () => {
    Alert.alert(
      'Are you sure you want to go to the login screen?',
      'Press OK to proceed or Cancel to stay on this screen.',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate(NavigationString.LOGIN);
          },
        },
      ],
      {cancelable: false},
    );
  };
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
      <View style={styles.backButton}>
        <TouchableOpacity onPress={gotoLogin}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={heightPercentageToDP(4)}
            color={isDarkMode ? '#fff' : '#000'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={[styles.title, {color: isDarkMode ? '#fff' : '#000'}]}>
          Friends
        </Text>
      </View>

      {users.length === 0 ? (
        <View style={styles.noFriendsMessageView}>
          <Text
            style={[
              styles.noFriendsMessage,
              {color: isDarkMode ? '#fff' : '#000'},
            ]}>
            You haven't added any friends yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={users}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={[
                  styles.userItem,
                  {
                    backgroundColor: isDarkMode ? '#333' : '#fff',
                    borderBottomColor: isDarkMode ? '#444' : '#ccc',
                  },
                ]}
                onPress={() => {
                  navigation.navigate(NavigationString.CHAT, {
                    data: item,
                    id: id,
                  });
                }}>
                <Image
                  source={ImagePath.PROFILE}
                  style={[
                    styles.userIcon,
                    {tintColor: isDarkMode ? '#eee' : '#AAA'},
                  ]}
                />
                <Text
                  style={[styles.name, {color: isDarkMode ? '#fff' : '#000'}]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default UserScreen;
