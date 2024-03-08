import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../utils/colors';
import BackNavigationBar from '../../components/GoBackNavigation';
import {storage} from '../../utils/storage';

const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const favoritesString = await storage.getString('favorites');
      const favoriteCodes = favoritesString ? JSON.parse(favoritesString) : [];
      setFavorites(favoriteCodes);
    };
    loadFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <BackNavigationBar title="Favori Ekranı" color={'white'} />
      <FlatList
        data={favorites}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primarycolor,
  },
  item: {
    backgroundColor: colors.white,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
