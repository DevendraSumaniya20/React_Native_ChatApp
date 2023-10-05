import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {useSelector} from 'react-redux';
import styles from './styles';

const ChatScreen = () => {
  const [messageList, setMessageList] = useState([]);
  const route = useRoute();
  const isDarkMode = useSelector(state => state.theme.isDarkmode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscriber = await firestore()
          .collection('chats')
          .doc(route.params.id + route.params.data.userId)
          .collection('messages')
          .orderBy('createdAt', 'desc')
          .onSnapshot(querySnapshot => {
            const allMessages = querySnapshot.docs.map(item => ({
              ...item._data,
              createdAt: item._data.createdAt,
            }));
            setMessageList(allMessages);
          });
        return () => subscriber();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    try {
      const msg = messages[0];
      const myMsg = {
        ...msg,
        sendBy: route.params.id,
        sendTo: route.params.data.userId,
        createdAt: Date.parse(msg.createdAt),
      };
      setMessageList(previousMessages =>
        GiftedChat.append(previousMessages, myMsg),
      );

      const chatId1 = '' + route.params.id + route.params.data.userId;
      const chatId2 = '' + route.params.data.userId + route.params.id;

      const batch = firestore().batch();

      batch.set(
        firestore()
          .collection('chats')
          .doc(chatId1)
          .collection('messages')
          .doc(uuid.v4().toString()),
        myMsg,
      );

      batch.set(
        firestore()
          .collection('chats')
          .doc(chatId2)
          .collection('messages')
          .doc(uuid.v4().toString()),
        myMsg,
      );

      await batch.commit();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#0084FF',
          },
          left: {
            backgroundColor: isDarkMode ? '#333333' : '#ECECEC',
          },
        }}
        textStyle={{
          right: {
            color: isDarkMode ? '#FFFFFF' : '#fff',
          },
          left: {
            color: isDarkMode ? '#FFFFFF' : '#000',
          },
        }}
      />
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#000' : '#fff'},
      ]}>
      <GiftedChat
        messages={messageList}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
        renderBubble={renderBubble}
      />

      <View style={styles.bottomSpaceView} />
    </SafeAreaView>
  );
};

export default ChatScreen;
