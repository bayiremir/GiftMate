import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {colors} from '../../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProfile} from '../../redux/slices/profileSlice';
import HomeComp from '../../components/home/HomeComp';
import {getStatusBarHeight} from 'react-native-safearea-height';
import {Cog6ToothIcon as Cog6ToothIconOutline} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import LottieComponent from '../../components/lottie/LottieComponent';
import {fetchAuth} from '../../redux/slices/authSlice';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {profileContentLoading} = useSelector(state => state.profileSlice);
  const {authContent} = useSelector(state => state.authSlice);

  useEffect(() => {
    dispatch(fetchAuth());
    dispatch(fetchProfile());
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchProfile());
    setRefreshing(false);
  }, [dispatch]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}>
      {profileContentLoading ? (
        <LottieComponent />
      ) : (
        <View style={styles.secondcontainer}>
          <View style={styles.rowcontainer}>
            <Image
              source={require('../../../assets/appicon/greenlogo.png')}
              style={{width: 100, height: 50}}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('SettingScreen')}>
              <Cog6ToothIconOutline color={colors.white} size={24} />
            </TouchableOpacity>
          </View>
          <HomeComp
            image={require(`../../../assets/product/starbucks.png`)}
            navigate={'GiftScreen'}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primarycolor,
  },
  secondcontainer: {
    marginTop: getStatusBarHeight(),
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 8,
  },
  rowcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
  },
});
