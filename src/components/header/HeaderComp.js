import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';

const HeaderComp = ({title}) => {
  return <Text style={styles.header}>{title}</Text>;
};

export default HeaderComp;

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
});
