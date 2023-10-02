import {View, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import ImagePath from '../../constants/ImagePath';

import UserScreen from '../../tabs/UserScreens/UserScreen';
import SettingScreen from '../../tabs/SettingScreens/SettingScreen';

const MainScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      {selectedTab == 0 ? <UserScreen /> : <SettingScreen />}
      <View style={styles.bottomTab}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={ImagePath.GROUP}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab == 0 ? '#fff' : '#808080'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={ImagePath.SETTING}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab == 1 ? '#fff' : '#808080'},
            ]}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;
