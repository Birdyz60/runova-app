import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import theme from '../theme';

const MainScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  return (
    <View style={styles.container} testID="main-screen">
      {/* Bouton engrenage */}
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.settingsButton}
        testID="settings-button"
      >
        <Text style={styles.settingsText}>⚙️</Text>
      </Pressable>

      <Pressable
        onPress={() => setProfileModalVisible(true)}
        style={styles.profileButton}
        testID="profile-button"
      >
        <Text style={styles.profileText}>👤</Text>
      </Pressable>

      <Text style={styles.title}>Bienvenue sur Runova</Text>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>L’écran des options arrivera bientôt.</Text>
            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={profileModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>L’écran du profil utilisateur arrivera bientôt.</Text>
            <Pressable onPress={() => setProfileModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: 50,
    paddingHorizontal: theme.spacing.md,
  },
  title: {
    marginTop: 80,
    fontSize: theme.typography.title.fontSize,
    color: theme.colors.text,
    fontWeight: theme.typography.title.fontWeight,
    alignSelf: 'center',
  },
  settingsButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  settingsText: {
    fontSize: 24,
    color: theme.colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.text,
    padding: theme.spacing.lg,
    borderRadius: theme.spacing.sm,
    minWidth: '70%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#101010',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.spacing.sm,
  },
  closeButtonText: {
    color: theme.colors.text,
  },
  profileButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  profileText: {
    fontSize: 24,
    color: theme.colors.text,
  },
});

export default MainScreen;
