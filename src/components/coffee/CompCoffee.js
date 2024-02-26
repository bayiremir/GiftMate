import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {addItem, removeItem} from '../../redux/slices/cartSlice';

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
      <TouchableOpacity
        style={styles.container}
        onPress={() => dispatch(addItem(item))}>
        <Image style={styles.image} source={{uri: item.image_url}} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.text}>{item.price} TL</Text>
        {remove ? null : <Text style={styles.text}>{item.description}</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default CompCoffee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  remove: {
    position: 'absolute',
    right: 0,
    top: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
