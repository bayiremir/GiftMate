import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {addItem, removeItem} from '../../redux/slices/cartSlice';
import {settings} from '../../utils/settings';
import {ShoppingBagIcon as ShoppingBagIconSolid} from 'react-native-heroicons/solid';

const CompCoffee = ({item, remove}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {remove && (
        <TouchableOpacity
          style={styles.remove}
          onPress={() => dispatch(removeItem(item))}>
          <Image
            style={styles.icon}
            source={require('../../../assets/icons/remove.png')}
          />
        </TouchableOpacity>
      )}
      <View style={styles.cart}>
        <Image style={styles.image} source={{uri: item.image_url}} />
        <Text style={styles.title}>{item.name}</Text>
        {remove ? null : (
          <Text numberOfLines={2} style={styles.description}>
            {item.description}
          </Text>
        )}
        <View style={styles.addcontainer}>
          <Text style={styles.text}>{item.price} TL</Text>
          {remove ?? (
            <TouchableOpacity onPress={() => dispatch(addItem(item))}>
              <ShoppingBagIconSolid
                color={'white'}
                style={[styles.icon, {marginHorizontal: 5}]}
                size={18}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CompCoffee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cart: {
    width: settings.WIDTH / 2 - 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    justifyContent: 'center',
    margin: 10,
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  description: {
    fontSize: 12,
    color: 'white',
    marginVertical: 12,
  },
  image: {
    width: settings.WIDTH / 2 - 50,
    height: settings.HEIGHT / 5,
  },
  remove: {
    position: 'absolute',
    right: 0,
    top: 10,
    zIndex: 1,
  },
  icon: {
    width: 30,
    height: 30,
  },
  addcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
