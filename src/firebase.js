import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCP8fv3i5lZZ-iX_ZO2ZvI9N4ZbetbOHbw",
    authDomain: "facebook-messenger-clone-f4d52.firebaseapp.com",
    projectId: "facebook-messenger-clone-f4d52",
    storageBucket: "facebook-messenger-clone-f4d52.appspot.com",
    messagingSenderId: "43664431504",
    appId: "1:43664431504:web:029cfe38e190ce1397bb15",
    measurementId: "G-EHTYN6KNJE"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export default db