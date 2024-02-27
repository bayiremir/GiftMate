import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import CompSearch from '../../components/search/CompSearch';
import {colors} from '../../utils/colors';
import {fetchProfile} from '../../redux/slices/profileSlice';
import {useDispatch, useSelector} from 'react-redux';
import LottieComponent from '../../components/lottie/LottieComponent';
import BackNavigationBar from '../../components/GoBackNavigation';
import FriendList from '../../components/friends/FriendList';

const AddFriendList = () => {
  const dispatch = useDispatch();
  const {profileContent, profileContentLoading, error} = useSelector(
    state => state.profileSlice,
  );
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  console.log(profileContent, profileContentLoading, error);
  return (
    <View style={styles.container}>
      {profileContentLoading ? (
        <LottieComponent />
      ) : (
        <>
          <BackNavigationBar color={'white'} />
          <CompSearch />
          <FlatList
            data={profileContent.friendList}
            renderItem={({item}) => <FriendList id={item} />}
            contentContainerStyle={{paddingBottom: 50, margin: 12}}
            keyExtractor={item => item.id}
          />
        </>
      )}
    </View>
  );
};

export default AddFriendList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});
