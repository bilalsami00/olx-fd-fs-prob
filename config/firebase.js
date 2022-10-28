// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
import { getFirestore,getDocs, getDoc, collection, addDoc, setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js'
import {getStorage, ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-storage.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC949SfuqfHq1oW_D3zlcEFjyi71EyV_o0",
  authDomain: "olx-db-eb220.firebaseapp.com",
  projectId: "olx-db-eb220",
  storageBucket: "olx-db-eb220.appspot.com",
  messagingSenderId: "874907797154",
  appId: "1:874907797154:web:0ed08e04ad158c128839fb",
  measurementId: "G-QK4PPNF2WH"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore(app)

const storage = getStorage(app);


// signUp
async function signUpNewUser(userInfo){

    const { email, password } = userInfo

   const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
   await addUserToDb(userInfo, userCredentials.user.uid)

}

// signIn
function signInUser(email, password){
   return signInWithEmailAndPassword(auth, email, password)
}


// user to database
function addUserToDb(userInfo,uid) { 
   const    { email, fullname, age } = userInfo
   return setDoc (doc(db, "users", uid), {email, fullname, age})      
}

// posting ad to database
function postAdToDb(adTitle,price,description){
  const userId = auth.currentUser.uid
  return addDoc(collection(db, 'ads'), {adTitle,price,description,userId })
}


// uploading image ?
async function uploadImage(image) {
  const storageRef = ref(storage, `images/${image.name}`)
  const snapshot = await uploadBytes(storageRef, image)
  const url = await getDownloadURL(snapshot.ref)
  return url;
}


// getting ad from database
async function getAdsFromDb(){  
  const querySnapshot = await getDocs(collection(db, "ads")) //DB se data le rhe hain aur variable me save horha hai
  const ads = []; //empty array create ki hai kis me data from DB push hoga
  querySnapshot.forEach((doc)=> { // variable pe for loop laga hai jis me doc 
      ads.push({id:doc.id, ...doc.data()}) //
  });
  return ads;
}

function getFirebaseAd(id) {
  const docRef = doc(db, "ads", id);
  return getDoc(docRef)
}

function getFirebaseUser(userID) {
  const docRef = doc(db, "users", userID)
  return getDoc(docRef)
}


export {
    signUpNewUser,
    signInUser,
    postAdToDb,
    uploadImage,
    getAdsFromDb,
    getFirebaseAd,
    getFirebaseUser

}

