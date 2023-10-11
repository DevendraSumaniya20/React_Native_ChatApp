import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import NavigationString from '../../constants/NavigationString';
import UserScreen from '../../tabs/UserScreens/UserScreen';
import SettingScreen from '../../tabs/SettingScreens/SettingScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Tab = createMaterialBottomTabNavigator();

const MainScreen = () => {
  const isDarkMode = useSelector(state => state.theme.isDarkmode);

  return (
    <Tab.Navigator
      barStyle={{
        height: hp(8),
        borderColor: 'red',
        width: wp(100),
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: isDarkMode ? '#000' : '#fff',
        marginBottom: hp(1.2),
      }}
      initialRouteName={NavigationString.USER}
      labeled={false}>
      <Tab.Screen
        name={NavigationString.USER}
        component={UserScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="person" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={NavigationString.SETTING}
        component={SettingScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="settings" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
