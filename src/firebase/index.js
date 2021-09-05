// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";




  const firebaseApp = firebase.initializeApp({
    apiKey: "YOUR-API-KEY",
    authDomain: "joke-meme-lines.firebaseapp.com",
    databaseURL: "https://joke-meme-lines-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "joke-meme-lines",
    storageBucket: "joke-meme-lines.appspot.com",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  });

  
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  

  const storage = firebase.storage();

  export default db;
  export {auth, provider, storage};


  
