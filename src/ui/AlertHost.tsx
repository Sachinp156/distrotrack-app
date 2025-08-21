// src/ui/AlertHost.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useAlertStore } from '../state/useAlertStore';

export default function AlertHost() {
  const current = useAlertStore((s) => s.current);
  const pop = useAlertStore((s) => s.pop);
  const translateY = useRef(new Animated.Value(-120)).current;
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!current) return;
    // slide in
    Animated.timing(translateY, { toValue: 0, duration: 220, useNativeDriver: true }).start();

    // auto close
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => handleClose(), current.durationMs ?? 4000);

    return () => { timer.current && clearTimeout(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id]);

  const handleClose = () => {
    Animated.timing(translateY, { toValue: -140, duration: 220, useNativeDriver: true }).start(() => pop());
  };

  if (!current) return null;

  const color =
    current.severity === 'high' ? '#d00000' :
    current.severity === 'warning' ? '#e6a100' : '#2563eb';

  return (
    <Animated.View style={[styles.wrap, { transform: [{ translateY }] }]}>
      <TouchableOpacity activeOpacity={0.9} onPress={handleClose} style={[styles.card, { borderLeftColor: color }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{current.title}</Text>
          {current.message ? <Text style={styles.msg}>{current.message}</Text> : null}
        </View>
        <Text style={styles.close}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 9999, elevation: 20, paddingTop: 36, paddingHorizontal: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 10,
    borderLeftWidth: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  title: { color: '#fff', fontWeight: '800' },
  msg: { color: '#cbd5e1', marginTop: 2 },
  close: { color: '#cbd5e1', paddingHorizontal: 10, fontSize: 16, fontWeight: '700' },
});
