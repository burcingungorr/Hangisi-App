import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import RegisterButton from './RegisterButton';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface FormValues {
  username: string;
  email: string;
  password: string;
}

interface RegisterInputFormProps {
  onSubmit: (values: FormValues, actions: FormikHelpers<FormValues>) => void;
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Kullanıcı adı en az 3 karakter olmalı')
    .required('Kullanıcı adı zorunlu'),
  email: Yup.string()
    .email('Geçerli bir e-posta giriniz')
    .required('E-posta zorunlu'),
  password: Yup.string()
    .min(6, 'Şifre en az 6 karakter olmalı')
    .required('Şifre zorunlu'),
});

const RegisterInputForm: React.FC<RegisterInputFormProps> = ({ onSubmit }) => {
  const navigation = useNavigation<any>();

  const initialValues: FormValues = {
    username: '',
    email: '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View>
          {/* Kullanıcı Adı */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="account-outline"
              size={24}
              color="#D81B60"
              style={styles.icon}
            />
            <TextInput
              placeholder="Kullanıcı Adı"
              style={styles.input}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
          </View>
          {touched.username && errors.username && (
            <Text style={styles.error}>{errors.username}</Text>
          )}

          {/* E-posta */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="#D81B60"
              style={styles.icon}
            />
            <TextInput
              placeholder="E-posta"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
          </View>
          {touched.email && errors.email && (
            <Text style={styles.error}>{errors.email}</Text>
          )}

          {/* Şifre */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color="#D81B60"
              style={styles.icon}
            />
            <TextInput
              placeholder="Şifre"
              style={styles.input}
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
          </View>
          {touched.password && errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}

          {/* Butonlar */}
          <RegisterButton
            onLogin={() => navigation.navigate('Login')}
            onRegister={() => handleSubmit()}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 5,
    paddingHorizontal: 10,
    width: 320,
    height: 60,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  error: {
    color: '#D81B60',
    marginBottom: 8,
    marginLeft: 4,
  },
});

export default RegisterInputForm;
