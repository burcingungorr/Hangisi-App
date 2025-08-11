import React from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AuthTitle from '../../components/AuthTitle';
import { FormikHelpers } from 'formik';
import RegisterInputForm from '../../components/RegisterScreenComponents/Input';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../components/Logo';

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleRegister = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    try {
      const usernameSnapshot = await firestore()
        .collection('users')
        .where('username', '==', values.username)
        .get();

      if (!usernameSnapshot.empty) {
        Alert.alert('Kayıt Hatası', 'Bu kullanıcı adı zaten kullanılıyor.');
        actions.setSubmitting(false);
        return;
      }

      const userCredential = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );

      await userCredential.user.updateProfile({
        displayName: values.username,
      });

      await firestore().collection('users').doc(userCredential.user.uid).set({
        username: values.username,
        email: values.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Kayıt Başarılı', 'Giriş ekranına yönlendiriliyorsunuz.');
      navigation.navigate('Login');
      actions.resetForm();
      actions.setSubmitting(false);
    } catch (error: any) {
      let message = 'Kayıt sırasında bir hata oluştu';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Bu e-posta zaten kullanılıyor.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Geçersiz e-posta adresi.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Şifre çok zayıf. En az 6 karakter olmalı.';
      }

      Alert.alert('Kayıt Hatası', message);
      actions.setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <AuthTitle title="Hangisi ?" />
      <RegisterInputForm onSubmit={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#ffe1ea',
  },
});

export default RegisterScreen;
