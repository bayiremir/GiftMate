import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LottieComponent from '../lottie/LottieComponent';

const MessageDetailCard = ({message, date, isMe, loading}) => {
  return (
    <>
      {loading ? (
        <LottieComponent />
      ) : (
        <View
          style={[
            styles.container,
            {
              backgroundColor: isMe ? '#007BFF' : 'white',
              alignSelf: isMe ? 'flex-end' : 'flex-start',
            },
          ]}>
          <Text
            style={[
              styles.message,
              {
                color: isMe ? 'white' : 'black',
              },
            ]}>
            {message}
          </Text>
          <Text style={[styles.date, {color: isMe ? 'white' : 'black'}]}>
            {date}
          </Text>
        </View>
      )}
    </>
  );
};

export default MessageDetailCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    width: '60%',
    marginHorizontal: 15,
    marginBottom: 15,
  },
  message: {fontWeight: '500', fontSize: 14, marginBottom: 10},
  date: {fontSize: 12, alignSelf: 'flex-end'},
});
