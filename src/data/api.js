import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc} from "firebase/firestore";
import db from "./firestore.js";

export const getMenuFromFirestore = async () => {
  const querySnapshot = await getDocs(collection(db, "menu"));{/*result is saved in querysnapshot,it is like box of documnets,menu items just pulled from firestore*/}
  const data = querySnapshot.docs.map(doc => ({
    firestoreId: doc.id,
    ...doc.data()
  }));
  return data;
};

export const addMenuItemToFirestore = async (newItem) => {
  try {
    const docRef = await addDoc(collection(db, "menu"), newItem);
    console.log("Document written with ID:", docRef.id); /* docRef-a new document is created and docRef id auto generated firestore id for the new item*/
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);/* if somethimg goes wrong gives erroe mesage*/
  }
};


export const deleteProductFromFirestore = async (productId) => {
  try {
    if (typeof productId !== "string") {
      throw new Error(`Invalid productId: expected string but got ${typeof productId}`);
    }
    const productRef = doc(db, "menu", productId);
    await deleteDoc(productRef);
    console.log("Deleted successfully");
  } catch (error) {
    console.error("Error deleting from Firestore:", error);
  }
};


export const updateMenuItemInFirestore = async (firestoreId, updatedData) => {
  try {
    const productRef = doc(db, "menu", firestoreId);
    await updateDoc(productRef, updatedData);
    console.log("✅ Updated item in Firestore:", updatedData);
  } catch (error) {
    console.error("❌ Error updating Firestore document:", error);
  }
};

