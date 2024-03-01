import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
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
  console.log('received', received);
  console.log('mySendGift', mySendGift);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchReceiverGifts());
    dispatch(fetchMySendGift());
  }, [dispatch]);

  const combinedGifts = [
    ...received?.map(item => ({...item, type: 'received'})),
    ...mySendGift?.map(item => ({...item, type: 'sent'})),
  ];

  const renderHeader = () => (
    <View style={{}}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={{
            uri: 'https://cdn.evrimagaci.org/q0-4ffcpiHlsmEHyfYCcYQBWPNg=/storage.evrimagaci.org%2Fold%2Fmi_media%2Fafcae823e61eefb077e1f223594b1e7f.jpeg',
          }}
          style={styles.image}
        />
        <Text style={styles.username}>{profileContent?.username}</Text>
        <ProfileDashboard balance={profileContent.balance} />
        <RewardDashboard />
      </View>
      <Text style={styles.header}>History</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <BackNavigationBar title={'My Profile'} color={colors.white} />
      {profileContentLoading && mySendGiftLoading && receivedLoading ? (
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
