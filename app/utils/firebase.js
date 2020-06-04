import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCWiXP2VKB_1Y9_YSq3NJ_n4EjyCkvp56U",
    authDomain: "tenedores-a5f53.firebaseapp.com",
    databaseURL: "https://tenedores-a5f53.firebaseio.com",
    projectId: "tenedores-a5f53",
    storageBucket: "tenedores-a5f53.appspot.com",
    messagingSenderId: "412872089291",
    appId: "1:412872089291:web:346b64e775d58fa339054e"
};

export const firebaseApp5T = firebase.initializeApp(firebaseConfig);