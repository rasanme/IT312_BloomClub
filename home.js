var currentTheme = 1;

// colors of the peach theme
function setPeachTheme() {
  var header = document.querySelector(".header-top");
  var footer = document.querySelector("footer");
  var button = document.getElementById("themeBtn");

  document.body.style.backgroundColor = "#FFE8D6";
  document.body.style.color = "#8B4513";
  if (header)
    header.style.backgroundColor = "#dba886";
  if (footer)
    footer.style.backgroundColor = "#dba886";
  if (button) {
    button.innerHTML = "Default Theme";
    button.style.backgroundColor = "#dba886";
  }
  currentTheme = 2;
}

// colors of the default theme
function setDefaultTheme() {
  var header = document.querySelector(".header-top");
  var footer = document.querySelector("footer");
  var button = document.getElementById("themeBtn");

  document.body.style.backgroundColor = "#faf8f5";
  document.body.style.color = "#000000";
  if (header)
    header.style.backgroundColor = "#5F7334";
  if (footer)
    footer.style.backgroundColor = "#5F7334";
  if (button) {
    button.innerHTML = "Peach Theme";
    button.style.backgroundColor = "#5F7334";
  }
  currentTheme = 1;
}

// apply the saved theme when any page opens
function applyTheme() {
  if (localStorage.getItem("theme") == "peach") {
    setPeachTheme();
  }
}

// runs when the user clicks the theme button on the Home Page
function switchTheme() {
  if (currentTheme == 1) {
    setPeachTheme();
    localStorage.setItem("theme", "peach");
  } else {
    setDefaultTheme();
    localStorage.setItem("theme", "default");
  }
}

applyTheme();

var themeButton = document.getElementById("themeBtn");
if (themeButton)
  themeButton.onclick = switchTheme;

// real-time clock in the footer (Home Page)
function showClock() {
  var clock = document.getElementById("clock");
  if (clock == null)
    return;

  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  clock.innerHTML = "Current time: " + hours + ":" + minutes + ":" + seconds;
}

// show the "Back to Top" button after scrolling down
function checkScroll() {
  var topButton = document.getElementById("backToTop");
  if (topButton == null)
    return;

  if (window.scrollY > 300) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}

if (document.getElementById("clock")) {
  showClock();
  setInterval(showClock, 1000);
}

checkScroll();
window.onscroll = checkScroll;

// ===== Extra functionality 1: Flower Language & Symbolism Guide =====
// the meaning of each flower is hidden until the user clicks the card
function toggleMeaning() {
  var meaning = this.querySelector("p");
  var hint = this.querySelector(".symbol-hint");

  if (meaning.style.display == "none") {
    meaning.style.display = "block";
    hint.innerHTML = "Click to hide the meaning";
  } else {
    meaning.style.display = "none";
    hint.innerHTML = "Click to reveal the meaning";
  }
}

var flowers = document.querySelectorAll(".symbolism-item");
for (var f = 0; f < flowers.length; f++) {
  flowers[f].querySelector("p").style.display = "none";
  flowers[f].innerHTML = flowers[f].innerHTML + "<small class='symbol-hint'>Click to reveal the meaning</small>";
  flowers[f].style.cursor = "pointer";
  flowers[f].setAttribute("tabindex", "0");
  flowers[f].onclick = toggleMeaning;
  flowers[f].onkeydown = function (event) {
    if (event.key == "Enter")
      toggleMeaning.call(this);
  };
}

// ===== Extra functionality 2: Events Calendar =====
// clicking a day that has an event asks the user to book it
function bookEvent() {
  var day = this.querySelector(".calendar-day").innerHTML;
  var eventName = this.querySelector(".calendar-note").innerHTML;

  if (confirm(eventName + " is on " + day + " November 2026.\n\nDo you want to request to join this event?")) {
    window.location.href = "request-form.html";
  }
}

var eventDays = document.querySelectorAll(".events-calendar td");
for (var d = 0; d < eventDays.length; d++) {
  if (eventDays[d].querySelector(".calendar-note") != null) {
    eventDays[d].style.cursor = "pointer";
    eventDays[d].title = "Click to join this event";
    eventDays[d].setAttribute("tabindex", "0");
    eventDays[d].onclick = bookEvent;
    eventDays[d].onkeydown = function (event) {
      if (event.key == "Enter")
        bookEvent.call(this);
    };
  }
}