// Start of Code

// Navigation Responsive
function navFunc() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
function toggleTheme(value) { 
    var sheets = document.getElementsByClassName('theme')

    sheets[0].href = value;  // using href attribute.
}

// to change image of artist on next click
function newArtist1() {
    document.getElementById("artist1").src = "../image/jhene.jpg";
    document.getElementById("artist2").src = "../image/tyga.jpg";
    document.getElementById("artist3").src = "../image/iggy.jpg";
}

function newArtist2() {
    document.getElementById("artist1").src = "../image/iggy.jpg";
    document.getElementById("artist2").src = "../image/rody.jpg";
    document.getElementById("artist3").src = "../image/chris.jpg";
}

// to change image and title of event on next click
function newEvent1() {
    document.getElementById("event1").src = "../image/event4.png";
    document.getElementById("event2").src = "../image/event1.png";
    document.getElementById("event3").src = "../image/event2.png";
    document.getElementById("ev1").innerHTML = "Friday Night";
    document.getElementById("ev2").innerHTML = "Coachella";
    document.getElementById("ev3").innerHTML = "Summer Fest";

}

function newEvent2() {
    document.getElementById("event1").src = "../image/event2.png";
    document.getElementById("event2").src = "../image/event3.png";
    document.getElementById("event3").src = "../image/event5.png";
    document.getElementById("ev1").innerHTML = "Summer Fest";
    document.getElementById("ev2").innerHTML = "Montreux Jazz";
    document.getElementById("ev3").innerHTML = "Breaks Show";
}

// email validating function
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Subcribe function to handle error in subscription
function subscribeSuccess() {
    var email = document.getElementById("email").value
    if (validateEmail(email)) {
        swal.fire({ //swal is SweetAlert in JavaScript
            icon: 'success', //error icon for display message
            title: 'Subscribtion Success', //title of pop-up message
            text: ' Your subscribtion has been added in successfully!', //text in error message
        })
    } else {
        swal.fire({ //swal is SweetAlert in JavaScript
            icon: 'error', //error icon for display message
            title: 'Input Error', //title of pop-up message
            text: ' Please enter your email address in proper format! Example: test@email.address', //text in error message
        })
    }
    document.getElementById("sub").reset();

}

// Show Password on click
function showPass() {
    var x = document.getElementById("pass");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}


// Top Button SLider Section
//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Music Player Variables
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specifing globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Creatingaudio element for music player
let curr_track = document.createElement('audio');

// List of Tracks
let track_list = [{
        name: "Indigo",
        artist: "Chris Brown",
        image: "../image/album2.jpg",
        path: "../audio/indigo.m4a"
    },
    {
        name: "Krabby Step",
        artist: "Tyga x Swae Lee",
        image: "../image/krabby.jpg",
        path: "../audio/krabby.m4a"
    },
    {
        name: "All Good",
        artist: "Jhene Aiko",
        image: "../image/album7.png",
        path: "../audio/jhene.m4a"
    },
    {
        name: "Rockstar",
        artist: "Roddy Ricch",
        image: "../image/album1.jpg",
        path: "../audio/rockstar.m4a"
    },
    {
        name: "Glitta",
        artist: "Tyga",
        image: "../image/Tyga.jpg",
        path: "../audio/glitta.m4a",
    },
];
// To load track 
function loadTrack(track_index) {
    clearInterval(updateTimer); // Clear the previous seek timer
    resetValues();

    // Loading a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    // Update new details of the track
    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "Music Player";

    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // Move to the next track if the current song is over
    curr_track.addEventListener("ended", nextTrack); // using the 'ended' event
}

// Function to reset all values to default
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

// To pause the track on click
function playpauseTrack() {
    if (!isPlaying) playTrack(); 
    else pauseTrack(); // Switch between playing and pausing // depending on the current state
}

// To play the track
function playTrack() {
    curr_track.play(); // Play the loaded audio
    isPlaying = true;

    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

// To pause the track
function pauseTrack() {
    curr_track.pause(); // Pause the loaded audio track
    isPlaying = false;

    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

// Go back to the first track if the current one is the last in the track list
function nextTrack() {
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;

    // Load and play the new audio track
    loadTrack(track_index);
    playTrack();
}

// Go back to the last track if the current one is the first in the track list
function prevTrack() {
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length;

    // Load and play the new track
    loadTrack(track_index);
    playTrack();
}

// Calculate the seek position by the percentage of the seek slider and get the relative duration to the track
function seekTo() {
    seekto = curr_track.duration * (seek_slider.value / 100);

    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
}

// Setting volue of audio
function setVolume() {
    curr_track.volume = volume_slider.value / 100; //percentage based
}
function seekUpdate() {
    let seekPosition = 0;
    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        // Display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
// Load the first track in the tracklist
loadTrack(track_index);


// User Login and register section
function signUp() {
    var username = document.getElementById('user').value //variable to store username
    var password = document.getElementById('pass').value //variable to store password
        // to check is user input matches username and password
    if (username == "user" && password == "pass") { //initial values for frontend part
        swal.fire({ //swal is SweetAlert in JavaScript
            icon: 'success', //error icon for display message
            title: 'Login Success', //title of pop-up message
            text: ' You have logged in successfully!', //text in error message
        })

    } else { //if username and password are incorrect
        swal.fire({ //swal is SweetAlert in JavaScript
            icon: 'error', //error icon for display message
            title: 'Input Error', //title of pop-up message
            text: 'The Username or Password is incorrect! \n Please try again with proper information', //text in error message
            button: 'Try Again'
        })
    }
    //checks if username or password is empty and display appropriate message
    if (username.trim() === "" || password.trim() === "") {
        swal.fire({ //swal is SweetAlert in JavaScript
            icon: 'error', //error icon for display message
            title: 'Login Error', //title of pop-up message
            text: 'Make sure username and password field are not kept empty!' //text in error message
        })
    }
    document.getElementById("form-login").reset();
}
// End of Code