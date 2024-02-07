import { getApp, getApps, initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions} from "firebase/functions";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCyMlfh6mQeCJMgESaMTuRFItWW5vEUi_g",
    authDomain: "saas-translator-app-6b355.firebaseapp.com",
    projectId: "saas-translator-app-6b355",
    storageBucket: "saas-translator-app-6b355.appspot.com",
    messagingSenderId: "369756319692",
    appId: "1:369756319692:web:e9beb3f341232fe5def769",
    measurementId: "G-38XBRTBLLK"
  };

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, auth, functions };