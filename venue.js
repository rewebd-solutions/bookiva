import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";

feather.replace();

const userMenu = document.querySelector(".user-menu");
const cardsContainer = document.querySelector(".cards-container");

document.querySelector(".user-nav").addEventListener("click", (e)=>{
    e.preventDefault();
    userMenu.classList.toggle("user-menu-hidden");
});

var renderedCards = '';

const getData = async () => {
    const collectionsRef = collection(db, "card-data");
    const dbSnapShot = await getDocs(collectionsRef);
    dbSnapShot.forEach((doc)=> {
        const hallInfo = doc.data();
        // console.log(hallInfo);
        renderCards(hallInfo);
        console.log(renderedCards);
    }); //call renderCards(dbSnapShot)
    cardsContainer.innerHTML += renderedCards;
}

// card data
// distFromGate
// hallName
// imgUrl
// isReserved
// projectorAvailable
// rating
// reservedBy
// seatingCapacity

const renderCards = (cardData) => {
    renderedCards += 
        `<div class="hall-card">
            <div class="hall-img">
                <img src="${cardData.imgUrl}" alt="${cardData.hallName}">
            </div>
            <div class="hall-info ff-inter">
                <div class="hall-name-star">
                    <h3 class="hall-name"> ${cardData.hallName} </h3>
                    <h3 class="hall-rating">⭐ ${cardData.rating}</h3>
                </div>
                <p>${cardData.seatingCapacity}</p>
                <p>${cardData.isReseverd?"Reserved":"Unreserved"}</p>
            </div>
            <a href="#" class="butt-main details-btn ff-inter fs-s">DETAILS</a>
        </div>\n`;
    ;
}

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
const db = getFirestore(app);

onAuthStateChanged(auth, (user)=>{
    if (user){
        console.log(user.email);
        userMenu.children[0].innerHTML = `
            <h3 class="ff-inter">Welcome, ${user.displayName || user.email}</h3>
            <a class="ff-inter fs-2s user-menu-link" href="#">Log out</a>
        `;
        getData();
        document.querySelector(".user-menu-link").onclick = (e) => {
            e.preventDefault();
            signOut(auth).then(()=>{
                location.href = "/";
            }).catch((err)=>{
                console.log("nakku");
            });
        }
    }else{
        document.querySelector(".cards-container").innerHTML = `
            <h3 class="ff-inter fs-m">You are not logged in, please <a href="/login/">log-in</a> now</h3>
        `;
    }
});

