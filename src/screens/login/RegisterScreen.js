// Dependencies
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../utils/colors';
import {settings} from '../../utils/settings';
import {
  AtSymbolIcon as AtSymbolIconSolid,
  LockClosedIcon as LockClosedIconSolid,
  ChevronLeftIcon as ChevronLeftIconSolid,
} from 'react-native-heroicons/solid';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRegister} from '../../redux/slices/registerSlice';
import GoBackNavigation from '../../components/GoBackNavigation';
import {getStatusBarHeight} from 'react-native-safearea-height';
import LottieComponent from '../../components/lottie/LottieComponent';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const {registerContentLoading} = useSelector(state => state.registerSlice);

  const handleRegister = () => {
    dispatch(fetchRegister({username, password}));
    if (registerContentLoading) {
      <LottieComponent />;
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer} />
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => navigation.goBack()}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ChevronLeftIconSolid size={24} color={'white'} />
          <Text style={[styles.backtext]}>Geri</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.center}>
        <View style={styles.loginCard}>
          <Text style={styles.text}>Kayıt Ol</Text>
          <View style={styles.keyboardContainer}>
            <View style={styles.input}>
              <AtSymbolIconSolid
                style={styles.icon}
                color={colors.skincolor}
                size={24}
              />
              <TextInput
                style={styles.inputInside}
                placeholder="Username"
                placeholderTextColor={colors.skincolor}
                onChangeText={text => setUsername(text)}
                value={username}
              />
            </View>
            <View style={styles.input}>
              <LockClosedIconSolid
                style={styles.icon}
                color={colors.skincolor}
                size={24}
              />
              <TextInput
                style={styles.inputInside}
                placeholder="Password"
                placeholderTextColor={colors.skincolor}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                value={password}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.textButton}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  goBack: {
    marginTop: getStatusBarHeight(),
    position: 'absolute',
    marginHorizontal: 15,
  },
  logoContainer: {
    backgroundColor: '#35374B',
    width: settings.WIDTH,
    height: settings.HEIGHT / 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    position: 'absolute',
    top: settings.HEIGHT / 6,
    width: settings.WIDTH,
    height: settings.HEIGHT,
    borderTopLeftRadius: 100,
    backgroundColor: colors.mostdarkBlue,
    alignItems: 'center',
  },
  loginCard: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.skincolor,
  },
  keyboardContainer: {
    justifyContent: 'center',
    marginVertical: 20,
  },
  input: {
    flexDirection: 'row',
    borderWidth: 0.25,
    alignItems: 'center',
    borderColor: colors.skincolor,
    width: settings.WIDTH - 40,
    height: settings.HEIGHT / 14,
    borderRadius: 15,
    borderTopRightRadius: 0,
    marginTop: 20,
    color: colors.skincolor,
  },
  inputInside: {
    flex: 1,
    color: colors.skincolor,
  },
  button: {
    height: settings.BUTTON_HEIGHT,
    backgroundColor: '#35374B',
    borderWidth: 0.5,
    borderColor: colors.skincolor,
    borderRadius: 15,
    borderTopRightRadius: 0,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButton: {
    position: 'absolute',
    bottom: 40,
    width: settings.WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: colors.skincolor,
    fontSize: 16,
  },
  textButton: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  icon: {
    marginHorizontal: 10,
  },
  backtext: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
});
