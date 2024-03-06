// Inside CartScreen component
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import BackNavigationBar from '../../components/GoBackNavigation';
import {colors} from '../../utils/colors';
import {fetchSendGift} from '../../redux/slices/sendGiftSlice';
import CompCart from '../../components/cart/CompCart';
import LottieComponent from '../../components/lottie/LottieComponent';
import {fetchFriends} from '../../redux/slices/myFriendSlice';
import {fetchCartItems, removeItem} from '../../redux/slices/cartSlice';
import {useRoute} from '@react-navigation/native';

const CartScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cartSlice.items);
  const {friendsContent} = useSelector(state => state.myFriendSlice);
  const {giftContentLoading} = useSelector(state => state.sendGiftSlice);
  const route = useRoute();
  const minOrder = route.params;
  console.log('minOrder', minOrder);

  useEffect(() => {
    dispatch(fetchFriends());
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleCart = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(false);
      }}>
      <TouchableWithoutFeedback
        style={styles.centeredView}
        onPress={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {friendsContent.friends.length > 0
                ? `Arkadaşlarınızdan birine hediye göndermek ister misiniz?`
                : `Arkadaş listenizde kimse bulunmamaktadır.`}
            </Text>
            <FlatList
              data={friendsContent.friends}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      fetchSendGift({
                        productName: cartItems[0]?.name,
                        giftReceiverId: item,
                        amount: totalPrice,
                      }),
                    );
                    setModalVisible(false);
                    dispatch(removeItem(cartItems[0]));
                  }}>
                  <Text style={styles.modalText}>{item.username}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  useEffect(() => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.product_variations?.[0]?.price || 0;
    });
    setTotalPrice(total);
  }, [cartItems]);

  return (
    <View style={styles.container}>
      {modalVisible && handleCart()}
      <BackNavigationBar title={'Sepetim'} color={'white'} shopping={false} />
      {giftContentLoading ? (
        <LottieComponent />
      ) : (
        <>
          <FlatList
            data={cartItems}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
            numColumns={2}
            contentContainerStyle={{paddingBottom: 100}}
            renderItem={({item}) => <CompCart item={item} remove={true} />}
          />
          {minOrder.minOrder > totalPrice ? (
            <View
              style={{
                backgroundColor: 'darkorange',
                width: '100%',
                padding: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.modalText}>
                {`Hediye göndermek için minimum ${minOrder.minOrder} TL tutarında alışveriş yapmalısınız.`}
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.text}>
                {`Toplam: ${parseFloat(totalPrice).toFixed(2)} TL`}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primarycolor,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.lightBlue,
    width: Dimensions.get('window').width,
    padding: 10,
  },
  text: {
    color: colors.skincolor,
    textAlign: 'center',
    padding: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.darkBlue,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: colors.skincolor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: colors.skincolor,
  },
});
