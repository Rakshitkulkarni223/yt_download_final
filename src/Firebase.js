import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig  = {
    apiKey: "AIzaSyDtRUbME89_JmE3_X1Fdw2Vih1gRd_nwC4",
    authDomain: "ytinsta-76afb.firebaseapp.com",
    projectId: "ytinsta-76afb",
    storageBucket: "ytinsta-76afb.appspot.com",
    messagingSenderId: "571677712602",
    appId: "1:571677712602:web:7fd674bd59915caee185e3",
    measurementId: "G-3EGFGDETVV"
};

const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth();
export const db = getDatabase(app);