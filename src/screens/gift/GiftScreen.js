import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCoffee} from '../../redux/slices/coffeeSlice';
import CompCoffee from '../../components/coffee/CompCoffee';
import BackNavigationBar from '../../components/GoBackNavigation';
import {colors} from '../../utils/colors';
import LottieComponent from '../../components/lottie/LottieComponent';
import HeaderComp from '../../components/header/HeaderComp';

const GiftScreen = ({header}) => {
  const {coffeeData, coffeeDataLoading} = useSelector(
    state => state.coffeeSlice,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoffee());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <BackNavigationBar color={'white'} shopping={true} />
      <HeaderComp title={header} />
      {coffeeDataLoading ? (
        <LottieComponent />
      ) : (
        <FlatList
          data={coffeeData}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <CompCoffee item={item} />}
          contentContainerStyle={{paddingBottom: 50}}
          keyExtractor={item => item.id}
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
