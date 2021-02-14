import firebase from "firebase/app";

//firebase storage インポート（画像UPLOAD用）
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDLHXvJp6zytavwT7xWvl45RuCfqyGduyU",
  authDomain: "th-app-30797.firebaseapp.com",
  projectId: "th-app-30797",
  storageBucket: "th-app-30797.appspot.com",
  messagingSenderId: "209890094762",
  appId: "1:209890094762:web:2351fd2e1513a9f722aad3",
};

firebase.initializeApp(firebaseConfig);

const storage_obj = firebase.storage();

export default firebase;
export const storage = storage_obj;
