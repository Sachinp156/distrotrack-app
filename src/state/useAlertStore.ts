// src/state/useAlertStore.ts
import { create } from 'zustand';

type Sev = 'info' | 'warning' | 'high';
type AlertItem = { id: string; title: string; message?: string; severity: Sev; durationMs?: number };

type AlertState = {
  current: AlertItem | null;
  queue: AlertItem[];
  push: (a: Omit<AlertItem, 'id'>) => void;
  pop: () => void;
  clear: () => void;
};

export const useAlertStore = create<AlertState>((set, get) => ({
  current: null,
  queue: [],
  push: (a) => {
    const item: AlertItem = { id: `${Date.now()}-${Math.random()}`, durationMs: 4000, ...a };
    const { current, queue } = get();
    if (!current) set({ current: item });
    else set({ queue: [...queue, item] });
  },
  pop: () => {
    const { queue } = get();
    set({ current: queue[0] ?? null, queue: queue.slice(1) });
  },
  clear: () => set({ current: null, queue: [] }),
}));
