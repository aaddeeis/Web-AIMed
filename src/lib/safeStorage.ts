// Safe wrapper around localStorage to prevent DOMException / SecurityError crashes inside restricted iframes.
const memoryStore: Record<string, string> = {};

export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn(`[SafeStorage] localStorage.getItem failed for key "${key}":`, e);
    }
    return key in memoryStore ? memoryStore[key] : null;
  },

  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      console.warn(`[SafeStorage] localStorage.setItem failed for key "${key}":`, e);
    }
    memoryStore[key] = String(value);
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      }
    } catch (e) {
      console.warn(`[SafeStorage] localStorage.removeItem failed for key "${key}":`, e);
    }
    delete memoryStore[key];
  },

  clear: (): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
        return;
      }
    } catch (e) {
      console.warn('[SafeStorage] localStorage.clear failed:', e);
    }
    for (const key in memoryStore) {
      delete memoryStore[key];
    }
  }
};
