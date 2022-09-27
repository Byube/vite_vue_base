import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmRes3faYcZ6CX5xu5xl8aS9CP70Nskqs",
    authDomain: "non-linked-service.firebaseapp.com",
    projectId: "non-linked-service",
    storageBucket: "non-linked-service.appspot.com",
    messagingSenderId: "175424890872",
    appId: "1:175424890872:web:ac900f91d029e67052180d",
    measurementId: "G-XD05M5WD4K",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const documentColRef = collection(db, "document");

// 내보내기
export default documentColRef;