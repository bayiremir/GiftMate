import React from 'react';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {settings} from '../../utils/settings';
import {getStatusBarHeight} from 'react-native-safearea-height';
import {colors} from '../../utils/colors';

const HomeComp = ({navigate, image}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.secondcontainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate(navigate)}
        style={styles.secondCont}>
        <Image source={image} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeComp;

const styles = StyleSheet.create({
  secondcontainer: {
    marginHorizontal: 15,
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  secondCont: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mostdarkBlue,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
