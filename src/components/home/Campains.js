import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import LottieComponent from '../../components/lottie/LottieComponent';

const Campains = ({item, loading}) => {
  const renderCampains = ({item}) => (
    <View style={styles.imagesContainer}>
      <Image source={{uri: item.image_small}} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <LottieComponent />
      ) : (
        <>
          <Text style={styles.bigTitle}>Kampanyalar</Text>
          <FlatList
            data={item}
            keyExtractor={(item, index) => item + index}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 50, marginLeft: 10}}
            renderItem={renderCampains}
          />
        </>
      )}
    </View>
  );
};

export default Campains;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imagesContainer: {
    flexDirection: 'row',
  },
  bigTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.white,
    margin: 10,
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
});
