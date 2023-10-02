import React from 'react';
import {InputToolbar} from 'react-native-gifted-chat';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';

const CustomInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: '#ECECEC',
        borderTopWidth: 1,
        borderTopColor: '#CFCFCF',
      }}>
      <TextInput
        style={{flex: 1, fontSize: 16, paddingHorizontal: 16}}
        placeholder="Type a message..."
        value={props.text}
        onChangeText={props.onTextChanged}
        multiline
        placeholderTextColor="#999"
      />
      <TouchableOpacity onPress={props.onSend}>
        <Text
          style={{
            color: '#007BFF',
            fontSize: 16,
            paddingHorizontal: 16,
            fontWeight: 'bold',
          }}>
          Send
        </Text>
      </TouchableOpacity>
    </InputToolbar>
  );
};

export default CustomInputToolbar;
