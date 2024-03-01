import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCoffee} from '../../redux/slices/coffeeSlice';
import CompCoffee from '../../components/coffee/CompCoffee';
import BackNavigationBar from '../../components/GoBackNavigation';
import {colors} from '../../utils/colors';
import LottieComponent from '../../components/lottie/LottieComponent';
import HorizontalScroll from '../../components/scrollcomp/HorizontalScroll';

const GiftScreen = ({navigate}) => {
  const {coffeeData, coffeeDataLoading} = useSelector(
    state => state.coffeeSlice,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoffee());
  }, [dispatch]);

  const renderHeader = () => {
    return (
      <HorizontalScroll
        title1={'Kahve'}
        title2={'Blender'}
        title3={'Chairs'}
        length={coffeeData.length}
      />
    );
  };

  return (
    <View style={styles.container}>
      <BackNavigationBar title={'Kahve'} color={'white'} shopping={true} />
      {coffeeDataLoading ? (
        <LottieComponent />
      ) : (
        <FlatList
          data={coffeeData}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <CompCoffee item={item} />}
          contentContainerStyle={{paddingBottom: 50}}
          keyExtractor={item => item.id}
          numColumns={2}
          ListHeaderComponent={renderHeader}
        />
      )}
    </View>
  );
};

export default GiftScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});
