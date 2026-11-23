// all activity leaders and instructors (array of objects)
var leaders = [
    { name: "Rasan Sultan", photo: "images/profilePicture3.png" },
    { name: "Sara", photo: "images/profilePicture4.jpg" },
    { name: "Joud", photo: "images/profilePicture2.jpg" },
    { name: "Ghada", photo: "images/profilepicture1.png" }
];

// build the checkbox list from the array
function showLeaders() {
    var html = "";
    for (var i = 0; i < leaders.length; i++) {
        html = html + "<label class='mgr-member' for='del-" + i + "'>"
            + "<input type='checkbox' id='del-" + i + "' name='delete' value='" + i + "'>"
            + "<img src='" + leaders[i].photo + "' alt='" + leaders[i].name + " photo'>"
            + "<span>" + leaders[i].name + "</span>"
            + "</label>";
    }
    if (leaders.length == 0) {
        html = "<p>There are no instructors in the list.</p>";
    }
    document.getElementById("leadersContainer").innerHTML = html;
}

function deleteLeader() {
    var checked = document.querySelectorAll("input[name='delete']:checked");

    if (checked.length == 0) {
        alert("Please select at least one activity leader or instructor.");
        return false;
    }

    if (confirm("Are you sure you want to delete the selected leader/s?")) {
        // delete from the end so the indexes do not change
        for (var i = checked.length - 1; i >= 0; i--) {
            var index = parseInt(checked[i].value);
            leaders.splice(index, 1);
        }
        showLeaders();
        alert("Leader/s deleted successfully.");
    }
    return false;
}

function addLeader() {
    var name = document.getElementById("inst-name");
    var photo = document.getElementById("inst-photo");
    var dob = document.getElementById("inst-dob");
    var email = document.getElementById("inst-email");
    var expertise = document.getElementById("inst-expertise");
    var skills = document.getElementById("inst-skills");
    var education = document.getElementById("inst-education");

    var fields = [name, photo, dob, email, expertise, skills, education];
    var message = "";
    var empty = false;

    // 1) no empty fields
    for (var i = 0; i < fields.length; i++) {
        fields[i].style.border = "";
        if (fields[i].value.trim() == "") {
            fields[i].style.border = "2px solid red";
            empty = true;
        }
    }
    if (empty) {
        message = message + "- Please fill in all the fields.\n";
    }

    // 2) name: letters and spaces only
    if (name.value.trim() != "" && !name.value.trim().match(/^[A-Za-z\u0600-\u06FF ]+$/)) {
        name.style.border = "2px solid red";
        message = message + "- The name must contain letters only (no numbers or symbols).\n";
    }

    // 3) photo must be an image
    if (photo.value != "" && !photo.value.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        photo.style.border = "2px solid red";
        message = message + "- The profile picture must be an image (jpg, jpeg, png, gif, webp).\n";
    }

    // 4) date of birth must be in the past
    if (dob.value != "") {
        var year = parseInt(dob.value.split("-")[0]);
        if(year > 2008){
        dob.style.border = "2px solid red";
        message = message + "- The date of birth must be in the past.\n";
        }
    }

    // 5) email format
    if (email.value != "" && !email.value.match(/^\S+@\S+\.\S+$/)) {
        email.style.border = "2px solid red";
        message = message + "- Please enter a valid email (example: name@example.com).\n";
    }

    // 6) expertise and education cannot start with a number
    if (expertise.value.match(/^\s*\d/)) {
        expertise.style.border = "2px solid red";
        message = message + "- The area of expertise cannot start with a number.\n";
    }
    if (education.value.match(/^\s*\d/)) {
        education.style.border = "2px solid red";
        message = message + "- The education cannot start with a number.\n";
    }

    if (message != "") {
        alert("The instructor was not added. Please fix the following:\n\n" + message);
        return false;
    }

    // add the new leader to the array and show the updated list
    leaders.push({
        name: name.value.trim(),
        photo: URL.createObjectURL(photo.files[0])
    });
    showLeaders();

    alert(name.value.trim() + " has been added successfully.");
    document.getElementById("addLeaderForm").reset();
    return false;
}

document.getElementById("deleteForm").onsubmit = deleteLeader;
document.getElementById("addLeaderForm").onsubmit = addLeader;
showLeaders();
