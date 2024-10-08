import {
  StyleSheet,
  View,
  Image,
  Text,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import LottieComponent from '../../components/lottie/LottieComponent';
import {fetchProfile} from '../../redux/slices/profileSlice';
import BackNavigationBar from '../../components/GoBackNavigation';
import ProfileDashboard from '../../components/profile/ProfileDashboard';
import RewardDashboard from '../../components/profile/RewardDashboard';
import HistoryDashboard from '../../components/profile/HistoryDashboard';
import {fetchMySendGift} from '../../redux/slices/mySendGiftSlice';
import {fetchReceiverGifts} from '../../redux/slices/receiverGiftSlice';
import {fetchProfilePhoto} from '../../redux/slices/uploadPictureSlice';
import {launchImageLibrary} from 'react-native-image-picker';
import {storage} from '../../utils/storage';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const {received, receivedLoading} = useSelector(
    state => state.receiverGiftSlice,
  );
  const {mySendGift, mySendGiftLoading} = useSelector(
    state => state.mySendGiftSlice,
  );
  const {profileContent, profileContentLoading} = useSelector(
    state => state.profileSlice,
  );

  const {photoUrl, uploading} = useSelector(state => state.uploadPictureSlice);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchReceiverGifts());
    dispatch(fetchMySendGift());
  }, [dispatch]);

  const combinedGifts = [
    ...(received ?? []).map(item => ({...item, type: 'received'})),
    ...(mySendGift ?? []).map(item => ({...item, type: 'sent'})),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const renderHeader = () => (
    <View style={{}}>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={null}>
          <Image
            source={{
              uri: 'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg',
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.username}>{profileContent?.username}</Text>
        <ProfileDashboard balance={profileContent.balance} />
        <RewardDashboard />
      </View>
      <Text style={styles.header}>Geçmiş Ödemeler</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <BackNavigationBar title={'My Profile'} color={colors.white} />
      {profileContentLoading || mySendGiftLoading || receivedLoading ? (
        <LottieComponent />
      ) : (
        <FlatList
          ListHeaderComponent={renderHeader}
          data={combinedGifts}
          renderItem={({item}) => (
            <HistoryDashboard item={item} type={item.type} />
          )}
          keyExtractor={item => item._id}
          contentContainerStyle={{paddingBottom: 40}}
          refreshControl={
            <RefreshControl
              refreshing={profileContentLoading}
              onRefresh={() => {
                dispatch(fetchProfile());
                dispatch(fetchReceiverGifts());
                dispatch(fetchMySendGift());
              }}
            />
          }
        />
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primarycolor,
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    marginTop: 15,
  },
  header: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 8,
    marginHorizontal: 30,
  },
});
