import firebase from 'firebase/app';
import 'firebase/auth';
import { firestore } from 'firebase';
const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

export const auth = app.auth();
export const fireStore = app.firestore();
export const db = {
    folders: fireStore.collection('folders'),
    files: fireStore.collection('files'),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
    formattedDoc: (doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        };
    },
};
export default app;
