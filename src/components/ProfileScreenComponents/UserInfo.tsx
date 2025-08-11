import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type UserInfoProps = {
  questionCount: number;
  helpCount: number;
};

const UserInfo: React.FC<UserInfoProps> = ({ questionCount, helpCount }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        {questionCount} Soru / {helpCount} Yardım
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
    marginTop: 235,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default UserInfo;
