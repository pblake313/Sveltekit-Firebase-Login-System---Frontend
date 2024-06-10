// src/lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const apikey = import.meta.env.VITE_FIREBASE_API_KEY;
const authdomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectid = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storagebucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const messageingid = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appid = import.meta.env.VITE_FIREBASE_APP_ID;
const measurementid = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;


const firebaseConfig = {
    apiKey: apikey,
    authDomain: authdomain,
    projectId: projectid,
    storageBucket: storagebucket,
    messagingSenderId: messageingid,
    appId: appid,
    measurementId: measurementid
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
