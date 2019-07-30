import firebase from 'firebase'
import firestore from 'firebase/firestore'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBKo8k08wigoy4kf6x6UzpH38nXrOq1LQk",
    authDomain: "code-names-project.firebaseapp.com",
    databaseURL: "https://code-names-project.firebaseio.com",
    projectId: "code-names-project",
    storageBucket: "code-names-project.appspot.com",
    messagingSenderId: "447458991663",
    appId: "1:447458991663:web:c302946bcc566e2b"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseApp.firestore().setting({timestampsInSnapshots: true})

  export default firebaseApp.firestore()