import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {getStatusBarHeight} from 'react-native-safearea-height';

const BackNavigationBar = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, {marginTop: getStatusBarHeight() + 10}]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backbutton}>
        <ChevronLeftIcon
          width={24}
          height={24}
          style={styles.icon}
          color={'white'}
        />
        <Text style={styles.backtext}>Geri</Text>
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image
          source={{uri: 'https://i.ibb.co/7zVW9VJ/logo.png'}}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default BackNavigationBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  logo: {
    width: 180,
    height: 60,
  },
  backbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  backtext: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
});
