import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';

type CompletedButtonProps = {
  askId: string;
  authorName: string;
  currentUserName: string | null;
  completed: boolean;
};

const CompletedButton: React.FC<CompletedButtonProps> = ({
  askId,
  authorName,
  currentUserName,
  completed,
}) => {
  const isAuthor =
    authorName?.trim().toLowerCase() === currentUserName?.trim().toLowerCase();
  console.log(currentUserName, authorName);

  const handlePress = async () => {
    try {
      await firestore().collection('askes').doc(askId).update({
        completed: !completed,
      });
    } catch (error) {
      console.error('Karar durumu güncellenemedi:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          completed ? styles.completedButton : styles.pendingButton,
        ]}
        onPress={handlePress}
        disabled={!isAuthor}
      >
        <Text
          style={[
            styles.buttonText,
            completed ? styles.completedText : styles.pendingText,
          ]}
        >
          {completed ? 'Karar verildi' : 'Karar bekleniyor'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    width: '100%',
    position: 'absolute',
    top: 6,
    right: 5,
    padding: 8,
    zIndex: 1,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  completedButton: {
    backgroundColor: '#A7C7E7',
  },
  pendingButton: {
    backgroundColor: '#A7C7E7',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  completedText: {
    color: '#1976D2',
  },
  pendingText: {
    color: '#1976D2',
  },
});

export default CompletedButton;
