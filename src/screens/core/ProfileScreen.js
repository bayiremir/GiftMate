import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProfile} from '../../redux/slices/profileSlice';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const {profileContent, profileContentLoading, error} = useSelector(
    state => state.profileSlice,
  );

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  console.log('profileContent', profileContent);
  return (
    <View style={styles.container}>
      {profileContentLoading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : (
        <Text style={styles.text}>{profileContent?.balance}</Text>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
  },
  text: {
    color: colors.skincolor,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
});
