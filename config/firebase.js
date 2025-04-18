import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCHS9DpwTyjcYMDVpTKQjFaTWsvL3AAtVw",
    authDomain: "ccnlthd-6d45e.firebaseapp.com",
    projectId: "ccnlthd-6d45e",
    storageBucket: "ccnlthd-6d45e.firebasestorage.app",
    messagingSenderId: "26683036738",
    appId: "1:26683036738:web:46866e9ce9a6eee382c9db",
    measurementId: "G-3SL7B9EZLQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };