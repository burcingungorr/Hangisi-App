import React, { useState } from 'react';
import {
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Comments from './Comments';

type AddCommentsProps = {
  askId: string;
};

const AddComments: React.FC<AddCommentsProps> = ({ askId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');

  const handleSend = async () => {
    const trimmed = comment.trim();
    if (!trimmed) return;

    const currentUser = auth().currentUser;
    const displayName = currentUser?.displayName || 'Bilinmeyen';

    try {
      await firestore()
        .collection('askes')
        .doc(askId)
        .collection('comments')
        .add({
          text: trimmed,
          authorName: displayName,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      setComment('');
    } catch (error) {
      console.error('Yorum eklenemedi:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name="comment" size={25} color="#1976D2" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Kapat</Text>
            </TouchableOpacity>

            <Comments askId={askId} />

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Yorum ekle..."
                value={comment}
                onChangeText={setComment}
              />
              <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                <Text style={styles.sendText}>Gönder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '75%',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    justifyContent: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#1976D2',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeText: {
    color: '#1976D2',
  },
});

export default AddComments;
