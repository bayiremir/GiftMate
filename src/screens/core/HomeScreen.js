import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import {storage} from '../../utils/storage';
import {useDispatch} from 'react-redux';
import {setIsLogin} from '../../redux/slices/isLoginSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const handleLeave = () => {
    dispatch(setIsLogin(false));
    storage.delete('isLogin');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leave} onPress={handleLeave}>
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
