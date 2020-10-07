import firebase from 'firebase'
import "firebase/database"

  // Your web app's Firebase configuration
  const Config = {
    apiKey: "AIzaSyBb0A_tJ_07HSXb1aRMe-E5fH7n3myqlQI",
    authDomain: "vue-kadai-4-firebase.firebaseapp.com",
    databaseURL: "https://vue-kadai-4-firebase.firebaseio.com",
    projectId: "vue-kadai-4-firebase",
    storageBucket: "vue-kadai-4-firebase.appspot.com",
    messagingSenderId: "814784905094",
    appId: "1:814784905094:web:089cd1e43c3e569108b607"
  };
  // Initialize Firebase
  firebase.initializeApp(Config);

  export default firebase