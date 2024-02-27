import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../utils/colors';
import {storage} from '../../utils/storage';
import {useDispatch} from 'react-redux';
import {setIsLogin} from '../../redux/slices/isLoginSlice';
import {fetchProfile} from '../../redux/slices/profileSlice';
import HomeComp from '../../components/home/HomeComp';
import {getStatusBarHeight} from 'react-native-safearea-height';
import {Cog6ToothIcon as Cog6ToothIconOutline} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.secondcontainer}>
        <View style={styles.rowcontainer}>
          <Text style={styles.header}>Ana Sayfa</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingScreen')}>
            <Cog6ToothIconOutline color={colors.white} size={24} />
          </TouchableOpacity>
        </View>

        <HomeComp
          image={require(`../../../assets/product/starbucks.png`)}
          navigate={'GiftScreen'}
        />
        <HomeComp
          image={require(`../../../assets/product/mcdonalds.png`)}
          navigate={'GiftScreen'}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBlue,
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
    marginHorizontal: 16,
  },
});
