import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAFO0hZ47ZmUpFijMPiGis5DPQdtwoJXuc",
    authDomain: "whatsapp-clone-8e885.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-8e885.firebaseio.com",
    projectId: "whatsapp-clone-8e885",
    storageBucket: "whatsapp-clone-8e885.appspot.com",
    messagingSenderId: "395591786533",
    appId: "1:395591786533:web:396d3c9148cebb08515fcc",
    measurementId: "G-8WF4W88EJF"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();
  export {auth,provider};
  export default db;