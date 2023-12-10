import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRnEKTu-xS7-xxaaL8ue-qin-kWzENhac",
  authDomain: "inovact-dashboard.firebaseapp.com",
  projectId: "inovact-dashboard",
  storageBucket: "inovact-dashboard.appspot.com",
  messagingSenderId: "558305735764",
  appId: "1:558305735764:web:1193ae0f51131ee4d169c1",
  measurementId: "G-08YNDRG75L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
export const auth = getAuth(app);
