import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import BackNavigationBar from '../../components/GoBackNavigation';
import {colors} from '../../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import {fetchInventory} from '../../redux/slices/giftSlice';
import LottieComponent from '../../components/lottie/LottieComponent';
import {fetchReceiverGifts} from '../../redux/slices/receiverGiftSlice';
import {fetchMySendGift} from '../../redux/slices/mySendGiftSlice';

const InventoryGift = () => {
  const {inventoryLoading} = useSelector(state => state.giftSlice);
  const {received} = useSelector(state => state.receiverGiftSlice);
  const {mySendGift} = useSelector(state => state.mySendGiftSlice);
  const [selectedTab, setSelectedTab] = useState('received');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInventory());
    dispatch(fetchReceiverGifts());
    dispatch(fetchMySendGift());
  }, []);

  const fixDate = date => {
    const newDate = new Date(date);
    return (
      ` ${newDate.getHours()}:${newDate.getMinutes()}` +
      ' ' +
      newDate.getDate() +
      '/' +
      (newDate.getMonth() + 1) +
      '/' +
      newDate.getFullYear()
    );
  };
  return (
    <View style={styles.container}>
      <BackNavigationBar color={'white'} title={'Hediyelerim'} />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'received' && styles.tabSelected]}
          onPress={() => setSelectedTab('received')}>
          <Text style={styles.tabText}>Alınan Hediyeler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'sent' && styles.tabSelected]}
          onPress={() => setSelectedTab('sent')}>
          <Text style={styles.tabText}>Gönderilen Hediyeler</Text>
        </TouchableOpacity>
      </View>
      {inventoryLoading ? (
        <LottieComponent />
      ) : (
        <FlatList
          data={selectedTab === 'received' ? received : mySendGift}
          keyExtractor={(item, index) => `${selectedTab}-${index}`}
          renderItem={({item}) => (
            <View style={styles.bigContainer}>
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.productName}</Text>
                <Text style={styles.itemText}>{item.amount} TL</Text>
              </View>
              <Text style={[styles.itemText, {fontSize: 10}]}>
                {fixDate(item.createdAt)}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default InventoryGift;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  tab: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.lightBlue,
    borderRadius: 10,
  },
  tabSelected: {
    backgroundColor: colors.lightBlue,
  },
  tabText: {
    color: colors.skincolor,
  },
  bigContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBlue,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    color: colors.skincolor,
  },
});
