// IndexedDB wrapper for offline-first data persistence

const DB_NAME = 'botaqiy_offline';
const DB_VERSION = 1;

interface SyncQueueItem {
  id: string;
  action: 'create' | 'update' | 'delete';
  table: string;
  data: any;
  timestamp: number;
  synced: boolean;
}

let dbInstance: IDBDatabase | null = null;

export async function initDB(): Promise<IDBDatabase> {
  if (dbInstance) return dbInstance;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Flashcard sessions store
      if (!db.objectStoreNames.contains('flashcard_sessions')) {
        const sessionsStore = db.createObjectStore('flashcard_sessions', { keyPath: 'id' });
        sessionsStore.createIndex('user_id', 'user_id', { unique: false });
      }

      // User progress store
      if (!db.objectStoreNames.contains('user_progress')) {
        const progressStore = db.createObjectStore('user_progress', { keyPath: 'user_id' });
      }

      // Scenarios store
      if (!db.objectStoreNames.contains('scenarios')) {
        const scenariosStore = db.createObjectStore('scenarios', { keyPath: 'id' });
        scenariosStore.createIndex('session_id', 'session_id', { unique: false });
      }

      // User rewards store
      if (!db.objectStoreNames.contains('user_rewards')) {
        const rewardsStore = db.createObjectStore('user_rewards', { keyPath: 'id' });
        rewardsStore.createIndex('user_id', 'user_id', { unique: false });
      }

      // Sync queue store
      if (!db.objectStoreNames.contains('sync_queue')) {
        const syncStore = db.createObjectStore('sync_queue', { keyPath: 'id' });
        syncStore.createIndex('synced', 'synced', { unique: false });
      }
    };
  });
}

export async function saveToStore<T>(storeName: string, data: T): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put(data);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function getFromStore<T>(storeName: string, key: string): Promise<T | undefined> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.get(key);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function getAllFromStore<T>(storeName: string): Promise<T[]> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function deleteFromStore(storeName: string, key: string): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(key);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function addToSyncQueue(item: Omit<SyncQueueItem, 'id' | 'timestamp' | 'synced'>): Promise<void> {
  const queueItem: SyncQueueItem = {
    ...item,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    synced: false
  };
  await saveToStore('sync_queue', queueItem);
}

export async function getPendingSyncItems(): Promise<SyncQueueItem[]> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('sync_queue', 'readonly');
    const store = transaction.objectStore('sync_queue');
    const index = store.index('synced');
    const request = index.getAll(IDBKeyRange.only(false));

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function markAsSynced(id: string): Promise<void> {
  const item = await getFromStore<SyncQueueItem>('sync_queue', id);
  if (item) {
    item.synced = true;
    await saveToStore('sync_queue', item);
  }
}

// Check if online
export function isOnline(): boolean {
  return navigator.onLine;
}

// Listen for online/offline events
export function onConnectivityChange(callback: (online: boolean) => void): () => void {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}
