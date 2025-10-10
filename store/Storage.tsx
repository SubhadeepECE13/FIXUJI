import { MMKV } from "react-native-mmkv";
import { Storage } from "redux-persist";

export const tokenStorage = new MMKV({
  id: "token-storage",
  encryptionKey: "some-secret-key",
});

export const userStorage = new MMKV({
  id: "user-storage",
  encryptionKey: "some-secret-key",
});

const storage = new MMKV({
  id: "my-app-storage",
  encryptionKey: "some-secret-key",
});

const reduxStorage: Storage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export default reduxStorage;
