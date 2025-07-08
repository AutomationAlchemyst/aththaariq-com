// This file is the central point for all Firebase interactions.
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration, which we used for the lead magnet.
const firebaseConfig = {
  apiKey: "AIzaSyCda0nEy54TLknkQGVbvybcgY6f4_dsjvc",
  authDomain: "aththaariq-com.firebaseapp.com",
  projectId: "aththaariq-com",
  storageBucket: "aththaariq-com.appspot.com",
  messagingSenderId: "346852623967",
  appId: "1:346852623967:web:be810578ad205ca2acfdea",
  measurementId: "G-CB5CF1J65L"
};

// Initialize Firebase
// This check prevents re-initializing the app on every request in development.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export the Firestore database instance to be used by other parts of the application.
export const db = getFirestore(app);
