import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import Username from '../components/ProfileScreenComponents/Username';
import UserInfo from '../components/ProfileScreenComponents/UserInfo';
import Badges from '../components/ProfileScreenComponents/Badges';
import AskCard from '../components/HomeScreenComponents/AskCard';
import LogOutButton from '../components/ProfileScreenComponents/LogOutButton';

type Question = {
  id: string;
  question: string;
  options?: string[];
  category: string;
  imageUrl?: string;
  authorId: string;
  authorName: string;
  completed?: boolean;
};

const ProfileScreen = () => {
  const currentUser = useSelector((state: any) => state.auth);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [helpCount, setHelpCount] = useState(0);

  useEffect(() => {
    if (!currentUser?.username) return;

    const unsubscribeQuestions = firestore()
      .collection('askes')
      .where('authorName', '==', currentUser.username)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        snapshot => {
          if (!snapshot) {
            setQuestions([]);
            setLoading(false);
            return;
          }

          const list: Question[] = snapshot.docs.map(doc => ({
            ...(doc.data() as Question),
            id: doc.id,
          }));

          setQuestions(list);
          setLoading(false);
        },
        error => {
          console.log('Sorular alınamadı:', error);
          setLoading(false);
        },
      );

    return () => unsubscribeQuestions();
  }, [currentUser?.username]);

  useEffect(() => {
    if (!currentUser?.uid) return;

    let responseCount = 0;
    let commentCount = 0;

    const unsubscribeResponses = firestore()
      .collectionGroup('responses')
      .where('userName', '==', currentUser.username)
      .onSnapshot(snapshot => {
        if (!snapshot) {
          return;
        }

        responseCount = snapshot.size;
        setHelpCount(responseCount + commentCount);
      });

    const unsubscribeComments = firestore()
      .collectionGroup('comments')
      .where('authorName', '==', currentUser.username)
      .onSnapshot(snapshot => {
        if (!snapshot) {
          return;
        }

        commentCount = snapshot.size;
        setHelpCount(responseCount + commentCount);
      });

    return () => {
      unsubscribeResponses();
      unsubscribeComments();
    };
  }, [currentUser?.uid]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D81B60" />
      </View>
    );
  }

  return (
    <FlatList
      data={questions}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <AskCard
            askId={item.id}
            question={item.question}
            options={item.options}
            category={item.category}
            imageUri={item.imageUrl}
            authorName={item.authorName}
            completed={item.completed}
          />
        </View>
      )}
      ListHeaderComponent={
        <View style={styles.header}>
          <LogOutButton />
          <Username />
          <UserInfo questionCount={questions.length} helpCount={helpCount} />
          <Badges />
          <Text style={styles.headerText}>Sorularım</Text>
        </View>
      }
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <Text style={styles.emptyText}>Henüz hiç sorunuz yok.</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffe1ea',
    paddingBottom: 20,
    flexGrow: 1,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    color: '#333',
    marginTop: 15,
    marginLeft: 16,
  },
  cardWrapper: {
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 100,
    color: '#888',
    fontSize: 16,
  },
});

export default ProfileScreen;
