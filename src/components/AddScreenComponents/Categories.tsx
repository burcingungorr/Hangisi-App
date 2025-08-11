import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Category {
  key: string;
  name: string;
  icon: string;
  color: string;
}

const categories: Category[] = [
  { key: '1', name: 'Yemek', icon: 'noodles', color: '#FF7043' },
  { key: '2', name: 'Moda', icon: 'tshirt-crew', color: '#42A5F5' },
  { key: '3', name: 'Sosyal', icon: 'account-group', color: '#66BB6A' },
  { key: '4', name: 'İlişki', icon: 'heart-pulse', color: '#EC407A' },
  { key: '5', name: 'Kariyer', icon: 'briefcase-variant', color: '#FFA726' },
  { key: '6', name: 'Günlük Yaşam', icon: 'seat', color: '#AB47BC' },
];

interface Props {
  selected: string;
  onSelect: (category: string) => void;
}

const Categories: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <>
      <Text style={styles.text}>Kategori Belirle</Text>
      <FlatList
        data={categories}
        numColumns={3}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.box,
              selected === item.name && {
                borderWidth: 2,
                borderColor: item.color,
              },
            ]}
            onPress={() => onSelect(item.name)}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={32}
              color={item.color}
            />
            <Text style={styles.label}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    width: 105,
    height: 105,
    elevation: 2,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginLeft: 10,
    marginVertical: 5,
  },
  label: {
    marginTop: 8,
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 8,
    color: '#222',
    marginLeft: 10,
  },
});

export default Categories;
