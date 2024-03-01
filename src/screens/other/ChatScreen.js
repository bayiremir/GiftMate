import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import BackNavigationBar from '../../components/GoBackNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MessageDetailCard from '../../components/messages/MessageDetailCard';
import {io} from 'socket.io-client';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGetMessage} from '../../redux/slices/getMessageSlice';
import {fetchSendMessage} from '../../redux/slices/sendMessageSlice';

const socket = io('https://emag.uskudar.dev');

const ChatScreen = ({route}) => {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const insets = useSafeAreaInsets();
  const flatListRef = useRef(null);
  const dispatch = useDispatch();
  const selectedUser = route.params.user;

  const {profileContent, profileContentLoading} = useSelector(
    state => state.profileSlice,
  );

  useEffect(() => {
    if (!profileContentLoading && profileContent._id) {
      dispatch(fetchGetMessage()).then(action => {
        // Alınan mesajları filtrele ve isMe durumunu ekleyin
        const filteredAndUpdatedMessages = action.payload
          .filter(
            message =>
              message.sender._id === selectedUser._id ||
              message.receiver._id === selectedUser._id,
          )
          .map(message => ({
            ...message,
            isMe: message.sender._id === profileContent._id,
          }));
        setMessages(filteredAndUpdatedMessages);
      });
    }
  }, [profileContentLoading, profileContent._id, dispatch, selectedUser._id]);

  useEffect(() => {
    const receiveMessageListener = newMessage => {
      // Yalnızca seçilen kullanıcıdan gelen mesajları işle
      if (
        newMessage.sender === selectedUser._id ||
        newMessage.receiver === selectedUser._id
      ) {
        const isMessageFromMe = newMessage.sender === profileContent._id;
        setMessages(prevMessages => [
          ...prevMessages,
          {
            ...newMessage,
            isMe: isMessageFromMe,
          },
        ]);
      }
    };

    socket.on('receiveMessage', receiveMessageListener);

    return () => {
      socket.off('receiveMessage', receiveMessageListener);
    };
  }, [profileContent._id, selectedUser._id]);

  const sendMessage = () => {
    if (reply.trim()) {
      dispatch(
        fetchSendMessage({receiverId: selectedUser._id, content: reply}),
      ).then(action => {
        if (!action.error) {
          const newMessage = {
            content: reply,
            sender: profileContent._id,
            receiver: route.params.user._id,
            createdAt: new Date().toISOString(),
            isMe: true,
          };

          setReply('');
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <BackNavigationBar title={'Mesaj'} color={'white'} />
      <FlatList
        data={messages}
        ref={flatListRef}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({animated: true})
        }
        onLayout={() => flatListRef.current?.scrollToEnd({animated: true})}
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item._id || `${item.createdAt}-${index}`}
        renderItem={({item}) => (
          <MessageDetailCard
            date={new Date(item.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            isMe={item.isMe}
            message={item.content || item.text}
          />
        )}
      />
      <View
        style={[
          styles.bottomMessageBar,
          {paddingBottom: Platform.OS === 'ios' ? insets.bottom : 10},
        ]}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            multiline={true}
            placeholder="Mesajınız"
            placeholderTextColor={'gray'}
            onChangeText={setReply}
            value={reply}
          />
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Image
            style={{width: 22, height: 22}}
            source={{
              uri: 'https://mobile.uskudar.dev/assets/img/icon/send.png',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#002348',
    flex: 1,
  },
  messageInput: {
    height: 'auto',
    paddingVertical: 0,
    marginHorizontal: 10,
    color: 'black',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
    marginTop: 20,
    marginLeft: 15,
  },
  noMessageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  receiverName: {
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    marginLeft: 15,
  },
  imageApprove: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
  unreadTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '80%',
    maxHeight: 85,
    paddingVertical: 5,
    minHeight: 35,
    borderRadius: 10,
    justifyContent: 'center',
  },
  bottomMessageBar: {
    position: 'absolute',
    backgroundColor: '#0062CC',
    bottom: 0,
    right: 0,
    left: 0,
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#002348',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatScreen;
