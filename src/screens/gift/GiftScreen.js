import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import BackNavigationBar from '../../components/GoBackNavigation';
import LottieComponent from '../../components/lottie/LottieComponent';
import {colors} from '../../utils/colors';
import {addItem} from '../../redux/slices/cartSlice';
import {PlusCircleIcon} from 'react-native-heroicons/solid';
import {useRoute} from '@react-navigation/native';
import {fetchBrandData} from '../../redux/slices/products/brandSlice';
import HorizontalScroll from '../../components/scrollcomp/HorizontalScroll';
import ToppingsModal from './ToppingModal';

const GiftScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const productScrollViewRef = useRef(null);
  const {brand, name} = route.params;
  const {brandData, brandDataLoading, error} = useSelector(
    state => state.brandSlice,
  );
  const [isToppingsModalVisible, setToppingsModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    if (brand) {
      dispatch(fetchBrandData(brand));
    }
  }, [dispatch, brand]);

  const addCart = item => {
    dispatch(addItem(item));
  };

  const scrollToCategory = index => {
    productScrollViewRef.current?.scrollToIndex({index, animated: true});
  };

  const renderHeader = () => {
    const menuCategories = brandData.data?.menus[0]?.menu_categories || [];
    return (
      <HorizontalScroll
        categories={menuCategories}
        onPressCategory={index => scrollToCategory(index)}
      />
    );
  };

  const renderProductItem = ({item}) => (
    <TouchableOpacity
      onPress={() => openToppingsModal(item)}
      style={styles.item}>
      <View style={{flex: 1, marginHorizontal: 15}}>
        <Text style={styles.title}>{item.name}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
        <Text
          style={[
            styles.description,
            {marginVertical: 10, fontWeight: 'bold'},
          ]}>
          {parseFloat(item.product_variations[0].price).toFixed(2)} TL
        </Text>
      </View>
      <Image
        source={{
          uri: item.file_path || 'https://via.placeholder.com/150',
        }}
        style={styles.image}
      />
      <TouchableOpacity style={styles.plus} onPress={() => addCart(item)}>
        <PlusCircleIcon color={colors.darkGreen} size={30} />
      </TouchableOpacity>
      <ToppingsModal
        visible={isToppingsModalVisible}
        onClose={() => setToppingsModalVisible(false)}
        toppings={brandData.data?.menus[0]?.toppings || []}
      />
    </TouchableOpacity>
  );

  const renderCategoryItem = ({item: category}) => (
    <View>
      <Text style={styles.categoryTitle}>{category.name}</Text>
      <View style={styles.categoryContainer}>
        <FlatList
          data={category.products}
          keyExtractor={item => item.id.toString()}
          renderItem={renderProductItem}
        />
      </View>
    </View>
  );

  const openToppingsModal = item => {
    const toppingsForModal = brandData.data?.menus[0]?.toppings || [];

    setCurrentItem({...item, toppings: toppingsForModal});
    setToppingsModalVisible(true);
  };
  return (
    <View style={styles.container}>
      {brandDataLoading ? (
        <LottieComponent />
      ) : brandData ? (
        <>
          <BackNavigationBar
            color={'white'}
            title={name.charAt(0).toUpperCase() + name.slice(1)}
            shopping={true}
            minimum_order_amount={brandData?.data?.minimum_order_amount}
          />
          <FlatList
            ref={productScrollViewRef}
            data={brandData.data?.menus[0]?.menu_categories || []}
            keyExtractor={item => item.id.toString()}
            renderItem={renderCategoryItem}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={{paddingBottom: 20}}
          />
        </>
      ) : (
        <Text>Veri yüklenemedi veya beklenen yapıda değil.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primarycolor,
  },
  categoryContainer: {
    flex: 1,
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  item: {
    width: Dimensions.get('window').width - 32,
    height: 150,
    borderWidth: 0.2,
    borderColor: colors.white,
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.primarycolor,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  plus: {
    position: 'absolute',
    right: 10,
    bottom: 15,
    padding: 10,
  },
  description: {
    fontSize: 12,
    color: colors.white,
  },
});

export default GiftScreen;
