// 🔥 CONFIGURATION FIREBASE
// Remplace les valeurs ci-dessous par tes identifiants Firebase
// https://console.firebase.google.com/

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

console.log('Firebase configuré ✓');
