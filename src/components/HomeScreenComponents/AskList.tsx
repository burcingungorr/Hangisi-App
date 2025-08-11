import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AskCard from './AskCard';

type Ask = {
  id: string;
  question: string;
  options?: string[];
  category: string;
  imageUrl?: string;
  isAnonymous?: boolean;
  createdAt?: any;
  authorName?: string;
  completed?: boolean;
};

type AskListProps = {
  selectedCategory: string | null;
  showOnlyUncompleted: boolean;
};

const AskList: React.FC<AskListProps> = ({
  selectedCategory,
  showOnlyUncompleted,
}) => {
  const [asks, setAsks] = useState<Ask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('askes')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        snapshot => {
          const list: Ask[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Ask[];
          setAsks(list);
          setLoading(false);
        },
        error => {
          console.error('Veri çekme hatası:', error);
          setLoading(false);
        },
      );

    return () => unsubscribe();
  }, []);

  const filteredData = asks.filter(item => {
    const categoryMatch = selectedCategory
      ? item.category === selectedCategory
      : true;
    const completedMatch = showOnlyUncompleted
      ? item.completed === false
      : true;
    return categoryMatch && completedMatch;
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sorular</Text>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <AskCard
            askId={item.id}
            question={item.question}
            options={item.options}
            category={item.category}
            imageUri={item.imageUrl}
            authorName={
              item.isAnonymous ? 'Anonim' : item.authorName || 'Anonim'
            }
            completed={item.completed ?? false}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Soru bulunamadı.</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 22,
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#222',
  },
  empty: {
    textAlign: 'center',
    marginTop: 200,
    color: '#888',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AskList;
