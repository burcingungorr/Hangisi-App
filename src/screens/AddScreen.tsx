import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Title from '../components/Ttile';
import AskInput from '../components/AddScreenComponents/AskInput';
import Categories from '../components/AddScreenComponents/Categories';
import Options from '../components/AddScreenComponents/Options';
import ToggleButton from '../components/AddScreenComponents/ToggleButton';
import AddImage from '../components/AddScreenComponents/AddImage';
import SendButton from '../components/AddScreenComponents/SendButton';
import AskForm from '../components/AddScreenComponents/AskForm';

const dummy = [1];

const AddScreen = () => {
  return (
    <FlatList
      data={dummy}
      keyExtractor={(_, index) => index.toString()}
      renderItem={() => (
        <View style={styles.content}>
          <View style={{ paddingLeft: 10 }}>
            <Title title="EKLE" />
          </View>
          <AskForm />
        </View>
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ffe1ea',
  },
  content: {
    flex: 1,
  },
});

export default AddScreen;
