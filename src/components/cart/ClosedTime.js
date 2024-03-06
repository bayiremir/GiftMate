import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ClockIcon} from 'react-native-heroicons/outline';

const ClosedTime = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowcontainer}>
        <Text style={styles.title}>Açılış Saati</Text>
        <View style={styles.secondContainer}>
          <ClockIcon style={styles.icon} size={24} color="white" />
          <Text style={styles.text}>{item.opening_time}</Text>
        </View>
      </View>
      <View style={styles.rowcontainer}>
        <Text style={styles.title}>Kapanış Saati</Text>
        <View style={styles.secondContainer}>
          <ClockIcon style={styles.icon} size={24} color="white" />
          <Text style={styles.text}>{item.closing_time}</Text>
        </View>
      </View>
    </View>
  );
};

export default ClosedTime;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  rowcontainer: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
