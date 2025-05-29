import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmHqXS0Qp_WU7cZoFr97FxKmUzBL-1PBg",
  authDomain: "fix-das-b5cce.firebaseapp.com",
  projectId: "fix-das-b5cce",
  storageBucket: "fix-das-b5cce.firebasestorage.app",
  messagingSenderId: "84930050475",
  appId: "1:84930050475:web:9b24b1d59358648b4c7aee",
  measurementId: "G-NDJEDRW8DM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

provider.setCustomParameters({
  prompt: "select_account",
});
