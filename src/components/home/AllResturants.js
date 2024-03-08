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
import {
  ClockIcon as ClockIconOutline,
  HeartIcon as HeartIconOutline,
} from 'react-native-heroicons/outline';
import {StarIcon as StarIconSolid} from 'react-native-heroicons/solid';

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
        style={styles.restaurantContainer}>
        <Image source={{uri: item.hero_listing_image}} style={styles.image} />
        <View
          style={{
            position: 'absolute',
            top: 12,
            right: 10,
            backgroundColor: colors.white,
            padding: 4,
            borderRadius: 300,
          }}>
          <HeartIconOutline size={16} color={colors.black} />
        </View>
        <View style={styles.infoContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.restaurantTitle}>{item.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <StarIconSolid width={16} height={16} color={'orange'} />
              <Text style={styles.ratingText}>{item.rating}</Text>
              <Text style={styles.reviewText}>({item.review_number}+)</Text>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>₺₺ • </Text>
            <Text style={styles.detailText} numberOfLines={1}>
              {item.minimum_order_amount} TL min.
            </Text>
            {item.characteristics.primary_cuisine && (
              <Text style={styles.cuisineText} numberOfLines={1}>
                • {item.characteristics.primary_cuisine.name}
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
              {item.minimum_delivery_time} min
            </Text>
          </View>
        </View>
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
            horizontal
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
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
  restaurantContainer: {
    width: 250,
    height: 250,
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
});

export default AllResturants;
