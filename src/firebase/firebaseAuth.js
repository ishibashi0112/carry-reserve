import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { auth } from "src/firebase/firebase";

export const signOutAuth = async () => {
  try {
    await signOut(auth);
    console.log("ログアウト");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
};
