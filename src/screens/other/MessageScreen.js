import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackNavigationBar from '../../components/GoBackNavigation';
import {colors} from '../../utils/colors';
import {fetchGetMessage} from '../../redux/slices/getMessageSlice';
import {useDispatch, useSelector} from 'react-redux';
import LottieComponent from '../../components/lottie/LottieComponent';
import {io} from 'socket.io-client';
import {useNavigation} from '@react-navigation/native';
const socket = io('http://10.0.73.31:3000');

const MessageScreen = () => {
  const [filteredMessages, setFilteredMessages] = useState([]);
  const dispatch = useDispatch();
  const {getMessage, getMessageLoading} = useSelector(
    state => state.getMessageSlice,
  );
  const navigation = useNavigation();

  const onRefresh = () => {
    dispatch(fetchGetMessage());
  };

  useEffect(() => {
    dispatch(fetchGetMessage());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      socket.off('connect');
      socket.off('receiveMessage');
    };
  }, []);

  useEffect(() => {
    const receiveMessageListener = newMessage => {
      setFilteredMessages(prevMessages => {
        const newMessageSenderId =
          typeof newMessage.sender === 'object'
            ? newMessage.sender._id
            : newMessage.sender;
        const newMessageSenderUsername =
          typeof newMessage.sender === 'object'
            ? newMessage.sender.username
            : prevMessages.find(m => m.sender._id === newMessage.sender)?.sender
                .username;

        const messageIndex = prevMessages.findIndex(
          m => m.sender._id === newMessageSenderId,
        );

        let updatedMessages = [...prevMessages];
        if (messageIndex >= 0) {
          updatedMessages[messageIndex] = {
            ...updatedMessages[messageIndex],
            ...newMessage,
            sender: {
              _id: newMessageSenderId,
              username: newMessageSenderUsername,
            },
          };
        } else {
          updatedMessages.push({
            ...newMessage,
            sender: {
              _id: newMessageSenderId,
              username: newMessageSenderUsername,
            },
          });
        }
        return updatedMessages;
      });
    };

    socket.on('receiveMessage', receiveMessageListener);

    return () => {
      socket.off('receiveMessage', receiveMessageListener);
    };
  }, []);

  useEffect(() => {
    if (!getMessageLoading && getMessage) {
      setFilteredMessages(getMessage);
    }
  }, [getMessage, getMessageLoading]);

  useEffect(() => {
    if (!getMessageLoading && getMessage && getMessage.length > 0) {
      const groupedMessages = getMessage.reduce((acc, message) => {
        // Gönderici ve alıcı ID'lerini alfabetik sıraya göre birleştirerek benzersiz bir anahtar oluştur
        const participants = [message.sender._id, message.receiver._id].sort();
        const key = participants.join('-');

        // Bu anahtara sahip en son mesajı sakla
        if (
          !acc[key] ||
          new Date(acc[key].createdAt) < new Date(message.createdAt)
        ) {
          acc[key] = message;
        }
        return acc;
      }, {});

      setFilteredMessages(Object.values(groupedMessages));
    }
  }, [getMessage, getMessageLoading]);

  return (
    <View style={styles.container}>
      <BackNavigationBar title={'Mesajlarım'} color={colors.white} />
      {getMessageLoading ? (
        <LottieComponent />
      ) : (
        <FlatList
          data={filteredMessages}
          extraData={filteredMessages}
          refreshControl={
            onRefresh && (
              <RefreshControl
                colors={[colors.darkBlue]}
                refreshing={getMessageLoading}
                onRefresh={onRefresh}
              />
            )
          }
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ChatScreen', {
                  user: item.sender,
                })
              }
              style={styles.messageContainer}>
              <Text style={styles.senderUsername}>{item.sender.username}</Text>
              <Text style={styles.messageText}>{item.content}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBlue,
  },
  messageContainer: {
    backgroundColor: colors.skincolor,
    marginHorizontal: 15,
    borderRadius: 15,
    padding: 12,
    marginVertical: 5,
  },
  senderUsername: {
    fontWeight: 'bold',
    color: colors.darkBlue,
  },
  messageText: {
    color: '#000',
  },
});
