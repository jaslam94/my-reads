// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkTq66QWKFyCERBGK-0GmfSxeng3E8J5k",
  authDomain: "my-reads-bc2a1.firebaseapp.com",
  projectId: "my-reads-bc2a1",
  storageBucket: "my-reads-bc2a1.appspot.com",
  messagingSenderId: "18366930519",
  appId: "1:18366930519:web:3782abaddfabbb8b904d12",
  measurementId: "G-5HB4P50G5F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export { auth, provider };
