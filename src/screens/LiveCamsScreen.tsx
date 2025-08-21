import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
// At the top of src/screens/LiveCamsScreen.tsx
import { useAlertStore } from '../state/useAlertStore';



type Cam = { id: string; name: string; url: string };

// TODO: replace with your real HLS URLs (.m3u8)
const CAMS: Cam[] = [
  { id: 'cam1', name: 'Entrance', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
  { id: 'cam2', name: 'Lobby',    url: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8' },
  { id: 'cam3', name: 'Hallway',  url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
  { id: 'cam4', name: 'Exit',     url: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8' },
];

export default function LiveCamsScreen() {
const pushAlert = useAlertStore((s) => s.push);

// Example test button somewhere in your header / top area:
<TouchableOpacity
  style={{ backgroundColor: '#1a73e8', alignSelf: 'flex-end', marginRight: 12, marginBottom: 6, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 }}
  onPress={() => pushAlert({ severity: 'high', title: 'Zone Breach', message: 'P-024 entered Z-3' })}
>
  <Text style={{ color: '#fff', fontWeight: '700' }}>Test Alert</Text>
</TouchableOpacity>

// Or trigger alerts programmatically whenever an event occurs:
pushAlert({ severity: 'warning', title: 'ID Switch', message: 'Track P-017 re-linked to P-019' });
// Example test button somewhere in your header / top area:
<TouchableOpacity
  style={{ backgroundColor: '#1a73e8', alignSelf: 'flex-end', marginRight: 12, marginBottom: 6, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 }}
  onPress={() => pushAlert({ severity: 'high', title: 'Zone Breach', message: 'P-024 entered Z-3' })}
>
  <Text style={{ color: '#fff', fontWeight: '700' }}>Test Alert</Text>
</TouchableOpacity>

// Or trigger alerts programmatically whenever an event occurs:
pushAlert({ severity: 'warning', title: 'ID Switch', message: 'Track P-017 re-linked to P-019' });

  const [fullscreen, setFullscreen] = useState<Cam | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Cameras</Text>

      <FlatList
        data={CAMS}
        keyExtractor={(item) => item.id}
        numColumns={2}                          // <- EXACTLY 2 COLUMNS
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}         // spacing between two tiles in a row
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setFullscreen(item)}
            style={styles.tileWrap}
          >
            <CamPlayer url={item.url} autoPlay muted />
            <View style={styles.labelWrap}>
              <Text style={styles.label}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!fullscreen} animationType="slide" onRequestClose={() => setFullscreen(null)}>
        <View style={styles.modal}>
          {fullscreen && <CamPlayer url={fullscreen.url} autoPlay muted={false} />}
          <Text style={styles.modalLabel}>{fullscreen?.name}</Text>
          <TouchableOpacity style={styles.closeBtn} onPress={() => setFullscreen(null)}>
            <Text style={{ color: '#fff', fontWeight: '700' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

function CamPlayer({ url, autoPlay, muted }: { url: string; autoPlay?: boolean; muted?: boolean }) {
  const ref = useRef<Video>(null);
  return (
    <Video
      ref={ref}
      source={{ uri: url }}
      useNativeControls={false}
      resizeMode={ResizeMode.COVER}
      shouldPlay={!!autoPlay}
      isMuted={!!muted}
      isLooping
      style={styles.video}
    />
  );
}

const GAP = 8;
const { width } = Dimensions.get('window');
// two columns: total horizontal gap = 3*GAP (left + middle + right)
const TILE_W = (width - GAP * 3) / 2;
const TILE_H = Math.round(TILE_W * 9 / 16); // 16:9 aspect

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 8 },
  title: { fontSize: 18, fontWeight: '700', paddingHorizontal: 12, marginBottom: 8 },

  grid: { paddingHorizontal: GAP, paddingBottom: GAP },
  row: { justifyContent: 'space-between', marginBottom: GAP },

  tileWrap: {
    width: TILE_W,
    height: TILE_H,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  video: { width: '100%', height: '100%', backgroundColor: '#000' },

  labelWrap: {
    position: 'absolute',
    left: 6, bottom: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: 4,
  },
  label: { color: '#fff', fontWeight: '600' },

  modal: { flex: 1, backgroundColor: '#000', justifyContent: 'flex-end' },
  modalLabel: {
    position: 'absolute', top: 12, left: 12,
    color: '#fff', fontSize: 16, fontWeight: '700',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4,
  },
  closeBtn: {
    alignSelf: 'center', marginBottom: 28,
    backgroundColor: '#333', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8,
  },
});
