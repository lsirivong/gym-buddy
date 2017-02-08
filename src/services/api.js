import routines from '../data/routines.json';

const { firebase } = window;

export function boot(dispatch) {
  // Initialize Firebase
  var config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  };
  firebase.initializeApp(config)
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: 'INITIALIZE_USER',
        user: user,
      })
    }
  })
}

export function login(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export function requestRoutines() {
  return routines
}

export function saveExercise(payload) {
  return firebase.database().ref('workouts').push(payload)
}

