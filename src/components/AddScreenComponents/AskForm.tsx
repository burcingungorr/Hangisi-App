import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import AskInput from './AskInput';
import Categories from './Categories';
import Options from './Options';
import ToggleButton from './ToggleButton';
import AddImage from './AddImage';
import SendButton from './SendButton';

const AskForm = () => {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [isAnon, setIsAnon] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleSend = async () => {
    if (!question.trim()) return Alert.alert('Hata', 'Lütfen bir soru girin.');
    if (!category) return Alert.alert('Hata', 'Lütfen bir kategori seçin.');

    const currentUser = auth().currentUser;
    const displayName = currentUser?.displayName || 'Bilinmeyen';

    try {
      await firestore().collection('askes').add({
        question,
        category,
        options,
        isAnonymous: isAnon,
        authorName: displayName,
        imageUrl,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Başarılı', 'Sorunuz başarıyla gönderildi!');
      setQuestion('');
      setCategory('');
      setOptions([]);
      setIsAnon(false);
      setImageUrl('');
    } catch (error) {
      console.error('Firestore hatası:', error);
      Alert.alert('Hata', 'Veri gönderilirken bir sorun oluştu.');
    }
  };

  return (
    <View>
      <AskInput value={question} onChangeText={setQuestion} />
      <Categories selected={category} onSelect={setCategory} />
      <Options value={options} onChange={setOptions} />
      <AddImage onImageUploaded={setImageUrl} />
      <ToggleButton value={isAnon} onToggle={setIsAnon} />
      <SendButton onPress={handleSend} />
    </View>
  );
};

export default AskForm;
