import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

const Badges = () => {
  const [selectedBadge, setSelectedBadge] = useState<any>(null);
  const [earnedBadges, setEarnedBadges] = useState<number[]>([]);
  const user = useSelector((state: any) => state.auth);

  const checkKararArayicisiBadge = async (authorName: string) => {
    try {
      const snapshot = await firestore()
        .collection('askes')
        .where('authorName', '==', authorName)
        .get();
      return snapshot.size >= 5;
    } catch (error) {
      return false;
    }
  };

  const checkTavsiyeUstasiBadge = async (authorName: string) => {
    try {
      const askesSnapshot = await firestore().collection('askes').get();
      let totalComments = 0;

      for (const doc of askesSnapshot.docs) {
        const commentsSnapshot = await firestore()
          .collection('askes')
          .doc(doc.id)
          .collection('comments')
          .where('authorName', '==', authorName)
          .get();

        totalComments += commentsSnapshot.size;
      }
      return totalComments >= 50;
    } catch (error) {
      return false;
    }
  };

  const checkKararOrtagiBadge = async (authorName: string) => {
    try {
      const snapshot = await firestore()
        .collection('responses')
        .where('userName', '==', authorName)
        .get();
      return snapshot.size >= 50;
    } catch (error) {
      return false;
    }
  };

  const checkRenkliKararciBadge = async (authorName: string) => {
    const allCategories = [
      'Yemek',
      'Moda',
      'Sosyal',
      'İlişki',
      'Kariyer',
      'Günlük Yaşam',
    ];

    try {
      const snapshot = await firestore()
        .collection('askes')
        .where('authorName', '==', authorName)
        .get();

      const userCategories = new Set<string>();
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.category) {
          userCategories.add(data.category);
        }
      });

      return allCategories.every(cat => userCategories.has(cat));
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const fetchBadges = async () => {
      if (!user?.username) return;

      const earned: number[] = [];

      const kararArayicisi = await checkKararArayicisiBadge(user.username);
      if (kararArayicisi) earned.push(1);

      const tavsiyeUstasi = await checkTavsiyeUstasiBadge(user.username);
      if (tavsiyeUstasi) earned.push(2);

      const kararOrtagi = await checkKararOrtagiBadge(user.username);
      if (kararOrtagi) earned.push(3);

      const renkliKararci = await checkRenkliKararciBadge(user.username);
      if (renkliKararci) earned.push(4);

      setEarnedBadges(earned);
    };

    fetchBadges();
  }, [user]);

  const badges = [
    {
      id: 1,
      label: 'Karar Arayıcısı',
      icon: 'star',
      earned: earnedBadges.includes(1),
      iconColor: '#FFA500',
      description: '50 soru sorarak bu rozeti kazanabilirsiniz.',
    },
    {
      id: 2,
      label: 'Tavsiye Ustası',
      icon: 'trophy',
      earned: earnedBadges.includes(2),
      iconColor: '#4CAF50',
      description: '50 yorum yaparak bu rozeti kazanabilirsiniz.',
    },
    {
      id: 3,
      label: 'Karar Ortağı',
      icon: 'medal',
      earned: earnedBadges.includes(3),
      iconColor: '#1976D2',
      description: '50 yardım yaparak bu rozeti kazanabilirsiniz.',
    },
    {
      id: 4,
      label: 'Renkli Kararcı',
      icon: 'crown',
      earned: earnedBadges.includes(4),
      iconColor: '#FF4081',
      description:
        'Yemek, Moda, Sosyal, İlişki, Kariyer ve Günlük Yaşam kategorilerinde soru sorarak bu rozeti kazanabilirsiniz.',
    },
  ];

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {badges.map(badge => (
          <TouchableOpacity
            key={badge.id}
            onPress={() => setSelectedBadge(badge)}
          >
            <View
              style={[
                styles.badgeBox,
                {
                  backgroundColor: badge.earned ? 'white' : '#f5f5f5',
                  borderColor: badge.earned ? badge.iconColor : '#d4d4d4',
                },
              ]}
            >
              <Icon
                name={badge.icon}
                size={32}
                color={badge.earned ? badge.iconColor : '#d4d4d4'}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.badgeText,
                  { color: badge.earned ? badge.iconColor : '#d4d4d4' },
                ]}
              >
                {badge.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={selectedBadge !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedBadge(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Icon
              name={selectedBadge?.icon}
              size={48}
              color={selectedBadge?.iconColor}
              style={{ marginBottom: 12 }}
            />
            <Text style={styles.modalTitle}>{selectedBadge?.label}</Text>
            <Text style={styles.modalDescription}>
              {selectedBadge?.description}
            </Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setSelectedBadge(null)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: 110,
  },
  badgeBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderRadius: 50,
    marginRight: 12,
    minWidth: 80,
    borderWidth: 2,
    paddingVertical: 8,
  },
  icon: {
    marginBottom: 6,
  },
  badgeText: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#D81B60',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Badges;
