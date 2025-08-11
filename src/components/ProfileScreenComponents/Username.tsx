import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Username = () => {
  const username = useSelector((state: RootState) => state.auth.username);

  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <Text style={styles.usernameText}>{username}</Text>
      </View>
      <View style={styles.circle}>
        <Icon
          name="account-question"
          size={60}
          color="#D81B60"
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '103%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topHalf: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: '#D81B60',
  },
  circle: {
    position: 'absolute',
    top: 130,
    left: '42%',
    marginLeft: -15,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#333',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  usernameText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 70,
    textAlign: 'center',
  },
});

export default Username;
