import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyBSoS7OSnAeLydtFK8e-VOuwM6ADF71oZY",
      authDomain: "twittertestpj.firebaseapp.com",
      projectId: "twittertestpj",
      storageBucket: "twittertestpj.appspot.com",
      messagingSenderId: "292895062936",
      appId: "1:292895062936:web:6fc4803a8bab5d955b09ed",
      measurementId: "G-4D9Q6CCKMS"
    }
  )
}
export default firebase