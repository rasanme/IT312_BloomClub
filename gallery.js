// Runs when the user clicks the "Book the ticket" button
function bookTicket() {
  // Ask the user to confirm: OK gives true, Cancel gives false
  var sure = confirm("Do you want to book your seat?\n\nPress OK to confirm or Cancel to go back.");

  if (sure) {
    // The user pressed OK: show the success message
    alert("Your seat has been booked successfully!\nWe can't wait to see you at Bloom Club.");
  } else {
    // The user pressed Cancel: show the cancel message
    alert("Booking cancelled. You can book anytime!");
  }
}

// Connect the button to the function (no brackets, so it runs only on click)
document.getElementById("bookBtn").onclick = bookTicket;