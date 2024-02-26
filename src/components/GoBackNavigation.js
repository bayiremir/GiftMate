import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {ShoppingBagIcon as ShoppingBagIconOutline} from 'react-native-heroicons/outline';
import {getStatusBarHeight} from 'react-native-safearea-height';
import {colors} from '../utils/colors';
import {useSelector} from 'react-redux';

const BackNavigationBar = ({color, shopping}) => {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cartSlice.items);

  return (
    <View style={[styles.container, {marginTop: getStatusBarHeight() + 10}]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backbutton}>
        <ChevronLeftIcon
          width={24}
          height={24}
          style={styles.icon}
          color={color}
        />
        <Text style={[styles.backtext, {color: color}]}>Geri</Text>
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image
          source={{uri: 'https://i.ibb.co/7zVW9VJ/logo.png'}}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      {shopping ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('CartScreen')}
          style={styles.backbutton}>
          <ShoppingBagIconOutline
            width={24}
            height={24}
            style={{marginRight: 8}}
            color={color}
          />
          <View style={styles.number}>
            <Text style={styles.numberText}>{cartItems.length}</Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default BackNavigationBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 16,
    fontWeight: '400',
  },
  number: {
    width: 20,
    height: 20,
    backgroundColor: colors.lightGreen,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -5,
    right: -5,
  },
  numberText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 12,
  },
});
