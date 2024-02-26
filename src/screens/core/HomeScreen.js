import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../utils/colors';
import {storage} from '../../utils/storage';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLogin} from '../../redux/slices/isLoginSlice';
import {fetchSendGift} from '../../redux/slices/sendGiftSlice';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleLeave = () => {
    dispatch(setIsLogin(false));
    storage.delete('isLogin');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('GiftScreen', {title: 'Starbucks Coffee'})
        }>
        <Image
          source={require('../../../assets/product/starbucks.png')}
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'white',
            borderRadius: 50,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLeave} style={styles.leave}>
        <Text>Leave</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
  },
  leave: {
    backgroundColor: colors.skincolor,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});
