import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface LoginButtonProps {
  onLogin: () => void;
  onRegister: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onLogin, onRegister }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.registerbutton}
        onPress={onRegister}
        activeOpacity={0.8}
      >
        <Text style={styles.text}>Kayıt Ol</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={onLogin}
        activeOpacity={0.8}
      >
        <Text style={styles.text}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#ff3366',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
  },
  registerbutton: {
    backgroundColor: '#A7C7E7',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginButton;
