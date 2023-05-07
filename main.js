// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyHr3B3mRWHS9NQ-ezaXA6JFsT8Jw31ng",
  authDomain: "quick-test-6788e.firebaseapp.com",
  projectId: "quick-test-6788e",
  storageBucket: "quick-test-6788e.appspot.com",
  messagingSenderId: "175116675341",
  appId: "1:175116675341:web:702181b854ca82ca0de844",
  measurementId: "G-1JL4J7D26D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     document.querySelector(".home-content").innerHTML = `
//       <span class="loader"></span>
//     `;
//     // location.href = "/venues/";
//     // getDocs for this user.. if not docs, write to Docs and redirect to pwd reset page
//     // else redirect to /venues/
//   }
// });

feather.replace();

const signInBtn = document.querySelector(".sign-in");

signInBtn.onclick = (e) => {
  e.preventDefault();
  signInBtn.innerHTML = "<span class=\"loader\" style=\"border-top: 3px solid #fff;height: 24px; width: 24px;\"></span>";

  const email = document.querySelector(".input-user")
  const pwd = document.querySelector(".input-pwd");

  pwd.style.border = "1px solid #636363c0;";
  email.style.border = "1px solid #636363c0;";
  document.querySelector(".invalid-pwd").style.display = "none";
  document.querySelector(".invalid-email").style.display = "none";

  setPersistence(auth, browserSessionPersistence).then(() => {
      signInWithEmailAndPassword(auth, email.value || '', pwd.value || '')
        .then(async (result) => {
          const docRef = doc(db, "user-data", email.value);
          const userDoc = await getDoc(docRef);
          if (userDoc.exists()){
              console.log(userDoc.data());
              location.href = "/venues/";
          }else{
              console.log("userDoc illa");
              // write code to update to doc
              // then locaion.href = "/venues/";
              await setDoc(docRef, {
                  hasResetPwd: true
              }).then((result) => {
                location.href = "/reset/";
              }).catch((err) => document.querySelector(".form-container").innerHTML = `<h3 class=\"ff-inter\">Error resetting password</h3>`);
          }
        })
        .catch((err) => {
          console.log(err);
          signInBtn.innerHTML = "Sign In";
          if (err.code === "auth/wrong-password"){
              pwd.style.border = "1px solid red";
              document.querySelector(".invalid-pwd").style.display = "block";
          }else if(err.code === "auth/too-many-requests"){
              document.querySelector(".invalid-pwd").innerHTML = "Too many failed attempts. <br> <a href=\"/reset/\">Reset password</a>";
              document.querySelector(".invalid-pwd").style.display = "block";
          }else if(err.code === "auth/user-not-found"){
              email.style.border = "1px solid red";
              document.querySelector(".invalid-email").style.display = "block";
          }
        });

    }).catch((err) => console.log(err));
};

// signIntWithG.onclick = (e) => {
//   signInWithPopup(auth, authProvider)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);

//       const token = credential.accessToken;

//       // The signed-in user info.
//       const user = result.user;
//       console.log(result, user);
//       // IdP data available using getAdditionalUserInfo(result)
//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;

//       console.log(errorCode, errorMessage);
//     });
// };
