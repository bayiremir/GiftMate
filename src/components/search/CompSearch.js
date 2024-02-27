import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../utils/colors';
import {MagnifyingGlassIcon as MagnifyingGlassIconSolid} from 'react-native-heroicons/solid';

const CompSearch = () => {
  const [search, setSearch] = useState('');
  return (
    <View style={styles.container}>
      <MagnifyingGlassIconSolid
        style={styles.icon}
        name="search"
        size={24}
        color="black"
      />
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        placeholder="Arkadaşını ara..."
        placeholderTextColor="black"
      />
    </View>
  );
};

export default CompSearch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.skincolor,
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 15,
  },
  input: {
    flex: 1,
    borderRadius: 10,
    color: 'black',
  },
  icon: {
    marginRight: 5,
  },
});
