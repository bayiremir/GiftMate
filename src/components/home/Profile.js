import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  Cog6ToothIcon as Cog6ToothIconSolid,
  HeartIcon as HeartIconSolid,
} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../utils/colors';
const Profile = ({item}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Text style={styles.text}>{item?.username}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.navigate('FavoriteScreen')}>
          <HeartIconSolid
            style={{
              marginRight: 8,
              borderRadius: 4,
            }}
            color={colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
          <Cog6ToothIconSolid width={24} height={24} color={'white'} />
        </TouchableOpacity>
      </View>
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
    marginVertical: 8,
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
