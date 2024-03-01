import React from 'react';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {settings} from '../../utils/settings';
import {colors} from '../../utils/colors';

const HomeComp = ({navigate, image}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate(navigate)}>
        <Image source={image} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeComp;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 5,
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
  },
});
