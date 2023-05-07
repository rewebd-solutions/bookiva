import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
// import { collection, getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCyHr3B3mRWHS9NQ-ezaXA6JFsT8Jw31ng",
    authDomain: "quick-test-6788e.firebaseapp.com",
    projectId: "quick-test-6788e",
    storageBucket: "quick-test-6788e.appspot.com",
    messagingSenderId: "175116675341",
    appId: "1:175116675341:web:702181b854ca82ca0de844",
    measurementId: "G-1JL4J7D26D",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.querySelector(".sign-in").addEventListener("click", (e) => {
    e.preventDefault();
    let emailID = document.querySelector(".input-box").value;
    if (emailID){
        sendPasswordResetEmail(auth, emailID)
        .then((result) => {
            console.log("Password reset link sent successfully");
            document.querySelector(".form-container").innerHTML = `
            <h3 class="ff-inter fs-2s fw-500">Password reset link sent successfully to ${emailID}</h3>
            <h4 class="ff-inter fs-s fw-400">You can click <a href="/login/" class="ff-inter fs-s">this link</a> after resetting your password to Login again</h4>
            `; 
        }).catch((err) => {
            console.log("An error occured");
        });
    }
});

// const db = getFirestore(app);

// onAuthStateChanged(auth, async (user) => {
//     if (user){
//         console.log(auth.currentUser);