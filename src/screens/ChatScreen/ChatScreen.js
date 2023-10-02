import {ImageBackground, SafeAreaView} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Bubble, GiftedChat, Avatar} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import ImagePath from '../../constants/ImagePath';
import styles from './styles';

import CustomInputToolbar from '../../components/CustomInputToolbar';
import CustomActions from '../../components/CustomActions';
import CustomComposer from '../../components/CustomComposer';
import TypingIndicator from '../../components/TypingIndicator';
import MessageTimestamp from '../../components/MessageTimestamp';
import {useRoute} from '@react-navigation/native';

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

  const renderBubble = props => (
    <Bubble
      {...props}
      textStyle={{
        right: {color: 'white'},
        left: {color: 'black'},
      }}
      wrapperStyle={{
        right: {
          backgroundColor: '#3897f0',
          borderRadius: 15,
        },
        left: {
          backgroundColor: '#f0f0f0',
          borderRadius: 15,
        },
      }}
    />
  );

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
          keyExtractor={message => message.id.toString()}
          renderBubble={renderBubble}
          loadEarlier={true}
          onLoadEarlier={() => loadEarlierMessages()}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ChatScreen;
