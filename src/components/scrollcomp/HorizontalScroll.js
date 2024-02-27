import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {settings} from '../../utils/settings';
import {ChevronDownIcon as ChevronDownIconSolid} from 'react-native-heroicons/solid';

const HorizontalScroll = ({title1, title2, title3, length}) => {
  return (
    <View>
      <ScrollView horizontal={true} style={styles.rowcontainer}>
        <TouchableOpacity>
          <Text style={styles.text}>{title1}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>{title2}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>{title3}</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.productContainer}>
        <Text style={styles.productLength}>Ürün Sayısı: {length}</Text>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Text style={[styles.productLength, {fontWeight: 'bold'}]}>
            Popüler
          </Text>
          <ChevronDownIconSolid style={styles.icon} color={'white'} size={18} />
        </TouchableOpacity>
      </View>
    </View>
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
