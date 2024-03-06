import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {settings} from '../../utils/settings';

const HorizontalScroll = ({categories, onPressCategory}) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      style={styles.rowcontainer}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={category.id}
          onPress={() => onPressCategory(index)}>
          <Text style={styles.text}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default HorizontalScroll;

const styles = StyleSheet.create({
  rowcontainer: {
    width: settings.WIDTH,
    height: 50,
    padding: 8,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 12,
  },
  productLength: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginVertical: 8,
  },
  icon: {
    marginHorizontal: 5,
  },
});
