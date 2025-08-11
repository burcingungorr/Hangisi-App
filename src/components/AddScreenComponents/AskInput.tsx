import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

const AskInput: React.FC<Props> = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sorunu Sor</Text>
      <TextInput
        style={styles.input}
        placeholder="Sorunuzu yazın"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 8 },
  input: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    marginHorizontal: 5,
    marginRight: 10,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    color: '#222',
    marginBottom: 10,
  },
});

export default AskInput;
