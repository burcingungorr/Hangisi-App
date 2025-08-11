import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Title from '../components/Ttile';
import AskList from '../components/HomeScreenComponents/AskList';
import Filter from '../components/HomeScreenComponents/Filter';

const dummy = [1];

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showOnlyUncompleted, setShowOnlyUncompleted] =
    useState<boolean>(false);
  return (
    <View style={{ flex: 1, backgroundColor: '#ffe1ea' }}>
      <FlatList
        data={dummy}
        keyExtractor={(item, index) => index.toString()}
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        renderItem={() => (
          <View>
            <Title title="HANGİSİ ?" />
            <Filter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              showOnlyUncompleted={showOnlyUncompleted}
              onToggleUncompleted={setShowOnlyUncompleted}
            />
            <AskList
              selectedCategory={selectedCategory}
              showOnlyUncompleted={showOnlyUncompleted}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: '#ffe1ea',
  },
});

export default HomeScreen;
