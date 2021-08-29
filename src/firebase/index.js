// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { firebaseConfig } from '../env'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export default firebase.firestore()
