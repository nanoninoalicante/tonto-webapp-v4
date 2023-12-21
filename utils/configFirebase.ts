import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, //"AIzaSyBoz6zT0HSHd0CVmLRi6djUfjbR2RitpL8",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, //"urlo-development.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL, //"https://urlo-development-default-rtdb.firebaseio.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, //"urlo-development",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, //"urlo-development.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSENGING_SENDER_ID, //"813869637977",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID, //"1:813869637977:web:565cceeff6dc19ae76ec48",
};
console.log("firebaseConfig", firebaseConfig);
let firebaseApp = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth };
export default firebaseApp;
