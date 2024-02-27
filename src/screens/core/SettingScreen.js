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
} from 'react-native-heroicons/solid';
import {useSelector} from 'react-redux';

const SettingScreen = () => {
  const {isLogin} = useSelector(state => state.isLoginSlice);

  return (
    <View style={styles.container}>
      <BackNavigationBar title={'Ayarlar'} color={colors.white} />
      <ScrollView>
        <Text style={styles.header}>Profil</Text>
        <SettingComp
          icon={
            <UserIconSolid
              color={colors.darkBlue}
              size={20}
              style={styles.icon}
            />
          }
          title={'Profil'}
          navigate={'AddFriendList'}
        />
        <Text style={styles.header}>Arkadaş Listem</Text>
        <SettingComp
          icon={
            <UserGroupIconSolid
              color={colors.darkBlue}
              size={20}
              style={styles.icon}
            />
          }
          title={'Arkadaşlarım'}
          navigate={'AddFriendList'}
        />
        <SettingComp
          icon={
            <ChatBubbleBottomCenterTextIconSolid
              color={colors.darkBlue}
              size={20}
              style={styles.icon}
            />
          }
          title={'Mesajlarım'}
          navigate={'AddFriendList'}
        />
        {isLogin && (
          <SettingComp
            icon={
              <ArrowDownOnSquareIconSolid
                color={colors.darkBlue}
                size={20}
                style={styles.icon}
              />
            }
            title={'Çıkış'}
            quit={true}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mostdarkBlue,
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
