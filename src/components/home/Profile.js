import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  UserIcon as UserIconSolid,
  Cog6ToothIcon as Cog6ToothIcon,
} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
const Profile = ({item}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Image source={{uri: item?.profilePicture}} style={styles.image} />
        <Text style={styles.text}>{item?.username}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
        <Cog6ToothIcon width={24} height={24} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  secondContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    marginLeft: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
