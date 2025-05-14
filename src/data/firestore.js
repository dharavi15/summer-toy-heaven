import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC8iWxYjCDmmCpY0nYJ1QNnYKwZxKrh4ek",
  authDomain: "leksak-98dc6.firebaseapp.com",
  projectId: "leksak-98dc6",
  storageBucket: "leksak-98dc6.firebasestorage.app",
  messagingSenderId: "225721298087",
  appId: "1:225721298087:web:902bf6caf56811ba4d7f82",
  measurementId: "G-HKWE14ED7Y"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;