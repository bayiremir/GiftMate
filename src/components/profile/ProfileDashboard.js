import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {settings} from '../../utils/settings';

const ProfileDashboard = ({balance}) => {
  const floatBalance = parseFloat(balance).toFixed(2);
  return (
    <View>
      <Text style={styles.header}>Gösterge Tablosu</Text>
      <View style={styles.dashboard}>
        <View style={styles.rowContainer}>
          <Image
            source={require('../../../assets/icons/wallet.png')}
            style={styles.icon}
          />
          <View style={styles.verticalLine} />
          <View>
            <View style={styles.infoContainer}>
              <Text style={styles.balanceText}>Cüzdan</Text>
              <Text style={styles.balance}>{floatBalance} ₺</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.balanceText}>Harcama Limiti</Text>
              <Text style={styles.balance}>100 ₺</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileDashboard;

const styles = StyleSheet.create({
  dashboard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: settings.WIDTH - 50,
    height: settings.HEIGHT / 9,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
  },
  header: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 20,
    tintColor: 'rgba(255, 255, 255, 0.7)',
  },
  balanceText: {
    width: 60,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
    marginHorizontal: 16,
  },
  balance: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: 'bold',
  },
  verticalLine: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
