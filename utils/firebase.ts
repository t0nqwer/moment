import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7vdnuhuczzp4fBBzOMbQtw1rINa74Ryo",
  authDomain: "momentproject-d2b81.firebaseapp.com",
  projectId: "momentproject-d2b81",
  storageBucket: "momentproject-d2b81.appspot.com",
  messagingSenderId: "1029156531554",
  appId: "1:1029156531554:web:7cbfdbdf3e6b0eb777d03b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
