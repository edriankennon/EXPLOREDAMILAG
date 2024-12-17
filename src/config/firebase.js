// Import Firebase services
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For persistence

// Firebase configuration (Consider using environment variables for sensitive data)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyB536Xk755H299z_wKeBmPYOF3GPD-2NNo",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "test-auth-da8cb.firebaseapp.com",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || "https://test-auth-da8cb-default-rtdb.firebaseio.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "test-auth-da8cb",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "test-auth-da8cb.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "70798891135",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:70798891135:web:2777735ef46b3134f6874a",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-DXNRW5WD3L",
};

// Initialize Firebase app if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth with persistence for React Native
let auth;
if (!getApps().length) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  auth = getAuth(app); // Retrieve existing Auth instance
}

// Initialize Firebase services
const db = getFirestore(app); // Firestore for cloud data storage
const database = getDatabase(app); // Realtime Database
const storage = getStorage(app); // Cloud Storage

// Export initialized Firebase app and services
export { app, auth, db, database, storage };