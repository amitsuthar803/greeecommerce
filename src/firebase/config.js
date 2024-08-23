import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDYAuHB1FwQ4zk4TByt4rYtcVeRxnLSf0s",
  authDomain: "gree-ecommerce.firebaseapp.com",
  projectId: "gree-ecommerce",
  storageBucket: "gree-ecommerce.appspot.com",
  messagingSenderId: "400029802169",
  appId: "1:400029802169:web:a5c048d3f298a9968a0568",
};

const app = initializeApp(firebaseConfig);

export default app;
