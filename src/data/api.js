import { collection, getDocs } from "firebase/firestore";
import db from "./firestore.js";

export const getMenuFromFirestore = async () => {
  const querySnapshot = await getDocs(collection(db, "menu"));
  const data = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return data;
};