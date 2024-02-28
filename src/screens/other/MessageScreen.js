import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackNavigationBar from '../../components/GoBackNavigation';
import {colors} from '../../utils/colors';
import {fetchGetMessage} from '../../redux/slices/getMessageSlice';
import {useDispatch, useSelector} from 'react-redux';
import LottieComponent from '../../components/lottie/LottieComponent';
import {io} from 'socket.io-client';
const socket = io('http://127.0.0.1:3000');

const MessageScreen = () => {
  const [filteredMessages, setFilteredMessages] = useState([]);
  const dispatch = useDispatch();
  const {getMessage, getMessageLoading} = useSelector(
    state => state.getMessageSlice,
  );

  useEffect(() => {
    console.log('fetchGetMessage dispatch ediliyor.');
    dispatch(fetchGetMessage());
  }, [dispatch]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket.IO ile sunucuya bağlandı.');
    });

    socket.on('receiveMessage', newMessage => {
      console.log('Alınan mesaj:', newMessage);
    });

    return () => {
      console.log('Socket.IO bağlantısı kesiliyor.');
      socket.off('connect');
      socket.off('receiveMessage');
    };
  }, []);

  useEffect(() => {
    const receiveMessageListener = newMessage => {
      setFilteredMessages(prevMessages => {
        // Yeni mesajın göndericisinin _id'sini ve varsa username'ini al
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
          // Eğer mesaj zaten varsa, güncelle
          updatedMessages[messageIndex] = {
            ...updatedMessages[messageIndex],
            ...newMessage,
            sender: {
              // Gönderici bilgisini güncelle
              _id: newMessageSenderId,
              username: newMessageSenderUsername, // Username bilgisini koru
            },
          };
        } else {
          // Eğer mesaj yoksa, yeni mesajı listeye ekle
          updatedMessages.push({
            ...newMessage,
            sender: {
              // Gönderici bilgisini düzenle
              _id: newMessageSenderId,
              username: newMessageSenderUsername, // Username ekle
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
      const latestMessages = getMessage.reduce((acc, message) => {
        const senderId = message.sender._id;
        // Eğer bu göndericiden bir mesaj zaten varsa ve bu mesaj daha yeni ise, güncelle
        if (
          !acc[senderId] ||
          new Date(acc[senderId].createdAt) < new Date(message.createdAt)
        ) {
          acc[senderId] = message;
        }
        return acc;
      }, {});

      setFilteredMessages(Object.values(latestMessages));
    }
  }, [getMessageLoading, getMessage]);

  return (
    <View style={styles.container}>
      <BackNavigationBar title={'Mesajlarım'} color={colors.white} />
      {getMessageLoading ? (
        <LottieComponent />
      ) : (
        <FlatList
          data={filteredMessages}
          extraData={filteredMessages}
          keyExtractor={item => item._id.toString()} // Anahtar olarak _id kullanın ve string olmasına
          renderItem={({item}) => (
            <View style={styles.messageContainer}>
              <Text style={styles.senderUsername}>{item.sender.username}</Text>
              <Text style={styles.messageText}>{item.content}</Text>
            </View>
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
