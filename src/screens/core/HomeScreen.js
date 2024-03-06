import React, {useEffect} from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../utils/colors';
import {fetchResturantData} from '../../redux/slices/products/resturantSlice';
import {useDispatch, useSelector} from 'react-redux';
import Campains from '../../components/home/Campains';
import PopularResturants from '../../components/home/PopularResturants';
import AllResturants from '../../components/home/AllResturants';
import {getStatusBarHeight} from 'react-native-safearea-height';
import LottieComponent from '../../components/lottie/LottieComponent';
import Profile from '../../components/home/Profile';
import {fetchProfile} from '../../redux/slices/profileSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {resturantData, resturantDataLoading} = useSelector(
    state => state.resturantSlice,
  );
  const {profileContent, profileContentLoading} = useSelector(
    state => state.profileSlice,
  );

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchResturantData());
  }, [dispatch]);

  const renderItem = ({item, section}) => {
    switch (section.type) {
      case 'campaigns':
        return <Campains item={item} loading={resturantDataLoading} />;
      case 'popular':
        return <PopularResturants item={item} loading={resturantDataLoading} />;
      case 'all':
        return <AllResturants item={item} loading={resturantDataLoading} />;
      default:
        return null;
    }
  };

  const campaignsData = resturantData?.[0]?.data?.rlp?.carousels?.data[0]
    ?.campaigns
    ? [resturantData[0].data.rlp.carousels.data[0].campaigns]
    : [];
  const popularData = resturantData?.[0]?.data?.rlp?.swimlanes?.data?.items[4]
    ? [resturantData[0].data.rlp.swimlanes.data.items[4]]
    : [];
  const allData = resturantData?.[0]?.data?.rlp?.organic_listing?.views[0]
    ?.items
    ? [resturantData[0].data.rlp.organic_listing.views[0].items]
    : [];

  const sections = [
    {
      data: campaignsData,
      type: 'campaigns',
    },
    {
      data: popularData,
      type: 'popular',
    },
    {
      data: allData,
      type: 'all',
    },
  ];

  return (
    <View style={styles.container}>
      {resturantDataLoading && !resturantData ? (
        <LottieComponent />
      ) : (
        <View style={styles.bigContainer}>
          <Profile item={profileContent} />
          <SectionList
            sections={sections}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            contentContainerStyle={styles.sectionListContent}
          />
        </View>
      )}
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primarycolor,
  },
  bigContainer: {
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
});
