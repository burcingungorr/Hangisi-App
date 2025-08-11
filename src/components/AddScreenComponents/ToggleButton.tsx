import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Props {
  value: boolean;
  onToggle: (val: boolean) => void;
}

const ToggleButton: React.FC<Props> = ({ value, onToggle }) => {
  const username = useSelector((state: RootState) => state.auth.username);

  return (
    <View style={styles.container}>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#ccc', true: '#A7C7E7' }}
        thumbColor={value ? '#1976D2' : '#888'}
        style={styles.switch}
      />
      <Text style={styles.text}>{value ? 'Anonim' : `${username}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 15,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    marginHorizontal: 12,
    marginTop: 12,
    paddingVertical: 15,
  },
  switch: {
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },
  text: {
    fontSize: 17,
    color: 'black',
  },
});

export default ToggleButton;
