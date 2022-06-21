import { initializeApp } from 'firebase/app';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxuZacz1Ko2AldDJHp3zSJ7ErXsGXMSg0",
    authDomain: "feira-delivery-tcc.firebaseapp.com",
    databaseURL: "https://feira-delivery-tcc-default-rtdb.firebaseio.com",
    projectId: "feira-delivery-tcc",
    storageBucket: "feira-delivery-tcc.appspot.com",
    messagingSenderId: "146201771224",
    appId: "1:146201771224:web:af3d066206949ebc6debad",
    measurementId: "G-0YGHKRXWC9"
};

const app = initializeApp(firebaseConfig);
