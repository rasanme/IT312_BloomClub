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