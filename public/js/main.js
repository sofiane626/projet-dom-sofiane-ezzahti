window.onscroll = function () {
  myFunction();
};

let navbar = document.querySelector(".header-div2");

let sticky = navbar.getBoundingClientRect().top;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

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

// Référence aux éléments HTML
var modalBtn = document.getElementById("modalBtn");
var modal = document.getElementById("myModal");
var video = document.getElementById("video");
var close = document.getElementsByClassName("close")[0];

// Déclencheur pour l'ouverture du modal
modalBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

// Déclencheur pour la fermeture du modal
close.addEventListener("click", function () {
  modal.style.display = "none";
  video.contentWindow.postMessage(
    '{"event":"command","func":"pauseVideo","args":""}',
    "*"
  );
  video.src = "";
});

// Déclencheur pour fermer le modal en cliquant en dehors de la vidéo
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    video.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
    video.src = "";
  }
});

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
