import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RadioButton } from 'react-native-paper';
import AddComments from './AddComments';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import CompletedButton from './CompleatedButton';

type AskCardProps = {
  askId: string;
  question: string;
  options?: string[];
  category: string;
  imageUri?: string;
  authorName: string;
  onDelete?: () => void;
  completed?: boolean;
};

const AskCard: React.FC<AskCardProps> = ({
  askId,
  question,
  options,
  category,
  imageUri,
  authorName,
  onDelete,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [completed, setCompleted] = useState<boolean>(false);

  const currentUser = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!askId || !currentUser?.uid) return;

    const unsubscribeAsk = firestore()
      .collection('askes')
      .doc(askId)
      .onSnapshot(snapshot => {
        const data = snapshot.data();
        setCompleted(data?.completed ?? false);
      });

    const unsubscribeResponses = firestore()
      .collection('askes')
      .doc(askId)
      .collection('responses')
      .onSnapshot(snapshot => {
        const newCounts: Record<string, number> = {};
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          const option = data.selectedOption;
          if (option) {
            newCounts[option] = (newCounts[option] || 0) + 1;
          }
        });
        setCounts(newCounts);
      });

    const fetchUserSelection = async () => {
      try {
        const doc = await firestore()
          .collection('askes')
          .doc(askId)
          .collection('responses')
          .doc(currentUser.uid)
          .get();

        if (doc.exists()) {
          const data = doc.data();
          setSelectedOption(data?.selectedOption || null);
        }
      } catch (error) {
        console.error('Kullanıcı seçimi alınamadı:', error);
      }
    };

    fetchUserSelection();

    return () => {
      unsubscribeAsk();
      unsubscribeResponses();
    };
  }, [askId, currentUser]);

  const onSelectOption = async (option: string) => {
    if (!currentUser?.uid) {
      Alert.alert('Lütfen giriş yapınız.');
      return;
    }

    setSelectedOption(option);

    try {
      await firestore()
        .collection('askes')
        .doc(askId)
        .collection('responses')
        .doc(currentUser.uid)
        .set(
          {
            selectedOption: option,
            createdAt: firestore.FieldValue.serverTimestamp(),
            userName: currentUser.username || 'Anonim',
          },
          { merge: true },
        );
    } catch (error) {
      console.error('Seçenek kaydedilemedi:', error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.category}>{category}</Text>
        {onDelete && (
          <TouchableOpacity onPress={onDelete}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={24}
              color="#D81B60"
            />
          </TouchableOpacity>
        )}
      </View>

      <CompletedButton
        askId={askId}
        authorName={authorName}
        currentUserName={currentUser.username || null}
        completed={completed}
      />

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : null}

      <Text style={styles.question}>{question}</Text>

      {options && options.length > 0 ? (
        <View style={styles.optionsContainer}>
          {options.map((opt, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionRow}
              onPress={() => onSelectOption(opt)}
              activeOpacity={0.7}
            >
              <RadioButton
                value={opt}
                status={selectedOption === opt ? 'checked' : 'unchecked'}
                color="#D81B60"
                uncheckedColor="#BDBDBD"
                onPress={() => onSelectOption(opt)}
              />
              <Text style={styles.optionLabel}>{opt}</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{counts[opt] || 0}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <AddComments askId={askId} />
      )}

      <Text style={styles.author}>
        {authorName && authorName.trim() !== '' ? authorName : 'Anonim'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 5,
    position: 'relative',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontWeight: 'bold',
    color: '#D81B60',
    backgroundColor: '#ffe1ea',
    padding: 4,
    borderRadius: 12,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  author: {
    fontSize: 15,
    color: '#757575',
    margin: 6,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  question: {
    fontSize: 17,
    marginBottom: 12,
    marginTop: 8,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
    marginTop: 8,
  },
  optionsContainer: {
    marginTop: 8,
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  optionLabel: {
    fontSize: 17,
    color: '#333',
    flex: 1,
  },
  countBadge: {},
  countText: {
    color: 'black',
  },
});

export default AskCard;
