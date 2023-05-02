import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

feather.replace();

const userMenu = document.querySelector(".user-menu");

document.querySelector(".user-nav").addEventListener("click", (e)=>{
    e.preventDefault();
    userMenu.classList.toggle("user-menu-hidden");
});

const firebaseConfig = {
    apiKey: "AIzaSyCyHr3B3mRWHS9NQ-ezaXA6JFsT8Jw31ng",
    authDomain: "quick-test-6788e.firebaseapp.com",
    projectId: "quick-test-6788e",
    storageBucket: "quick-test-6788e.appspot.com",
    messagingSenderId: "175116675341",
    appId: "1:175116675341:web:702181b854ca82ca0de844",
    measurementId: "G-1JL4J7D26D"
};
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user)=>{
    if (user){
        console.log(user.email);
        userMenu.children[0].innerHTML = `
            <h3 class="ff-inter">Welcome, ${user.email}</h3>
            <a class="ff-inter fs-2s user-menu-link" href="#">Log out</a>
        `;
        document.querySelector(".user-menu-link").onclick = (e) => {
            e.preventDefault();
            signOut(auth).then(()=>{
                //
            }).catch((err)=>{
                console.log("nakku");
            });
            location.href = "/";
        }
    }else{
        document.querySelector(".cards-container").innerHTML = `
            <h3 class="ff-inter fs-m">You are not logged in, please <a href="/login/">log-in</a> now</h3>
        `;
    }
});

