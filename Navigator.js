import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/core/HomeScreen';
import ProfileScreen from './src/screens/core/ProfileScreen';
import {
  HomeIcon as HomeIconOutline,
  UserIcon as UserIconOutline,
} from 'react-native-heroicons/outline';
import {
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
} from 'react-native-heroicons/solid';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/login/LoginScreen';
import RegisterScreen from './src/screens/login/RegisterScreen';
import {colors} from './src/utils/colors';
import GiftScreen from './src/screens/gift/GiftScreen';
import CartScreen from './src/screens/gift/CartScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
          name="TabNavigator"
          component={TabNavigator}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          if (route.name === 'Ana Sayfa') {
            return focused ? (
              <HomeIconSolid color={color} size={24} />
            ) : (
              <HomeIconOutline color={color} size={24} />
            );
          } else if (route.name === 'Arkadaş Listesi') {
            return focused ? (
              <UserIconSolid color={color} size={24} />
            ) : (
              <UserIconOutline color={color} size={24} />
            );
          }
        },
        tabBarActiveTintColor: colors.skincolor,
        tabBarInactiveTintColor: colors.skincolor,
        tabBarStyle: {backgroundColor: colors.darkBlue},
      })}>
      <Tab.Screen
        name="Ana Sayfa"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Arkadaş Listesi"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
