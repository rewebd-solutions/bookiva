import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

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

feather.replace();

const URLParams = new URLSearchParams(location.href.split("/").slice(4, ).toString().split(",").join("/"));
console.log(URLParams);
document.querySelector(".hall-name").innerHTML = URLParams.get("hall");
document.querySelector(".hall-image").setAttribute("src","https://"+URLParams.get("hallImg"));

const userMenu = document.querySelector(".user-menu");
const startDate = document.querySelector("#from-date");
const endDate = document.querySelector("#end-date");
const startTime = document.querySelector("#from-time");
const endTime = document.querySelector("#end-time");

document.querySelector(".user-nav").addEventListener("click", (e)=>{
    e.preventDefault();
    userMenu.classList.toggle("user-menu-hidden");
});

onAuthStateChanged(auth, (user)=>{
    if (user){
        userMenu.children[0].innerHTML = `
            <h3 class="ff-inter">Welcome, ${user.displayName || user.email}</h3>
            <a class="ff-inter fs-2s user-menu-link log-out" href="#">Log out</a>
            <a class="ff-inter fs-2s user-menu-link" href="/reset/">Reset password</a>
        `;

        document.querySelector("#email").value = user.email;

        document.querySelector(".log-out").onclick = (e) => {
            e.preventDefault();
            signOut(auth).then(()=>{
                location.href = "/";
            }).catch((err)=>{
                console.log("Error occured during sign out" + err);
            });
        }

    }else{
        location.href = "/";
    }
});

const formElem = document.querySelector(".booking-form");

const checkFormValidity = () => {
    x.value;
    x.value;
    x.value;
    x.value;

    //andha 4 oda value eduthu.. currentDate odayum check pannanum

    console.log(startDate, endDate, startTime, endTime);
}

formElem.addEventListener("submit", (e) => {
    e.preventDefault();
    checkFormValidity();
})