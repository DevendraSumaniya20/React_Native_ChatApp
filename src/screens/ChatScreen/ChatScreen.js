import {ImageBackground, SafeAreaView, Text} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Bubble, GiftedChat, Avatar} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import styles from './styles';
import ImagePath from '../../constants/ImagePath';

const ChatScreen = () => {
  const [messagesList, setMessagesList] = useState([]);
  const [inputText, setInputText] = useState('');
  const route = useRoute();

  useEffect(() => {
    const chatId1 = `${route.params.id}${route.params.data.userId}`;
    const chatId2 = `${route.params.data.userId}${route.params.id}`;

    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId1)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const allMessages = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          _id: doc.id,
        }));
        setMessagesList(allMessages);
      });

    return () => {
      unsubscribe();
    };
  }, [route.params.id, route.params.data.userId]);

  const onSend = useCallback(
    (messages = []) => {
      const msg = messages[0];
      const myMsg = {
        ...msg,
        user: {
          _id: route.params.id,
        },
        createdAt: new Date().getTime(),
      };

      setMessagesList(previousMessages =>
        GiftedChat.append(previousMessages, [myMsg]),
      );

      const chatId1 = `${route.params.id}${route.params.data.userId}`;
      const chatId2 = `${route.params.data.userId}${route.params.id}`;

      const messageRef = firestore().collection('chats');
      messageRef.doc(chatId1).collection('messages').add(myMsg);
      messageRef.doc(chatId2).collection('messages').add(myMsg);
    },
    [route.params.data.userId, route.params.id],
  );

  const renderBubble = props => {
    const {currentMessage} = props;
    const bubbleStyles = {
      right: {
        backgroundColor: '#3897f0',
        borderRadius: 15,
        maxWidth: '80%',
      },
      left: {
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        maxWidth: '80%',
      },
    };

    return (
      <Bubble
        {...props}
        textStyle={{
          right: {color: 'white'},
          left: {color: 'black'},
        }}
        wrapperStyle={
          bubbleStyles[
            currentMessage.user._id === route.params.id ? 'right' : 'left'
          ]
        }>
        {currentMessage.text}

        <Text
          style={{
            alignSelf: 'flex-end',
            fontSize: 12,
            color: '#91918e',
            marginTop: 4,
          }}>
          {new Date(currentMessage.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </Bubble>
    );
  };

  const handleSend = () => {
    if (inputText && inputText.trim() !== '') {
      const newMessage = {
        _id: Math.random().toString(36).substring(7),
        text: inputText.trim(),
        createdAt: new Date().getTime(),
        user: {
          _id: route.params.id,
        },
      };

      onSend([newMessage]);
      setInputText('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={ImagePath.BACKGROUNDIMAGE}
        style={styles.ImageBackground}>
        <GiftedChat
          messages={messagesList}
          onSend={messages => onSend(messages)}
          user={{
            _id: route.params.id,
          }}
          renderBubble={renderBubble}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ChatScreen;
