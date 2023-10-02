import React from 'react';
import {View, Text} from 'react-native';

const MessageTimestamp = ({currentMessage}) => {
  return (
    <View>
      <Text>{new Date(currentMessage.createdAt).toLocaleTimeString()}</Text>
    </View>
  );
};

export default MessageTimestamp;
