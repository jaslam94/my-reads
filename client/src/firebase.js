// Import the functions you need from the SDKs you need
import { apiKey, messagingSenderId, appId } from "./config.json";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "my-reads-bc2a1.firebaseapp.com",
  projectId: "my-reads-bc2a1",
  storageBucket: "my-reads-bc2a1.appspot.com",
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: "${config.measurementId}",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export { auth, provider };
