import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import LottieComponent from '../../components/lottie/LottieComponent';
import {getStatusBarHeight} from 'react-native-safearea-height';
import {fetchProfile} from '../../redux/slices/profileSlice';
import BackNavigationBar from '../../components/GoBackNavigation';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const {profileContent, profileContentLoading} = useSelector(
    state => state.profileSlice,
  );
  console.log('profileContent', profileContent);
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <BackNavigationBar title={'Profil'} color={colors.white} />
      {profileContentLoading ? <LottieComponent /> : <></>}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBlue,
  },
});
