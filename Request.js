var requests = [];

function checkRequest() {
    var offeringField = document.getElementById("offering");
    var nameField = document.getElementById("fullname");
    var dateField = document.getElementById("preferred-date");

    var offering = offeringField.value;
    var name = nameField.value;
    var date = dateField.value;
    var message = "";

    // reset the borders from a previous attempt
    offeringField.style.border = "";
    nameField.style.border = "";
    dateField.style.border = "";

    // Rule 1: an offering must be selected
    if (offering == "") {
        offeringField.style.border = "2px solid red";
        message = message + "- Please choose an offering.\n";
    }

    // Rule 2: full name (two words, no numbers, no ? ! @)
    if (name == "") {
        nameField.style.border = "2px solid red";
        message = message + "- Please enter your full name.\n";
    } else {
        var nameProblem = "";

        // a full name needs a space between two words (not at the start or the end)
        if (name.indexOf(" ") == -1 || name.charAt(0) == " " || name.charAt(name.length - 1) == " ") {
            nameProblem = nameProblem + "- Please enter your full name (first and last name, e.g. Huda Saleh).\n";
        }

        var hasDigit = false;
        var hasSymbol = false;
        for (var i = 0; i < name.length; i++) {
            var ch = name.charAt(i);
            if (ch != " " && !isNaN(parseInt(ch))) {
                hasDigit = true;
            }
            if (ch == "?" || ch == "!" || ch == "@") {
                hasSymbol = true;
            }
        }
        if (hasDigit) {
            nameProblem = nameProblem + "- The name cannot contain numbers.\n";
        }
        if (hasSymbol) {
            nameProblem = nameProblem + "- The name cannot contain the characters ? ! or @.\n";
        }

        if (nameProblem != "") {
            nameField.style.border = "2px solid red";
            message = message + nameProblem;
        }
    }

    // Rule 3: the preferred date must be in the future (after today)
    if (date == "") {
        dateField.style.border = "2px solid red";
        message = message + "- Please choose a preferred date.\n";
    } else {
        var parts = date.split("-");            // ["2026", "12", "01"]
        var year = parseInt(parts[0]);
        var month = parseInt(parts[1]);
        var day = parseInt(parts[2]);

        var today = new Date();
        var todayYear = today.getFullYear();
        var todayMonth = today.getMonth() + 1;  // getMonth() starts from 0
        var todayDay = today.getDate();

        var isFuture = false;
        if (year > todayYear) {
            isFuture = true;
        } else if (year == todayYear) {
            if (month > todayMonth) {
                isFuture = true;
            } else if (month == todayMonth) {
                if (day > todayDay) {
                    isFuture = true;
                }
            }
        }

        if (!isFuture) {
            dateField.style.border = "2px solid red";
            message = message + "- The preferred date must be a future date (after today).\n";
        }
    }

    // Stop if anything is wrong, and say exactly what
    if (message != "") {
        alert("Your request was not sent. Please fix the following:\n\n" + message);
        return;
    }

    // All checks passed: save the request in the global array
    var req = { offering: offering, member: name, date: date };
    requests.push(req);

    // OK = stay on this page, Cancel = go back to the dashboard
    var stay = confirm("Your request was sent successfully!\n\nPress OK to stay on this page and add another request.\nPress Cancel to return to the Member Dashboard.");

    if (stay) {
        showRequests();
        offeringField.value = "";
        nameField.value = "";
        dateField.value = "";
    } else {
        window.location.href = "member-dashboard.html";
    }
}

// Rebuild the box from the whole array, so ALL requests are shown
function showRequests() {
    var html = "<h2>Requests Added in This Visit</h2>";
    html = html + "<table><tr><th>Offering Name</th><th>Member Name</th><th>Preferred Date</th></tr>";
    for (var i = 0; i < requests.length; i++) {
        html = html + "<tr><td>" + requests[i].offering + "</td><td>" + requests[i].member +
               "</td><td>" + requests[i].date + "</td></tr>";
    }
    html = html + "</table>";

    var box = document.getElementById("requestsBox");
    box.innerHTML = html;
    box.style.display = "block";
}

document.getElementById("submitBtn").onclick = checkRequest;
