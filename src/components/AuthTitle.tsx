import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface AuthTitleProps {
  title: string;
}

const AuthTitle: React.FC<AuthTitleProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default AuthTitle;

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D81B60',
  },
});
