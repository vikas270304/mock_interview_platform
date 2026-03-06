import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDxfwRVwSGXsfc16bHR0CnRQ5mXiuyC_ZM",
    authDomain: "prepwise-b30fa.firebaseapp.com",
    projectId: "prepwise-b30fa",
    storageBucket: "prepwise-b30fa.firebasestorage.app",
    messagingSenderId: "957305659351",
    appId: "1:957305659351:web:a9d487fe90a709e77ef592",
    measurementId: "G-99RZQ60JJ0"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app)