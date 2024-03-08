// ToppingsModal.js

import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

const ToppingsModal = ({visible, onClose, toppings}) => {
  const [selectedToppings, setSelectedToppings] = useState([]);

  const handleSelectTopping = topping => {
    if (selectedToppings.includes(topping.id)) {
      setSelectedToppings(currentSelectedToppings =>
        currentSelectedToppings.filter(id => id !== topping.id),
      );
    } else if (selectedToppings.length < 3) {
      setSelectedToppings(currentSelectedToppings => [
        ...currentSelectedToppings,
        topping.id,
      ]);
    }
  };

  const handleConfirm = () => {
    console.log('Selected Toppings: ', selectedToppings);
    onClose();
  };

  const renderItem = ({item}) => (
    console.log('item', item),
    (
      <TouchableOpacity
        style={[
          styles.toppingItem,
          selectedToppings.includes(item.id) && styles.selectedItem,
        ]}
        onPress={() => handleSelectTopping(item)}>
        <Text style={styles.toppingText}>{item.description}</Text>
      </TouchableOpacity>
    )
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Choose Your Toppings (up to 3)</Text>
        <FlatList
          data={toppings}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Selections</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toppingItem: {
    padding: 10,
    backgroundColor: '#ddd',
    marginVertical: 2,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: 'green',
  },
  toppingText: {
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: 'red',
    padding: 10,
    margin: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  selectedText: {
    color: 'green',
    fontWeight: 'bold',
  },
});

export default ToppingsModal;
