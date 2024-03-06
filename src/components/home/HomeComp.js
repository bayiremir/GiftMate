import React from 'react';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';

const HomeComp = ({onPress, imageSource}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image source={imageSource} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeComp;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 12,
  },
  icon: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 50,
  },
});
