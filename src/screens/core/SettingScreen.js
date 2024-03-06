import {StyleSheet, View, Text, ScrollView} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import BackNavigationBar from '../../components/GoBackNavigation';
import SettingComp from '../../components/settings/SettingComp';
import {
  UserIcon as UserIconSolid,
  ArrowDownOnSquareIcon as ArrowDownOnSquareIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  ChatBubbleBottomCenterTextIcon as ChatBubbleBottomCenterTextIconSolid,
  GiftIcon as GiftIconSolid,
  TicketIcon as TicketIconSolid,
} from 'react-native-heroicons/solid';

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <BackNavigationBar title={'Ayarlar'} color={colors.white} />
      <ScrollView>
        <Text style={styles.header}>Profil</Text>
        <SettingComp
          icon={
            <UserIconSolid color={colors.white} size={20} style={styles.icon} />
          }
          title={'Profil'}
          navigate={'ProfileScreen'}
        />
        <Text style={styles.header}>Arkadaş Listem</Text>

        <SettingComp
          icon={
            <UserGroupIconSolid
              color={colors.white}
              size={20}
              style={styles.icon}
            />
          }
          title={'Arkadaşlarım'}
          navigate={'MyFriendList'}
        />
        <SettingComp
          icon={
            <ChatBubbleBottomCenterTextIconSolid
              color={colors.white}
              size={20}
              style={styles.icon}
            />
          }
          title={'Mesajlarım'}
          navigate={'MessageScreen'}
        />
        <Text style={styles.header}>Hediye</Text>
        <SettingComp
          icon={
            <GiftIconSolid color={colors.white} size={20} style={styles.icon} />
          }
          title={'Hediyelerim'}
          navigate={'InventoryGift'}
        />
        <Text style={styles.header}>Kupon</Text>
        <SettingComp
          icon={
            <TicketIconSolid
              color={colors.white}
              size={20}
              style={styles.icon}
            />
          }
          title={'Kuponlarım'}
          navigate={'TicketScreen'}
        />
        <Text style={styles.header}>Çıkış</Text>
        <SettingComp
          icon={
            <ArrowDownOnSquareIconSolid
              color={colors.white}
              size={20}
              style={styles.icon}
            />
          }
          title={'Çıkış'}
          quit={true}
        />
      </ScrollView>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primarycolor,
  },
  icon: {
    marginRight: 8,
  },
  header: {
    marginVertical: 8,
    marginHorizontal: 12,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});
