import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type Comment = {
  id: string;
  authorName: string;
  text: string;
  starredBy?: string[];
  createdAt?: any;
};

type CommentsProps = {
  askId: string;
};

const Comments: React.FC<CommentsProps> = ({ askId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const currentUser = useSelector((state: RootState) => state.auth);
  const userId = currentUser?.uid;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('askes')
      .doc(askId)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Comment, 'id'>),
        }));
        setComments(list);
      });

    return () => unsubscribe();
  }, [askId]);

  const toggleStar = async (commentId: string, starredBy: string[] = []) => {
    if (!userId) {
      Alert.alert('Yıldızlamak için giriş yapmalısınız.');
      return;
    }

    const hasStarred = starredBy.includes(userId);
    const newStarredBy = hasStarred
      ? starredBy.filter(id => id !== userId)
      : [...starredBy, userId];

    try {
      await firestore()
        .collection('askes')
        .doc(askId)
        .collection('comments')
        .doc(commentId)
        .update({
          starredBy: newStarredBy,
        });
    } catch (error) {
      console.error('Yıldız durumu güncellenemedi:', error);
    }
  };

  const renderItem = ({ item }: { item: Comment }) => {
    const userHasStarred = item.starredBy?.includes(userId || '') ?? false;
    const starCount = item.starredBy?.length ?? 0;

    return (
      <TouchableOpacity
        style={[styles.comment, userHasStarred && styles.selectedComment]}
        onPress={() => toggleStar(item.id, item.starredBy)}
        activeOpacity={0.7}
      >
        <View style={styles.textContainer}>
          <Text style={styles.author}>{item.authorName}:</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
        <View style={styles.starContainer}>
          <MaterialCommunityIcons
            name={userHasStarred ? 'star' : 'star-outline'}
            size={25}
            color={userHasStarred ? '#D81B60' : '#888'}
          />
          <Text style={styles.starCount}>{starCount}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {comments.length === 0 ? (
        <Text style={styles.noComments}>Henüz yorum yok.</Text>
      ) : (
        <FlatList
          data={comments}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  noComments: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginBottom: 200,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#ffe1ea',
    marginBottom: 10,
  },
  selectedComment: {
    backgroundColor: '#ffd6e3',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  author: {
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 4,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starCount: {
    marginLeft: 6,
    fontWeight: 'bold',
    color: '#1976D2',
    fontSize: 16,
  },
});

export default Comments;
