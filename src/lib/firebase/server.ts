
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: "studio-1544301007-237d7",
  appId: "1:161777841500:web:510a36763e805987733d99",
  apiKey: "AIzaSyDKlyZtD9vsBc4xrN6vuwfk5EVjPUdUvQQ",
  authDomain: "studio-1544301007-237d7.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "161777841500"
};


let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
