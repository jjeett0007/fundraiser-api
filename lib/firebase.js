const firebase = require("firebase/compat/app");
const config = require("../config/index");
require("firebase/compat/auth");
require("firebase/compat/firestore");

const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseUrl,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
  measurementId: config.firebase.measurementId,
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

module.exports = {
  firestore,
  firebaseConfig,
};

// Check if Firebase is connected
const auth = firebase.auth();
auth
  .signInAnonymously()
  .then(() => {
    console.log("Firebase connected");
  })
  .catch((error) => {
    console.error("Error connecting to Firebase:", error);
  });
