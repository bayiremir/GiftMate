// Inside CartScreen component
import React, {useState} from 'react';
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
import CompCoffee from '../../components/coffee/CompCoffee';
import BackNavigationBar from '../../components/GoBackNavigation';
import {colors} from '../../utils/colors';
import HeaderComp from '../../components/header/HeaderComp';
import {fetchSendGift} from '../../redux/slices/sendGiftSlice';

const CartScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cartSlice.items);
  const {profileContent} = useSelector(state => state.profileSlice);
  const friendList = profileContent?.friendList;

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
              {friendList
                ? `Arkadaşlarınızdan birine hediye göndermek ister misiniz?`
                : `Arkadaş listenizde kimse bulunmamaktadır.`}
            </Text>
            <FlatList
              data={friendList}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      fetchSendGift({
                        productId: cartItems[0]?._id,
                        giftReceiverId: item,
                        amount: cartItems[0]?.price,
                      }),
                      console.log('item', item, cartItems._id, cartItems.price),
                    );
                    setModalVisible(false);
                  }}>
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {modalVisible && handleCart()}
      <BackNavigationBar color={'white'} shopping={false} />
      <HeaderComp header={'Sepetim'} />
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => item + index}
        contentContainerStyle={{paddingBottom: 50}}
        renderItem={({item}) => <CompCoffee item={item} remove={true} />}
      />
      {cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.text}>Siparişi Tamamla</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.darkBlue,
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
