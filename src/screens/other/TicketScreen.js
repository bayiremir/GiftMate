import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import BackNavigationBar from '../../components/GoBackNavigation';

const TicketScreen = () => {
  return (
    <View style={styles.container}>
      <BackNavigationBar title={'Biletlerim'} color={colors.white} />
    </View>
  );
};

export default TicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primarycolor,
  },
});
