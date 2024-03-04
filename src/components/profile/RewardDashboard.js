import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const RewardDashboard = () => {
  return (
    <View style={styles.bigContainer}>
      <View style={styles.seeAllContainer}>
        <Text style={styles.header}>Ödül ve İndirimler</Text>
        <TouchableOpacity
          style={{borderBottomWidth: 0.3, borderBottomColor: 'white'}}>
          <Text
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 12,
              fontWeight: '500',
            }}>
            Tümünü Gör
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.scrollviewcontainer}>
        <TouchableOpacity style={styles.container}>
          <Image
            source={require('../../../assets/icons/award.png')}
            style={styles.icon}
          />
          <Text style={styles.text}>Elde Edilen Başarılar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <Image
            source={require('../../../assets/icons/discount.png')}
            style={styles.icon}
          />
          <Text style={styles.text}>30'a Varan İndirimler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <Image
            source={require('../../../assets/icons/medal.png')}
            style={styles.icon}
          />
          <Text style={styles.text}>Ödüller</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default RewardDashboard;

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    marginVertical: 8,
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
  header: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  container: {
    alignItems: 'center',
    width: 150,
    height: 200,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 10,
  },
  scrollviewcontainer: {
    marginHorizontal: 15,
  },
  icon: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
    marginVertical: 35,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
