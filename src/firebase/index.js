// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";




  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC8rYDg_2_SCusYXCUiwYqKatLFOX3wmnA",
    authDomain: "joke-meme-lines.firebaseapp.com",
    databaseURL: "https://joke-meme-lines-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "joke-meme-lines",
    storageBucket: "joke-meme-lines.appspot.com",
    messagingSenderId: "784784414326",
    appId: "1:784784414326:web:f8bde94f277ce3c6f1f157",
    measurementId: "G-Q8TSR7BZY7"
  });

  
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  

  const storage = firebase.storage();

  export default db;
  export {auth, provider, storage};


  
