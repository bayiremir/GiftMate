import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {removeItem} from '../../redux/slices/cartSlice';
import {settings} from '../../utils/settings';

const CompCart = ({item}) => {
  const dispatch = useDispatch();
  const price = item.product_variations?.[0]?.price || 'Fiyat bilgisi yok';
  const floatPrice = parseFloat(price).toFixed(2);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.remove}
        onPress={() => dispatch(removeItem(item))}>
        <Image
          style={styles.icon}
          source={require('../../../assets/icons/remove.png')}
        />
      </TouchableOpacity>
      <View style={styles.cart}>
        <Image style={styles.image} source={{uri: item.file_path}} />
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.addcontainer}>
          <Text style={styles.text}>{floatPrice} TL</Text>
        </View>
      </View>
    </View>
  );
};

export default CompCart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  cart: {
    width: settings.WIDTH / 2 - 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    justifyContent: 'center',
    margin: 8,
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 8,
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
    borderRadius: 20,
  },
  remove: {
    position: 'absolute',
    right: 0,
    top: 0,
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
