// Import Firebase services
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database"; // Import Realtime Database

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB536Xk755H299z_wKeBmPYOF3GPD-2NNo",
  authDomain: "test-auth-da8cb.firebaseapp.com",
  databaseURL: "https://test-auth-da8cb-default-rtdb.firebaseio.com", // Added Realtime Database URL
  projectId: "test-auth-da8cb",
  storageBucket: "test-auth-da8cb.firebasestorage.app", // Corrected URL
  messagingSenderId: "70798891135",
  appId: "1:70798891135:web:2777735ef46b3134f6874a",
  measurementId: "G-DXNRW5WD3L"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app); // Initialize Realtime Database
const storage = getStorage(app);

// Export initialized services
export { app, auth, db, database, storage };
