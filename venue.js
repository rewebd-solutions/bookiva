import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";

feather.replace();

var hallDetails;

const getData = async () => {
    const collectionsRef = collection(db, "card-data");
    const dbSnapShot = await getDocs(collectionsRef);
    hallDetails = dbSnapShot.docs.map((snap) => snap.data());
    dbSnapShot.forEach((doc)=> {
        const hallInfo = doc.data();
        // console.log(hallInfo);
        renderCards(hallInfo);
    }); 
    cardsContainer.innerHTML = `<div class="overlay overlay-hidden"></div>
    <div class="popup-modal-wrapper popup-hidden">
        
    </div>
    ` + renderedCards;
    document.querySelectorAll(".details-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(e.target.dataset.venue);
        });
    });//for addEventListener("click", (e) => {
    //     e.preventDefault();
    //     openModal(e.target.dataset.venue);
    // })
}

const userMenu = document.querySelector(".user-menu");
const cardsContainer = document.querySelector(".cards-container");

document.querySelector(".user-nav").addEventListener("click", (e)=>{
    e.preventDefault();
    userMenu.classList.toggle("user-menu-hidden");
});

var renderedCards = '';

// card data
// distFromGate
// hallName
// imgUrl
// isReserved
// isAvailable
// hasAC
// carouselPics
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
            <a href="#" class="butt-main details-btn ff-inter fs-s" data-venue="${cardData.hallName}">DETAILS</a>
        </div>\n`;
    ;
}

var modal;
var overlay;

function openModal(venue) {
    modal = document.querySelector(".popup-modal-wrapper");
    overlay = document.querySelector(".overlay");
    if (screen.width <= 500) document.body.classList.toggle("body-noscroll");
    overlay.classList.toggle("overlay-hidden");
    modal.classList.toggle("popup-hidden");
    if (!modal.classList.contains("popup-hidden")) {
        renderModal(venue);
    }
}

function renderModal(venue){
    const hallMarkup = hallDetails.filter((hall) => hall.hallName === venue).map((hall) => {
        return `<div class="close-btn-wrapper"><a href="#" class="close-btn ff-inter fs-2s fw-500""><i data-feather="x"></i>  </a></div>
            <div class="popup-modal">
                <div class="swiper">
                    <div class="swiper-wrapper">
                    ${hall.carouselPics.map((img) =>  `<div class="swiper-slide"><img src=${img}></div>`).join('\n')}
                    </div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-pagination"></div>
                </div>
                
                <div class="popup-details">
                    <div class="venue-info">
                        <h2 class="ff-inter fw-600">${hall.hallName}, ${hall.campus}</h2>
                        <hr class="hr-venue"/>
                        <p class="ff-inter fs-2s"><i data-feather="info"></i> Number of seats: ${hall.seatingCapacity}</p>
                        <p class="ff-inter fs-2s"><i data-feather="info"></i> Has AC? ${hall.hasAC?'Yes':'No'}</p>
                        <p class="ff-inter fs-2s"><i data-feather="info"></i> Is projector available? ${hall.projectorAvailable?'Yes':'No'}</p>
                        <p class="ff-inter fs-2s"><i data-feather="info"></i> Is the hall reserved? ${hall.isReserved?'Yes':'No'}</p>
                        ${hall.isReserved? `<p class="ff-inter fs-2s"><i data-feather="info"></i> Hall reserved by: ${hall.reservedBy}</p>`:''}
                        <p class="ff-inter fs-2s"><i data-feather="info"></i> Distance from main gate: ${hall.distFromGate}</p>
                    </div>
                    <div class="venue-card">
                        <div class="venue-card-details">
                            <!--hall is commonly available for everyone to book ahillaya nu oru field-->
                            <div>
                                ${hall.isAvailable?`<i data-feather="check-circle"></i>
                                <p class="ff-inter fs-2s">This hall is in working condition to reserve.</p>`:`<i data-feather="x-circle"></i>
                                <p class="ff-inter fs-2s">This hall is not in working condition to reserve.</p>`}
                                ${hall.isAvailable?`<p class="ff-inter fs-s" style="margin-top:1rem;">Proceed to book ${auth.currentUser === null?`after logging in`: `as <strong>${auth.currentUser.email}</strong> to confirm dates`}, by clicking the button below</p>`:`<p class="ff-inter fs-s" style="margin-top:1rem;">Contact admin for further help</p>`}
                            </div>
                        </div>
                        ${auth.currentUser === null? `<a href="/login/" class="ff-inter butt-sub sign-in fs-s  ${hall.isAvailable?``:`disabled`}">Login</a>`:`<a href="/book/?hall=${hall.hallName}&hallImg=${hall.imgUrl.split("//")[1]}" class="ff-inter butt-main sign-in fs-s ${hall.isAvailable?``:`disabled`}">Book Now</a>`}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    modal.innerHTML = hallMarkup;
    feather.replace();
    document.querySelector(".close-btn").addEventListener("click", (e) => {
        e.preventDefault();
        openModal(" ");
    })
    var swiper = new Swiper(".swiper", {
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
        },
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    }); 
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
        // console.log(user.email);
        userMenu.children[0].innerHTML = `
            <h3 class="ff-inter">Welcome, ${user.displayName || user.email}</h3>
            <a class="ff-inter fs-2s user-menu-link log-out" href="#">Log out</a>
            <a class="ff-inter fs-2s user-menu-link" href="/reset/">Reset password</a>
        `;
        document.querySelector(".log-out").onclick = (e) => {
            e.preventDefault();
            signOut(auth).then(()=>{
                location.href = "/";
            }).catch((err)=>{
                console.log("Error occured during Sign out" + err);
            });
        }
    }else{
        // document.querySelector(".cards-container").innerHTML = `
        //     <h3 class="ff-inter fs-m">You are not logged in, please <a href="/login/">log-in</a> now</h3>
        // `;

        // write code to display "Log In" button instead of "Reserve" button when user is using Modal
    }
});

getData();