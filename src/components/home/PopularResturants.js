import React, {useEffect, useState} from 'react';
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
import {StarIcon as StarIconSolid} from 'react-native-heroicons/solid';
import {
  ClockIcon as ClockIconOutline,
  HeartIcon as HeartIconOutline,
} from 'react-native-heroicons/outline';
import {HeartIcon as HeartIconSolid} from 'react-native-heroicons/solid';
import {useDispatch} from 'react-redux';
import {storage} from '../../utils/storage';
import {
  addFavorite,
  removeFavorite,
  setFavorite,
} from '../../redux/slices/favoriteSlice';

const PopularRestaurants = ({item, loading}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const favoritesString = await storage.getString('favorites');
      const favoriteCodes = favoritesString ? JSON.parse(favoritesString) : [];
      setFavorites(favoriteCodes);
    };
    loadFavorites();
  }, []);

  const handleFavorite = async vendor => {
    const isFavorite = favorites.includes(vendor.code);
    let updatedFavorites = isFavorite
      ? favorites.filter(code => code !== vendor.code)
      : [...favorites, vendor.code];

    // Correctly use JSON.stringify to serialize the array into a string
    await storage.set('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);

    // Dispatch Redux actions
    isFavorite
      ? dispatch(removeFavorite(vendor.code))
      : dispatch(addFavorite(vendor.code));
  };
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
      <TouchableOpacity
        style={styles.heartIcon}
        onPress={() => handleFavorite(item.vendor)}>
        {favorites.includes(item.vendor.code) ? (
          <HeartIconSolid size={16} color={colors.yemekred} />
        ) : (
          <HeartIconOutline size={16} color={colors.black} />
        )}
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.restaurantTitle}>{item.vendor.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <StarIconSolid width={16} height={16} color={'orange'} />
            <Text style={styles.ratingText}>{item.vendor.rating}</Text>
            <Text style={styles.reviewText}>
              ({item.vendor.review_number}+)
            </Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>₺₺ • </Text>
          <Text style={styles.detailText} numberOfLines={1}>
            {item.vendor.minimum_order_amount} TL min.
          </Text>
          {item.vendor.characteristics.primary_cuisine && (
            <Text style={styles.cuisineText} numberOfLines={1}>
              • {item.vendor.characteristics.primary_cuisine.name}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 5,
          }}>
          <ClockIconOutline
            style={{marginRight: 5}}
            width={16}
            height={16}
            color={'white'}
          />
          <Text style={styles.cuisineText}>
            {item.vendor.minimum_delivery_time} min
          </Text>
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
    flex: 1,
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
    width: 250,
    height: 220,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.4,
    borderColor: 'white',
  },
  image: {
    height: 120,
    width: '100%',
  },
  infoContainer: {
    padding: 10,
  },
  restaurantTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  ratingContainer: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
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
  heartIcon: {
    position: 'absolute',
    top: 12,
    right: 10,
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: 300,
    zIndex: 1,
  },
});

export default PopularRestaurants;
