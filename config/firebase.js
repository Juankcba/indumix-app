import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Constants from "expo-constants";
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
import { getFirestore, setDoc, doc } from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";
// add firebase config
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = getAuth();
const db = getFirestore();

export { auth, db };
