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

function previewProfilePicture(event) {
    var reader = new FileReader();
    reader.onload = function () {
        var output = document.getElementById('profile-image-preview');
        output.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function editProfile() {
    var profileInputs = document.querySelectorAll('.profile-input');
    var profileValues = document.querySelectorAll('.profile-info-value');
    var saveButtonContainer = document.getElementById('saveButtonContainer');
    var editProfileButton = document.querySelector('.edit-profile-btn');

    if (profileInputs[0].style.display === "none") {
        // Switch to edit mode
        profileInputs.forEach(input => input.style.display = "inline");
        profileValues.forEach(value => value.style.display = "none");
        saveButtonContainer.style.display = "block";
        editProfileButton.value = "Save Profile";
    } else {
        // Switch back to display mode
        profileInputs.forEach(input => input.style.display = "none");
        profileValues.forEach(value => value.style.display = "inline");
        saveButtonContainer.style.display = "none";
        editProfileButton.value = "Edit Profile";
    }
}

function saveProfile() {
    var name = document.getElementById('name').value;
    var bio = document.getElementById('bio').value;
    var age = document.getElementById('age').value;
    var universityYear = document.getElementById('university-year').value;
    var gender = document.getElementById('gender').value;
    var roommatePreference = document.getElementById('roommate-preference').value;
    var location = document.getElementById('location').value;
    var petFriendly = document.getElementById('pet-friendly').value;
    var accommodationType = document.getElementById('accommodation-type').value;
    var studentStatus = document.getElementById('student-status').value;
    var budget = document.getElementById('budget').value;

    var profileInfoDiv = document.getElementById('profile-information');
    profileInfoDiv.innerHTML = `
        <h2>${name}</h2>
        <p class="bio">${bio}</p>
        <p>Age: ${age}</p>
        <p>Year in University: ${universityYear}</p>
        <p>Gender: ${gender}</p>
        <p>Roommate Preference: ${roommatePreference}</p>
        <p>Preferred Location: ${location}</p>
        <p>Pet-Friendly: ${petFriendly}</p>
        <p>Type of Accommodation: ${accommodationType}</p>
        <p>Student Status: ${studentStatus}</p>
        <p>Budget: ${budget}</p>
    `;
    
    toggleEditProfile(); // Hide the edit profile section after saving
}

