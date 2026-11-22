function getList(key) {
    var list = JSON.parse(localStorage.getItem(key));
    if (list == null)
        list = [];
    return list;
}

function addOffering() {
    var name = document.getElementById("offer-name");
    var image = document.getElementById("offer-image");
    var price = document.getElementById("offer-price");
    var description = document.getElementById("offer-description");

    var fields = [name, image, price, description];
    var message = "";
    var empty = false;

    // 1) check empty fields
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

    // 2) name cannot start with a number
    if (name.value.match(/^\s*\d/)) {
        name.style.border = "2px solid red";
        message = message + "- The offering name cannot start with a number.\n";
    }

    // 3) price must be a number (0 or more)
    if (price.value != "" && (isNaN(price.value) || Number(price.value) < 0)) {
        price.style.border = "2px solid red";
        message = message + "- The price must be a number (0 or more).\n";
    }

    // 4) picture must be an image
    if (image.value != "" && !image.value.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        image.style.border = "2px solid red";
        message = message + "- The picture must be an image (jpg, jpeg, png, gif, webp).\n";
    }

    if (message != "") {
        alert("The offering was not added. Please fix the following:\n\n" + message);
        return false;
    }

    // save in localStorage as an array of objects
    var offerings = getList("managerOfferings");
    offerings.push({
        name: name.value.trim(),
        price: Number(price.value),
        description: description.value.trim()
    });
    localStorage.setItem("managerOfferings", JSON.stringify(offerings));

    alert("\"" + name.value.trim() + "\" has been added successfully!");
    document.getElementById("offerForm").reset();
    return false;
}

document.getElementById("offerForm").onsubmit = addOffering;