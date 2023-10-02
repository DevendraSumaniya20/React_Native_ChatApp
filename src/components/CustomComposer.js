import React from 'react';
import {Composer} from 'react-native-gifted-chat';

const CustomComposer = props => {
  return (
    <Composer
      {...props}
      textInputStyle={{
        backgroundColor: 'transparent',
        borderWidth: 0,
        fontSize: 16,
      }}
      placeholder="Type a message..."
    />
  );
};

export default CustomComposer;
