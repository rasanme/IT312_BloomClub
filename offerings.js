var offerings = [
  { name: "Flower Arranging 101", price: 199, image: "images/flowerArr.png", alt: "Flower Arranging 101 workshop", description: "Learn the basics of choosing, cutting and arranging fresh flowers into a simple, balanced vase design." },
  { name: "Bridal Bouquet Design", price: 399, image: "images/bridalBD.png", alt: "Bridal Bouquet Design workshop", description: "Design an elegant hand-tied bridal bouquet and learn how to pick flowers that match a wedding theme." },
  { name: "Botanical Photography Workshop", price: 0, image: "images/photography.png", alt: "Botanical Photography Workshop", description: "Capture beautiful photos of flowers and plants using natural light, close-ups and simple phone tricks." },
  { name: "Indoor Plant Care &amp; Propagation", price: 249, image: "images/indoorPC.png", alt: "Indoor Plant Care and Propagation", description: "Discover how to keep indoor plants healthy and grow new plants from cuttings at home." },
  { name: "Floral Perfume Preparation", price: 299, image: "images/perfume.png", alt: "Floral Perfume Preparation workshop", description: "Mix natural flower oils to create your own personal perfume and take your bottle home." },
  { name: "Bouquet Styling", price: 0, image: "images/BStyling.png", alt: "Bouquet Styling session", description: "A relaxing open session to style a small bouquet, wrap it nicely and add a personal touch." }
];
var favouritesColor= "rgb(204, 0, 75)";
var soft= "#F2896A";
function showOfferings() {
  var html = "";
  for (var i = 0; i < offerings.length; i++) {
    var priceText = "Price: " + offerings[i].price + " &#x20C1;";
    if (offerings[i].price == 0) {
      priceText = "Price: 0 &#x20C1; (Free)";
    }
    html = html + "<article class='off-card'>"
      + "<img src='" + offerings[i].image + "' alt='" + offerings[i].alt + "'>"
      + "<h2>" + offerings[i].name + "</h2>"
      + "<p>" + offerings[i].description + "</p>"
      + "<div class='off-bottom'>"
      + "<p class='off-price'>" + priceText + "</p>"
      + "<button type='button' class='off-fav' onclick='toggleFavorite(this)' title='Add to favourites'>&#9829;</button>"
      + "</div>"
      + "</article>";
  }
  document.getElementById("offList").innerHTML = html;
}

function shuffleOfferings() {
  for (var i = 0; i < offerings.length; i++) {
    var j = Math.floor(Math.random() * offerings.length);
    var temp = offerings[i];
    offerings[i] = offerings[j];
    offerings[j] = temp;
  }
}

function sortByPrice(lowToHigh) {
  for (var i = 0; i < offerings.length - 1; i++) {
    for (var j = 0; j < offerings.length - 1 - i; j++) {
      var swap = false;
      if (lowToHigh && offerings[j].price > offerings[j + 1].price) {
        swap = true;
      }
      if (!lowToHigh && offerings[j].price < offerings[j + 1].price) {
        swap = true;
      }
      if (swap) {
        var temp = offerings[j];
        offerings[j] = offerings[j + 1];
        offerings[j + 1] = temp;
      }
    }
  }
}

function sortByName(aToZ) {
  var names = [];
  for (var i = 0; i < offerings.length; i++) {
    names.push(offerings[i].name);
  }
  names.sort();
  if (!aToZ) {
    names.reverse();
  }
  var sorted = [];
  for (var i = 0; i < names.length; i++) {
    for (var j = 0; j < offerings.length; j++) {
      if (offerings[j].name == names[i]) {
        sorted.push(offerings[j]);
      }
    }
  }
  offerings = sorted;
}

function sortOfferings() {
  var choice = document.getElementById("sort").value;
  if (choice == "price-low") {
    sortByPrice(true);
  } else if (choice == "price-high") {
    sortByPrice(false);
  } else if (choice == "name-az") {
    sortByName(true);
  } else if (choice == "name-za") {
    sortByName(false);
  } else {
    shuffleOfferings();
  }
  showOfferings();
}
 
function toggleFavorite(button){

    if(button.style.color != favouritesColor){
        button.style.color= favouritesColor;
    } else {
        button.style.color=soft;
    }

}
shuffleOfferings();
showOfferings();
document.getElementById("sort").onchange = sortOfferings;