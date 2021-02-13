import firebase from "firebase/app";

import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLHXvJp6zytavwT7xWvl45RuCfqyGduyU",
  authDomain: "th-app-30797.firebaseapp.com",
  projectId: "th-app-30797",
  storageBucket: "th-app-30797.appspot.com",
  messagingSenderId: "209890094762",
  appId: "1:209890094762:web:2351fd2e1513a9f722aad3",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
