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

document.addEventListener("DOMContentLoaded", function() {
    const listingsSection = document.querySelector(".view-listings");
    const createListingSection = document.querySelector(".create-listing");

    // Check if there are any listings available
    const listings = listingsSection.querySelectorAll(".listing");
    if (listings.length === 0) {
        // Hide the view listings section
        listingsSection.style.display = "none";
        // Display the create listing section
        createListingSection.style.display = "block";
    } else {
        // Hide the create listing section
        createListingSection.style.display = "none";
        // Show the view listings section
        listingsSection.style.display = "block";
    }

    const deleteListingBtns = document.querySelectorAll(".delete-listing-btn");
    deleteListingBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            // Remove the listing from the UI
            btn.parentNode.remove();

            // Check if there are any listings left
            const remainingListings = listingsSection.querySelectorAll(".listing");
            if (remainingListings.length === 0) {
                // Hide the view listings section
                listingsSection.style.display = "none";
                // Display the create listing section
                createListingSection.style.display = "block";
            }
        });
    });

    const createListingForm = document.getElementById("listing-form");
    createListingForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Extract image and description inputs
        const imageInput = document.getElementById("listing-image");
        const descriptionInput = document.getElementById("listing-description");

        // Get the image source and description
        const imageSrc = imageInput.value; // Assuming imageInput.value contains the image URL
        const descriptionText = descriptionInput.value;

        // Create a new listing element
        const newListing = document.createElement("div");
        newListing.classList.add("listing");

        // Set the image and description
        newListing.innerHTML = `
            <img src="${imageSrc}" alt="Listing Image">
            <p>${descriptionText}</p>
            <button class="edit-listing-btn">Edit</button>
            <button class="delete-listing-btn">Delete</button>
        `;

        // Append the new listing to the view listings section
        listingsSection.appendChild(newListing);

        // Hide the create listing section
        createListingSection.style.display = "none";
        // Show the view listings section
        listingsSection.style.display = "block";

        // Reset form inputs
        createListingForm.reset();
    });

    // Handle click on "Edit" button
    listingsSection.addEventListener("click", function(event) {
        if (event.target.classList.contains("edit-listing-btn")) {
            // Find the listing container
            const listingContainer = event.target.closest(".listing");

            // Extract the image source and description
            const imageSrc = listingContainer.querySelector("img").getAttribute("src");
            const descriptionText = listingContainer.querySelector("p").textContent;

            // Populate the create listing form with the current listing details
            document.getElementById("listing-image").value = imageSrc;
            document.getElementById("listing-description").value = descriptionText;

            // Show the create listing section
            createListingSection.style.display = "block";
            // Hide the view listings section
            listingsSection.style.display = "none";
        }
    });
});

//firebase user authentication and database

const firebaseConfig = {
    apiKey: "AIzaSyCBY5xCnq3BMN__V6bLR6ZpUJS5UoQRbVU",
    authDomain: "roommate-match-making.firebaseapp.com",
    projectId: "roommate-match-making",
    storageBucket: "roommate-match-making.appspot.com",
    messagingSenderId: "1086011648278",
    appId: "1:1086011648278:web:a37275f476af35c2fc8837",
    measurementId: "G-03Y8JYTZS5"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  //initializing our variables
  const database = firebase.database();
  const auth = firebase.auth();

  //setting up our register funtion

  button = document.getElementById("btn1");
  button.addEventListener('submit', register())

  function register(){
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    username = document.getElementById("username").value;
    confirmPassword = document.getElementById("confirmPassword").value;

    //validate input fields
    if(validate_email(email) == false || validate_password(password) == false){
        alert("Incorrect format of email and password")
        return;
        //stops running the code until it's fixed
    }

    if(validate_field(username) == false || validate_field(confirmPassword) == false){
        alert("Fields are missing")
    }

    //authenticating our users
    auth.createUserWithEmailAndPassword(email, password)
    .then(function(){

        var user = auth.currentUser;
        //add user to firebase database
        var database_ref = database.ref;
        var user_data = {
            email : email,
            username: username,
            last_login: Date.now()
        }

        database_ref.child("users/" + user.uid).set(user_data);



        alert("Sign up successful");

    })
    .catch(function(error){
        var error_code = error.code;
        var error_message = error.message

        alert(error.message);
    })
  }

  //setting up our login function
  function login(){

email = document.getElementById("email").value;
  password = document.getElementById("password").value;


    //validate input fields
    if(validate_email(email) == false || validate_password(password) == false){
        alert("Incorrect format of email and password")
        return;
        //stops running the code until it's fixed
    }

    auth.signInWithEmailAndPassword(email,password)
    .then(function(){
        var user = auth.currentUser;
        //add user to firebase database
        var database_ref = database.ref;
        var user_data = {
           
            last_login: Date.now()
        }

        database_ref.child("users/" + user.uid).update(user_data);



        alert("User Logged In");

    })
    .catch(function(error){
        var error_code = error.code;
        var error_message = error.message

        alert(error.message);
    })
  }
 

  //validating input fields
  function validate_email(email){
    expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if(expression.test(email) == true){
        //email is good
        return true;
    }
    else{
        return false;
    }

  }

  function validate_password(password){
    if(password < 6 ){
        return false;
    }
    else{
        return true;
    }
  }

  function validate_field(field){
    if(field == null){
        return false;
    }

    if(field.length <= 0){
        return false;
    }
    else{
        return true;
    }
  }



