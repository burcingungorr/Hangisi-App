import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const LogOutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      dispatch(logout());
    } catch (error) {
      Alert.alert('Hata', 'Çıkış sırasında bir sorun oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Icon name="logout" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default LogOutButton;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
    right: -20,
    top: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  icon: {},
});
