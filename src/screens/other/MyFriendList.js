import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import LottieComponent from '../../components/lottie/LottieComponent';
import BackNavigationBar from '../../components/GoBackNavigation';
import {fetchRequestFriend} from '../../redux/slices/requestFriendSlice';
import {fetchFriends} from '../../redux/slices/myFriendSlice';
import {fetchAcceptFriend} from '../../redux/slices/acceptFriendRequestSlice';
import {PlusCircleIcon as PlusCircleIconSolid} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';

const MyFriendList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('received');

  const {requestFriend, requestFriendLoading} = useSelector(
    state => state.requestFriendSlice,
  );
  const {friendsContent, friendsContentLoading} = useSelector(
    state => state.myFriendSlice,
  );
  const {acceptFriends, acceptFriendsLoading, error} = useSelector(
    state => state.acceptFriendRequestSlice,
  );

  const handleAcceptFriend = _id => {
    dispatch(fetchAcceptFriend({friendId: _id}));
  };
  useEffect(() => {
    dispatch(fetchRequestFriend());
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <BackNavigationBar color={'white'} title={'Arkadaşlarım'} />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'received' && styles.tabSelected]}
          onPress={() => setSelectedTab('received')}>
          <Text style={styles.tabText}>Arkadaş Listem</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'sent' && styles.tabSelected]}
          onPress={() => setSelectedTab('sent')}>
          <Text style={styles.tabText}>Arkadaş Ekleyenler</Text>
        </TouchableOpacity>
      </View>
      {requestFriendLoading &&
      friendsContentLoading &&
      acceptFriendsLoading &&
      acceptFriends ? (
        <LottieComponent />
      ) : (
        <FlatList
          data={
            selectedTab === 'received'
              ? friendsContent?.friends
              : requestFriend?.friendRequests
          }
          keyExtractor={(item, index) => `${selectedTab}-${index}`}
          renderItem={({item}) => (
            <View style={styles.bigContainer}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                }}
                onPress={() =>
                  (selectedTab === 'sent' && handleAcceptFriend(item._id)) ||
                  (selectedTab === 'received' &&
                    navigation.navigate('ChatScreen', {
                      user: item.sender,
                    }))
                }>
                <Text style={styles.itemText}>{item.username}</Text>
                {selectedTab === 'sent' && (
                  <PlusCircleIconSolid color={colors.skincolor} size={30} />
                )}
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default MyFriendList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primarycolor,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  tab: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.lightBlue,
    borderRadius: 10,
  },
  tabSelected: {
    backgroundColor: colors.lightBlue,
  },
  tabText: {
    color: colors.skincolor,
  },
  bigContainer: {
    marginVertical: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBlue,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    color: colors.skincolor,
  },
});
