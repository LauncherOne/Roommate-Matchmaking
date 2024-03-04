// JavaScript code for sticky navigation
window.onscroll = () => stickyNav();

const navbar = document.querySelector(".sticky-nav");
const sticky = navbar.offsetTop;

const stickyNav = () => window.pageYOffset >= sticky ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");

function highlightSignUp() {
    var signUpButton = document.getElementById("signup_button");
    signUpButton.style.background = "#eab9e5"; 
    signUpButton.style.border = "2px solid blue"; 

    setTimeout(function () {
        signUpButton.style = ""; 
    }, 3000); 
}
