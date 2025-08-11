import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginButton from './LoginButton';
import { useNavigation } from '@react-navigation/native';

interface FormValues {
  email: string;
  password: string;
}

interface InputFormProps {
  onSubmit: (values: FormValues, actions: FormikHelpers<FormValues>) => void;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Geçerli bir e-posta giriniz')
    .required('E-posta zorunlu'),
  password: Yup.string()
    .min(6, 'En az 6 karakter olmalı')
    .required('Şifre zorunlu'),
});

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const initialValues: FormValues = { email: '', password: '' };
  const navigation = useNavigation<any>();

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
          {/* E-posta Alanı */}
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

          {/* Şifre Alanı */}
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

          {/* Giriş ve Kayıt Butonları */}
          <LoginButton
            onLogin={() => handleSubmit()}
            onRegister={() => navigation.navigate('Register')}
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

export default InputForm;
