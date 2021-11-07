import { initializeApp, getApps } from "firebase/app";
import "firebase/auth";
import { Timestamp, getFirestore } from "firebase/firestore";
import { getStorage, TaskEvent } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5ogztI8QMW5hosF3QK1-MPmiTXmgQ5rY",
  authDomain: "pbl4-dut.firebaseapp.com",
  projectId: "pbl4-dut",
  storageBucket: "pbl4-dut.appspot.com",
  messagingSenderId: "990254164385",
  appId: "1:990254164385:web:ca0dff4199aaa2851783e0",
  measurementId: "G-RVGWRP1R6J",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Auth exports

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();

// Firestore exports
export const firestore = getFirestore();

// Storage exports
export const storage = getStorage();

/// Helper functions

// /**`
//  * Gets a users/{uid} document with username
//  * @param  {string} username
//  */
// export async function getUserWithUsername(username) {
//   const usersRef = firestore.collection("users");
//   const query = usersRef.where("username", "==", username).limit(1);
//   const userDoc = (await query.get()).docs[0];
//   return userDoc;
// }

// /**`
//  * Converts a firestore document to JSON
//  * @param  {DocumentSnapshot} doc
//  */
// export function postToJSON(doc: { data: () => any; }) {
//   const data = doc.data();
//   return {
//     ...data,
//     // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
//     createdAt: data?.createdAt.toMillis() || 0,
//     updatedAt: data?.updatedAt.toMillis() || 0,
//   };
// }
