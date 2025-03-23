import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // Replace with your actual Firebase config
  apiKey: "your-api-key",
  authDomain: "lebronify.firebaseapp.com",
  projectId: "lebronify",
  storageBucket: "lebronify.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

export default app; 