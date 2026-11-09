function validateJoin() {
   var name= document.getElementById("fullname");
   var photo= document.getElementById("profilepicture");
   var birth= document.getElementById("dateofbirth");
   var email= document.getElementById("email");
   var expertise= document.getElementById("expertise");
   var skills= document.getElementById("skills");
   var education= document.getElementById("education");
 
   var fields =[ name, photo, birth, email, expertise, skills, education];
   var message="";
   var empty=false;

   for(var i = 0 ; i< fields.length ; i++ ){
    fields[i].style.border="";
    if(fields[i].value == "" || fields[i].value.match(/^\s+$/)){
        fields[i].style.border="2px solid red";
        empty=true;
    }
   }
   if(empty){
    message=message+"Please fill in all the fields. \n";
   }

   if(name.value.match(/^\s*\d/)){
    name.style.border="2px solid red";
    message=message+"The name cannot start with a number. \n";
   }
    if(photo.value != "" && !photo.value.match(/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i)){
    photo.style.border="2px solid red";
    message=message+"The photo must be an image(jpg,jpeg,png,gif,bmp,webp,svg). \n";
   }
   if(birth.value != ""){
    var year=parseInt(birth.value);
    if(year> 2008 ){
    birth.style.border="2px solid red";
    message=message+"The year of birth must be 2008 or earlier. \n";
    }
   }
   if(email.value != "" && !email.value.match(/^\S+@\S+\.\S+$)){
    email.style.border="2px solid red";
    message=message+"The enter a valid email address. \n";
    }
   if(message != ""){
    alert(message);
    return false;
   }
   alert("Thank you, " +name.value + "! Your request to join our team has been sent successfully ");
   return false;

}

document.getElementById(joinForm).onsubmit= validateJoin;
