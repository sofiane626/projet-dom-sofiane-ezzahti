// -----------------------------------------------------------------------
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);
reveal();

// // Référence aux éléments HTML
// var modalBtn = document.getElementById("modalBtn");
// var modal = document.getElementById("myModal");
// var video = document.getElementById("video");
// var close = document.getElementsByClassName("close")[0];

// // Déclencheur pour l'ouverture du modal
// modalBtn.addEventListener("click", function () {
//   modal.style.display = "block";
// });

// // Déclencheur pour la fermeture du modal
// close.addEventListener("click", function () {
//   modal.style.display = "none";
//   video.contentWindow.postMessage(
//     '{"event":"command","func":"pauseVideo","args":""}',
//     "*"
//   );
//   video.src = "";
// });

// // Déclencheur pour fermer le modal en cliquant en dehors de la vidéo
// window.addEventListener("click", function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//     video.contentWindow.postMessage(
//       '{"event":"command","func":"pauseVideo","args":""}',
//       "*"
//     );
//     video.src = "";
//   }
// });

// Video header
let header_play = document.getElementsByClassName("btn-pulse")[0];

document.addEventListener("DOMContentLoaded", function () {
  let videoModal = document.querySelector("#videoModal4");
  let youtubeVideo = document.querySelector("#youtubeVideo");
  let close4Btn = document.querySelector(".close4");

  header_play.addEventListener("click", function () {
    youtubeVideo.setAttribute(
      "src",
      "https://www.youtube.com/embed/GtL1huin9EE?autoplay=1"
    );
    videoModal.style.display = "block";
  });

  close4Btn.addEventListener("click", function () {
    youtubeVideo.setAttribute("src", "");
    videoModal.style.display = "none";
  });

  videoModal.addEventListener("click", function (event) {
    if (event.target === videoModal) {
      youtubeVideo.setAttribute("src", "");
      videoModal.style.display = "none";
    }
  });
});

// -------------------------------------------------------------------------------------------

function toggleMenu() {
  const navbar = document.querySelector(".navbar");
  const burger = document.querySelector(".burger");

  burger.addEventListener("click", (e) => {
    navbar.classList.toggle("show-nav");
  });
  // bonus
  const navbarLinks = document.querySelectorAll(".navbar a");
  navbarLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      navbar.classList.toggle("show-nav");
    });
  });
}
toggleMenu();

// --------------------------------------------------------
// MENU
function filterPlats(category) {
  const plats = document.querySelectorAll(".section3-plat");
  for (const plat of plats) {
    if (category === "All" || plat.classList.contains(category)) {
      plat.style.display = "flex";
    } else {
      plat.style.display = "none";
    }
  }
}

const menuLinks = document.querySelectorAll(".section3-ul a");
for (const link of menuLinks) {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const category = event.target.innerText;
    filterPlats(category);
  });
}

// --------------------------------------------------------------------------------
// SECTION4

function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(cityName).style.display = "flex";
  evt.currentTarget.className += " active";
}

// -----------------------------------------------------------------------------------
// CAROUSSEL
const sliders = document.querySelectorAll(".slider");
// interval between switching images
// can't be less than your animation duration in css!
const interval = 3800;
// if you don't want to first animation last longer than other animations
// set animDuration (in miliseconds) to your value of animation duration in css
const animDuration = 600;

for (let i = 0; i < sliders.length; ++i) {
  const slider = sliders[i];
  const dots = slider.querySelector(".dots");
  const sliderImgs = slider.querySelectorAll(".img");

  let currImg = 0;
  let prevImg = sliderImgs.length - 1;
  let intrvl;
  let timeout;

  // Creates dots and add listeners to them
  for (let i = 0; i < sliderImgs.length; ++i) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dots.appendChild(dot);
    dot.addEventListener("click", dotClick.bind(null, i), false);
  }

  const allDots = dots.querySelectorAll(".dot");
  allDots[0].classList.add("active-dot");

  sliderImgs[0].style.left = "0";
  timeout = setTimeout(() => {
    animateSlider();
    sliderImgs[0].style.left = "";
    intrvl = setInterval(animateSlider, interval);
  }, interval - animDuration);

  /**
   * Animates images
   * @param {number} [nextImg] - index of next image to show
   * @param {boolean} [right = false] - animate to right
   */
  function animateSlider(nextImg, right) {
    if (!nextImg) nextImg = currImg + 1 < sliderImgs.length ? currImg + 2 : 1;

    --nextImg;
    sliderImgs[prevImg].style.animationName = "";

    if (!right) {
      sliderImgs[nextImg].style.animationName = "leftNext";
      sliderImgs[currImg].style.animationName = "leftCurr";
    } else {
      sliderImgs[nextImg].style.animationName = "rightNext";
      sliderImgs[currImg].style.animationName = "rightCurr";
    }

    prevImg = currImg;
    currImg = nextImg;

    currDot = allDots[currImg];
    currDot.classList.add("active-dot");
    prevDot = allDots[prevImg];
    prevDot.classList.remove("active-dot");
  }

  /**
   * Decides if animate to left or right and highlights clicked dot
   * @param {number} num - index of clicked dot
   */
  function dotClick(num) {
    if (num == currImg) return false;

    clearTimeout(timeout);
    clearInterval(intrvl);

    if (num > currImg) animateSlider(num + 1);
    else animateSlider(num + 1, true);

    intrvl = setInterval(animateSlider, interval);
  }
}

// ------------------------------------------------------------------------------------------

let sectionAllBtn = document.querySelectorAll(".section7-btn");
let translateValue = 0;
let posI = 0;

function applyColorBtn(i) {
  for (let index = 0; index < sectionAllBtn.length; index++) {
    if (index == i) {
      sectionAllBtn[index].classList.add("bkMain");
    } else {
      sectionAllBtn[index].classList.remove("bkMain");
    }
  }
}

for (let index = 0; index < sectionAllBtn.length; index++) {
  sectionAllBtn[index].addEventListener("click", () => {
    applyColorBtn(index);
    posI = index;
    translateValue = index * -100;
    let allElem = document.querySelectorAll(".section7-elem");
    allElem.forEach((elem) => {
      elem.style.transform = `translateX(${translateValue}%)`;
    });
  });
}

setInterval(() => {
  if (translateValue <= -400) {
    translateValue = 0;
    posI = 0;
  } else {
    translateValue -= 100;
    posI++;
  }
  applyColorBtn(posI);
  let allElem = document.querySelectorAll(".section7-elem");
  allElem.forEach((elem) => {
    elem.style.transform = `translateX(${translateValue}%)`;
  });
}, 4000);

// -----------------------------------------------------------------------------------------------------
// DATE

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; // janvier est 0 !
var yyyy = today.getFullYear();

if (dd < 10) {
  dd = "0" + dd;
}

if (mm < 10) {
  mm = "0" + mm;
}

today = dd + "/" + mm + "/" + yyyy;
document.getElementById("date").innerHTML = today;

// ----------------------------------------------------------------------------------------------------------------
// modal connection

// Get the modal
let modal3 = document.getElementById("myModal2");

// Get the button that opens the modal
let btn3 = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn3.onclick = function () {
  modal3.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal3.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal3.style.display = "none";
  }
};

// --------------

const connexionBtn = document.querySelector(".modal-btn button:first-child");
const inscriptionBtn = document.querySelector(".modal-btn button:last-child");
const modalBBtn = document.querySelector(".modal-btn");
const modal2 = document.querySelector("#myModal2");
const modalConnexion = document.querySelector(".modal-connexion");
const modalInscription = document.querySelector(".modal-inscription");

connexionBtn.addEventListener("click", function () {
  modalBBtn.style.display = "none";
  modalConnexion.style.display = "flex";
});

inscriptionBtn.addEventListener("click", function () {
  modalBBtn.style.display = "none";
  modalInscription.style.display = "flex";
});

modalConnexion.addEventListener("click", function () {
  modal2.style.display = "none";
  modalConnexion.style.display = "none";
  modalInscription.style.display = "none";
  modalBBtn.style.display = "flex";
});

modalInscription.addEventListener("click", function () {
  modal2.style.display = "none";
  modalConnexion.style.display = "none";
  modalInscription.style.display = "none";
  modalBBtn.style.display = "flex";
});

const darkModeBtn = document.querySelector("#dark");

darkModeBtn.addEventListener("click", function () {
  for (let i = 1; i <= 10; i++) {
    document.querySelector(`#section${i}`).style.backgroundColor = "white";
    document.querySelector(`#section${i}`).style.color = "black";
    document.querySelector(`.header-div2`).style.backgroundColor = "white";
    document.querySelector(`.header-div2`).style.color = "black";
    document.querySelector(`.header-div2-2`).style.color = "black";
    document.querySelector(`.y`).style.color = "black";
  }
});

// ------------------------------------------------------------------------------------

let mybutton5 = document.getElementById("arrowBtn");

window.onscroll = function () {
  scrollFunction();
  myFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton5.style.display = "block";
  } else {
    mybutton5.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

let navbar = document.querySelector(".header-div2");

let sticky = navbar.getBoundingClientRect().top;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}
