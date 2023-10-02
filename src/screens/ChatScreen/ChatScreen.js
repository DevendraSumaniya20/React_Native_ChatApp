import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import styles from './styles';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = () => {
  const [messagesList, setMessagesList] = useState([]);

  const route = useRoute();

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    subscriber.onSnapshot(querysnapshot => {
      const allMessages = querysnapshot.docs.map(item => {
        return {...item._data, createdAt: Date.parse(new Date())};
      });
      setMessagesList(allMessages);
    });
    return () => {
      subscriber();
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userId,
      createdAt: Date.parse(msg.createdAt),
    };

    setMessagesList(previousMessages =>
      GiftedChat.append(previousMessages, myMsg),
    );
    firestore()
      .collection('chats')
      .doc('' + route.params.id + route.params.data.userId)
      .collection('messages')
      .add(myMsg);

    firestore()
      .collection('chats')
      .doc('' + route.params.data.userId + route.params.id)
      .collection('messages')
      .add(myMsg);
  }, []);

  return (
    <View style={styles.container}>
      <Text>ChatScreen</Text>
      <GiftedChat
        messages={messagesList}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
        keyExtractor={message => message.id.toString()}
      />
    </View>
  );
};

export default ChatScreen;
