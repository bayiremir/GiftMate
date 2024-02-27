import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import LottieComponent from '../../components/lottie/LottieComponent';
import {getStatusBarHeight} from 'react-native-safearea-height';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {profileContentLoading ? (
        <LottieComponent />
      ) : (
        <View style={styles.lowcontainer}>
          <Text>
            {profileContent?.name} {profileContent?.surname}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBlue,
  },
  lowcontainer: {
    marginTop: getStatusBarHeight(),
  },
});
