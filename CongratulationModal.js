// CongratulationModal.js
import React from 'react';
import { View, Text, StyleSheet, Modal, Image } from 'react-native';
import { Button } from 'react-native-paper';

export default function CongratulationModal({ visible, value, currencySymbol, onClose }) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.content}>
          {/* MVP image */}
          <Image source={require('./assets/full.png')} style={styles.image} />

          <Text style={styles.title}>🎉 Congratulations! 🎉</Text>
          <Text style={styles.value}>
            Your meal is worth: {currencySymbol}{value}
          </Text>

          <Button mode="contained" onPress={onClose} style={styles.okButton}>
            OK
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  image: { width: 120, height: 120, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  value: { fontSize: 18, marginBottom: 20 },
  okButton: { borderRadius: 20 },
});