import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

type FilterProps = {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  showOnlyUncompleted: boolean;
  onToggleUncompleted: (value: boolean) => void;
};

const categories = [
  'Hepsi',
  'Yemek',
  'Moda',
  'Sosyal',
  'İlişki',
  'Kariyer',
  'Günlük Yaşam',
];

const Filter: React.FC<FilterProps> = ({
  selectedCategory,
  onSelectCategory,
  showOnlyUncompleted,
  onToggleUncompleted,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            onPress={() => onSelectCategory(cat === 'Hepsi' ? null : cat)}
            style={[
              styles.button,
              selectedCategory === cat || (cat === 'Hepsi' && !selectedCategory)
                ? styles.selected
                : null,
            ]}
          >
            <Text
              style={[
                styles.text,
                selectedCategory === cat ||
                (cat === 'Hepsi' && !selectedCategory)
                  ? styles.selectedText
                  : null,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Checkbox alanı */}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => onToggleUncompleted(!showOnlyUncompleted)}
        activeOpacity={0.8}
      >
        <View style={[styles.checkbox, showOnlyUncompleted && styles.checked]}>
          {showOnlyUncompleted && <View style={styles.checkmark} />}
        </View>
        <Text style={styles.checkboxLabel}>Yalnızca karar bekleyenler</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  selected: {
    backgroundColor: '#D81B60',
  },
  text: {
    color: '#333',
    fontSize: 15,
  },
  selectedText: {
    color: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  checked: {
    borderColor: '#D81B60',
    backgroundColor: '#D81B60',
  },
  checkmark: {
    width: 10,
    height: 14,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'white',
    transform: [{ rotate: '-45deg' }],
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#444',
  },
});

export default Filter;
