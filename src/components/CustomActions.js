import React from 'react';
import {Actions} from 'react-native-gifted-chat';
import {TouchableOpacity, Text, View} from 'react-native';

const CustomActions = props => {
  return (
    <Actions
      {...props}
      containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
      icon={() => (
        <View
          style={{alignItems: 'center', justifyContent: 'center', padding: 8}}>
          <Text style={{color: '#007BFF', fontSize: 18}}>+</Text>
        </View>
      )}
      options={{
        'Send Image': () => {
          // Implement image sending logic here
        },
        'Send Location': () => {
          // Implement location sending logic here
        },
        Cancel: () => {},
      }}
      optionTintColor="#007BFF">
      {/* Wrap the options within a single parent element */}
      <View>
        <TouchableOpacity onPress={props.onImageSend}>
          <Text>Send Image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onLocationSend}>
          <Text>Send Location</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onCancel}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Actions>
  );
};

export default CustomActions;
