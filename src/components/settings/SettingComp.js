import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../utils/colors';
import {useDispatch} from 'react-redux';
import {storage} from '../../utils/storage';
import {setIsLogin} from '../../redux/slices/isLoginSlice';

const SettingComp = ({title, navigate, icon, quit}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePress = () => {
    if (navigate) {
      navigation.navigate(navigate);
    } else if (quit) {
      dispatch(setIsLogin(false));
      storage.delete('isLogin');
    }
  };
  return (
    <View style={styles.secondContainer}>
      <TouchableOpacity style={styles.rowcontainer} onPress={handlePress}>
        {icon}
        <Text style={styles.header}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingComp;

const styles = StyleSheet.create({
  secondContainer: {
    marginVertical: 4,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  header: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
  rowcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
