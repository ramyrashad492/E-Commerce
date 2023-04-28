$(window).on("load", function () {
    $(".loader-wrapper").fadeOut("slow");
});


function discountsale() {
    var finalDate = new Date("Jan 5, 2022 15:37:25").getTime();

var x = setInterval(function () {

    var now = new Date().getTime();
    var dicountTime = finalDate - now;

    var days = Math.floor(dicountTime / (1000 * 60 * 60 * 24));
    var hours = Math.floor((dicountTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((dicountTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((dicountTime % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (dicountTime < 0) {
        clearInterval(x);
        document.getElementById("days").innerHTML = "0";
        document.getElementById("hours").innerHTML = "0";
        document.getElementById("minutes").innerHTML = "0";
        document.getElementById("seconds").innerHTML = "0";
        document.getElementById('expired').innerHTML = "EXPIRED";
    }
}, 1000);

    
}


// discount function


// contact function
var contactName, contactEmail, contactMessage;
function sendContactInfo(){
    contactName = document.getElementById('contactName').value;
    document.getElementById('ddaa').innerHTML = " Thank you " + contactName + " for contacting us ";

    contactEmail = document.getElementById('contactEmail').value;
    contactMessage = document.getElementById('contactMessage').value;
    window.open('contactThank.html', "_self");
    
}

// video

