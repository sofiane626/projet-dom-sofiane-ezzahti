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
