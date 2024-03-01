import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RewardDashboard = () => {
  return (
    <View style={styles.bigContainer}>
      <Text style={styles.header}>Reward and Discounts</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.scrollviewcontainer}>
        <View style={styles.container}></View>
        <View style={styles.container}></View>
        <View style={styles.container}></View>
        <View style={styles.container}></View>
      </ScrollView>
    </View>
  );
};

export default RewardDashboard;

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    marginVertical: 8,
  },
  header: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 8,
    marginHorizontal: 25,
  },
  container: {
    width: 150,
    height: 200,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 10,
  },
  scrollviewcontainer: {
    marginHorizontal: 15,
  },
});
