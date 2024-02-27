import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const FriendList = ({id}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>Kullanıcı adı: {id}</Text>
    </TouchableOpacity>
  );
};

export default FriendList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
