import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAbCPzB01ygqKxIxG_OzgED1AUrlIJU6Ps",
  authDomain: "ecomm-shop-b9795.firebaseapp.com",
  databaseURL: "https://ecomm-shop-b9795.firebaseio.com",
  projectId: "ecomm-shop-b9795",
  storageBucket: "ecomm-shop-b9795.appspot.com",
  messagingSenderId: "1043547546657",
  appId: "1:1043547546657:web:fc07b866499ab1d7e5ef60",
  measurementId: "G-B991ER1LC8",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
