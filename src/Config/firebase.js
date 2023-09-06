    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import {getAuth,GoogleAuthProvider} from 'firebase/auth'
    import {getFirestore } from 'firebase/firestore'
    import {getStorage} from 'firebase/storage'

    const firebaseConfig = {
    apiKey: "AIzaSyA-G18_wYo48ci2KilVzSyP0L9Mcjp46qI",
    authDomain: "fir-course-f53c7.firebaseapp.com",
    projectId: "fir-course-f53c7",
    storageBucket: "fir-course-f53c7.appspot.com",
    messagingSenderId: "891441107170",
    appId: "1:891441107170:web:281093eec7971166f1cebb",
    measurementId: "G-JR86Z03C2Q"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const googleProvider = new GoogleAuthProvider();
    export const db = getFirestore(app);
    export const storage = getStorage(app);
