import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzx8IjDnllcWinM4H4FsevPlLyiKRAi7c",
  authDomain: "pitchfork-albums.firebaseapp.com",
  projectId: "pitchfork-albums",
  storageBucket: "pitchfork-albums.appspot.com",
  messagingSenderId: "956127454812",
  appId: "1:956127454812:web:a12649c5192c601f6e6899",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };