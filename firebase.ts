// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "@firebase/auth";
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
};

let _app: FirebaseApp;

const getFirebaseApp = (): FirebaseApp => {
    if (!_app) {
        _app = initializeApp(firebaseConfig);
    }
    return _app
}

export const getFirebase = () => {
    const app = getFirebaseApp()
    // Initialize database
    const db = getFirestore(app);
    // Initialize auth and google as an auth provider
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    //file storage
    const storage = getStorage(app)

    return { db, auth, provider, storage, app }
}
