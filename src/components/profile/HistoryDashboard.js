import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import {settings} from '../../utils/settings';
import {ArrowUpIcon as ArrowUpIcon} from 'react-native-heroicons/solid';
import {ArrowDownIcon as ArrowDownIcon} from 'react-native-heroicons/solid';

const HistoryDashboard = ({item, type}) => {
  const backgroundColor = type === 'received' ? '#A3C9AA' : '#9B4444';

  return (
    <View style={styles.container}>
      <View style={styles.dashboard}>
        <View
          style={[
            styles.sendcontainer,
            {
              backgroundColor: backgroundColor,
            },
          ]}>
          {type === 'received' ? (
            <ArrowDownIcon size={18} color="black" />
          ) : (
            <ArrowUpIcon size={18} color="black" />
          )}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <Text style={styles.text}>{item.productName}</Text>
          </View>
          {type === 'received' ? (
            <Text style={[styles.text]}>+</Text>
          ) : (
            <Text style={[styles.text]}>-</Text>
          )}
          <Text style={[styles.text, {flex: 1}]}>{item.amount}</Text>
        </View>
      </View>
    </View>
  );
};

export default HistoryDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashboard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    width: settings.WIDTH - 50,
    height: settings.HEIGHT / 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
  },
  sendcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 15,
    marginHorizontal: 15,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
});
