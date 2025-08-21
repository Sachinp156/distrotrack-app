// src/screens/WelcomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DistroTrack</Text>
      <Text style={styles.subtitle}>Multi-camera live monitoring</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('LiveCams')}>
        <Text style={styles.btnText}>Start Monitoring</Text>
      </TouchableOpacity>

      <Text style={styles.note}>Tip: Tap a camera tile to view fullscreen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b132b', alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 6 },
  subtitle: { fontSize: 15, color: '#cbd5e1', marginBottom: 24 },
  btn: { backgroundColor: '#1a73e8', paddingVertical: 12, paddingHorizontal: 22, borderRadius: 10 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  note: { color: '#cbd5e1', fontSize: 12, marginTop: 16 },
});
