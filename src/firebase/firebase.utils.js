import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCjEoKKYsDW52HEnVOmnJt_Qhxdmd0goW4",
  authDomain: "e-comm-db-21ac0.firebaseapp.com",
  databaseURL: "https://e-comm-db-21ac0.firebaseio.com",
  projectId: "e-comm-db-21ac0",
  storageBucket: "e-comm-db-21ac0.appspot.com",
  messagingSenderId: "855443694568",
  appId: "1:855443694568:web:e52941da43eead9ef5ba5d",
  measurementId: "G-L69LVLNPNV"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google authentication utility
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;