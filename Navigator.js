import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/core/HomeScreen';
import ProfileScreen from './src/screens/core/ProfileScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/login/LoginScreen';
import RegisterScreen from './src/screens/login/RegisterScreen';
import GiftScreen from './src/screens/gift/GiftScreen';
import CartScreen from './src/screens/gift/CartScreen';
import SettingScreen from './src/screens/core/SettingScreen';
import InventoryGift from './src/screens/other/InventoryGift';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyFriendList from './src/screens/other/MyFriendList';
import MessageScreen from './src/screens/other/MessageScreen';
import ChatScreen from './src/screens/other/ChatScreen';
import TicketScreen from './src/screens/other/TicketScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const MaterialTopTab = createMaterialTopTabNavigator();

export function TopTabNavigator() {
  return (
    <NavigationContainer independent={true}>
      <MaterialTopTab.Navigator>
        <MaterialTopTab.Screen name="GiftScreen" component={GiftScreen} />
        <MaterialTopTab.Screen name="InventoryGift" component={InventoryGift} />
        <MaterialTopTab.Screen name="MyFriendList" component={MyFriendList} />
      </MaterialTopTab.Navigator>
    </NavigationContainer>
  );
}

export function AuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GiftScreen"
          component={GiftScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InventoryGift"
          component={InventoryGift}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyFriendList"
          component={MyFriendList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MessageScreen"
          component={MessageScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TicketScreen"
          component={TicketScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
