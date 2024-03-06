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

const PopularRestaurants = ({item, loading}) => {
  const navigation = useNavigation();

  const renderRestaurant = ({item}) => (
    <TouchableOpacity
      style={styles.restaurantContainer}
      onPress={() =>
        navigation.navigate('GiftScreen', {
          brand: item.vendor.code,
          name: item.vendor.name,
        })
      }>
      <Image
        source={{uri: item.vendor.hero_listing_image}}
        style={styles.image}
      />
      {item.vendor.tag !== 'NEXTGEN_SUPER_VENDOR' && (
        <View
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: colors.yemekred,
            padding: 5,
            borderRadius: 5,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            {item.vendor.tag}
          </Text>
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.restaurantTitle} numberOfLines={1}>
          {item.vendor.name}
        </Text>
        <View style={styles.ratingContainer}>
          <StarIcon width={16} height={16} color={'orange'} />
          <Text style={styles.ratingText}>{item.vendor.rating}</Text>
          <Text style={styles.reviewText}>({item.vendor.review_number}+)</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText} numberOfLines={1}>
            {item.vendor.minimum_order_amount} TL min.
          </Text>
          {item.vendor.characteristics.primary_cuisine && (
            <Text style={styles.cuisineText} numberOfLines={1}>
              * {item.vendor.characteristics.primary_cuisine.name}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <LottieComponent />
      ) : (
        <View style={styles.content}>
          <Text style={styles.bigTitle}>{item.headline}</Text>
          <FlatList
            data={item.vendors}
            keyExtractor={item => item.vendor.id.toString()}
            horizontal={true}
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
    width: '100%',
    shadowColor: 'black ',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bigTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.white,
    margin: 10,
  },
  flatListContentContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  restaurantContainer: {
    width: 200,

    marginRight: 15,
    backgroundColor: colors.middleGreen,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: 120,
    width: '100%',
  },
  infoContainer: {
    padding: 10,
  },
  restaurantTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  detailText: {
    color: 'white',
    fontSize: 14,
    marginRight: 5,
  },
  cuisineText: {
    color: 'white',
    fontSize: 14,
  },
});

export default PopularRestaurants;
