import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAuth} from '../../redux/slices/authSlice';
import {colors} from '../../utils/colors';
import {getStatusBarHeight} from 'react-native-safearea-height';
import {settings} from '../../utils/settings';
import {storage} from '../../utils/storage';
import {useNavigation} from '@react-navigation/native';
import {
  LockClosedIcon as LockClosedIconOutline,
  KeyIcon as KeyIconOutline,
  EyeIcon as EyeIconOutline,
} from 'react-native-heroicons/outline';
import {EyeIcon as EyeIconSolid} from 'react-native-heroicons/solid';
import {setIsLogin} from '../../redux/slices/isLoginSlice';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {authContent, authContentLoading, error} = useSelector(
    state => state.authSlice,
  );
  console.log(error);

  const handleLogin = () => {
    dispatch(fetchAuth({username, password}));
    storage.set('isLogin', true);
    dispatch(setIsLogin(true));
    console.log('Login Success', authContent);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer} />
      <View style={styles.center}>
        <View style={{marginTop: getStatusBarHeight()}}>
          <Text style={styles.text}>Giriş Yap</Text>
          <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior="padding">
            <View style={styles.input}>
              <LockClosedIconOutline
                style={styles.icon}
                color={colors.lightOrange}
                size={24}
              />
              <TextInput
                style={styles.inputInside}
                onChangeText={text => setUsername(text)}
                value={username}
                placeholder="Kullanıcı Adı"
                placeholderTextColor={colors.lightOrange}
              />
            </View>
            <View style={styles.input}>
              <KeyIconOutline
                style={styles.icon}
                color={colors.lightOrange}
                size={24}
              />
              <TextInput
                style={styles.inputInside}
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder="Şifre"
                placeholderTextColor={colors.lightOrange}
                secureTextEntry
              />
              {showPassword ? (
                <TouchableOpacity onPress={handleShowPassword}>
                  <EyeIconOutline
                    style={styles.icon}
                    color={colors.lightOrange}
                    size={24}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleShowPassword}>
                  <EyeIconSolid
                    style={styles.icon}
                    color={colors.lightOrange}
                    size={24}
                  />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.textButton}>Giriş Yap</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('RegisterScreen')}
        style={styles.registerButton}>
        <Text style={styles.registerText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    backgroundColor: '#35374B',
    width: settings.WIDTH,
    height: settings.HEIGHT / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    position: 'absolute',
    top: settings.HEIGHT / 3.5,
    width: settings.WIDTH,
    height: settings.HEIGHT,
    borderTopLeftRadius: 100,
    backgroundColor: colors.mostdarkBlue,
    alignItems: 'center',
  },
  loginCard: {
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
});
