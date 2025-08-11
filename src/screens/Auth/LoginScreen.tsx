import React from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import AuthTitle from '../../components/AuthTitle';
import { FormikHelpers } from 'formik';
import InputForm from '../../components/LoginScreenComponents/Input';
import Logo from '../../components/Logo';

interface FormValues {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogin = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        values.email,
        values.password,
      );

      const user = userCredential.user;

      dispatch(
        loginSuccess({
          isLoggedIn: true,
          email: user.email,
          username: user.displayName ?? '',
          uid: user.uid,
        }),
      );

      actions.setSubmitting(false);
    } catch (error: any) {
      let message = 'Giriş sırasında bir hata oluştu.';
      if (error.code === 'auth/user-not-found') {
        message = 'Kullanıcı bulunamadı.';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Şifre yanlış.';
      }

      Alert.alert('Hata', message);
      actions.setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <AuthTitle title="Hangisi ?" />
      <InputForm onSubmit={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffe1ea',
    paddingTop: 50,
  },
});

export default LoginScreen;
