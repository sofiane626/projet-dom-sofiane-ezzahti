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
