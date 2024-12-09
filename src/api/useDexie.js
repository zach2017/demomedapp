import { useState, useEffect } from 'react';
import Dexie from 'dexie';

const db = new Dexie('AppDatabase');
db.version(1).stores({
  keyValueStore: '++id, key, value'
});

const useDexie = (key, initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const item = await db.keyValueStore.where('key').equals(key).first();
        if (item) {
          setValue(item.value);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    loadValue();
  }, [key]);

  const setItem = async (newValue) => {
    try {
      const existingItem = await db.keyValueStore.where('key').equals(key).first();
      if (existingItem) {
        await db.keyValueStore.update(existingItem.id, { value: newValue });
      } else {
        await db.keyValueStore.add({ key, value: newValue });
      }
      setValue(newValue);
    } catch (err) {
      setError(err.message);
    }
  };

  return [value, setItem, error];
};

export default useDexie;