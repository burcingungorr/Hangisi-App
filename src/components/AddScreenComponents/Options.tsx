import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface Props {
  value: string[];
  onChange: (options: string[]) => void;
}

const Options: React.FC<Props> = ({ value, onChange }) => {
  const [input, setInput] = useState('');

  const handleAddOption = () => {
    if (input.trim()) {
      const newOptions = [...value, input.trim()];
      onChange(newOptions);
      setInput('');
    }
  };

  const handleRemoveOption = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Seçenek Ekle</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Seçenek ekle"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddOption}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={value}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.optionRow}>
            <Text style={styles.option}>{item}</Text>
            <TouchableOpacity onPress={() => handleRemoveOption(index)}>
              <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 15 },
  text: {
    fontSize: 16,
    color: '#222',
    marginVertical: 8,
    marginLeft: -8,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    height: 55,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    flex: 1,
    elevation: 2,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
    elevation: 2,
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    elevation: 2,
    marginBottom: 5,
  },
  option: {
    fontSize: 16,
    color: '#222',
    flex: 1,
  },
  removeButtonText: {
    color: '#D81B60',
    fontSize: 25,
    marginLeft: 12,
    fontWeight: 'bold',
  },
});

export default Options;
