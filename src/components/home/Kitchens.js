import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../utils/colors';
import LottieComponent from '../../components/lottie/LottieComponent';

const Kitchens = ({item, loading}) => {
  const renderKitchen = ({item}) => (
    <View style={styles.kitchenContainer}>
      <Image source={{uri: item.image}} style={{width: 50, height: 50}} />
      <Text style={styles.kitchenTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <LottieComponent />
      ) : (
        <View style={styles.content}>
          <Text style={styles.bigTitle}>{item.headline}</Text>
          <FlatList
            data={item.filters}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContentContainer}
            renderItem={renderKitchen}
          />
        </View>
      )}
    </View>
  );
};

export default Kitchens;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
  },
  content: {
    flex: 1,
  },
  bigTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 10,
    marginLeft: 10,
  },
  flatListContentContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  kitchenContainer: {
    width: 120,
    height: 120,
    marginRight: 15,
    backgroundColor: colors.middleGreen,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  kitchenTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
});
