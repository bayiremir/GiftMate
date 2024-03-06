import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../utils/colors';
import LottieComponent from '../../components/lottie/LottieComponent';
import {useNavigation} from '@react-navigation/native';
import {StarIcon} from 'react-native-heroicons/solid';
import {getStatusBarHeight} from 'react-native-safearea-height';

const AllResturants = ({item, loading}) => {
  const navigation = useNavigation();

  const renderRestaurant = ({item}) => (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('GiftScreen', {
            brand: item.code,
            name: item.name,
          })
        }
        style={styles.resturantContainer}>
        <Image
          source={{uri: item.hero_listing_image}}
          style={styles.resturantImage}
        />
        <Text style={styles.resturantName}>{item.name}</Text>
        <Text style={styles.resturantInfo}>
          Rating: {item.rating} ({item.review_number} reviews)
        </Text>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <LottieComponent />
      ) : (
        <View style={styles.content}>
          <Text style={styles.bigTitle}>Tüm Restoranlar</Text>
          <FlatList
            data={item}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContentContainer}
            renderItem={renderRestaurant}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowcontainer: {
    marginTop: getStatusBarHeight() - 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resturantContainer: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 16,
    backgroundColor: colors.middleGreen,
    borderRadius: 8,
    margin: 10,
  },
  resturantImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  resturantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 8,
  },
  resturantInfo: {
    fontSize: 14,
    color: colors.white,
    marginTop: 4,
  },
  title: {
    flex: 1,
    color: colors.white,
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  bigTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.white,
    margin: 10,
  },
});

export default AllResturants;
