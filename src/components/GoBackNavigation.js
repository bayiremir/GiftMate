import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {ShoppingBagIcon as ShoppingBagIconOutline} from 'react-native-heroicons/outline';
import {getStatusBarHeight} from 'react-native-safearea-height';
import {colors} from '../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCartItems} from '../redux/slices/cartSlice';

const BackNavigationBar = ({color, shopping, title}) => {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cartSlice.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

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
        <Text style={styles.title}>{title}</Text>
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
    paddingHorizontal: 5,
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
    marginRight: 8,
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
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
});
