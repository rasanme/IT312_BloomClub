localStorage.clear();

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
      if(email.value != "" && !email.value.match(/^\S+@\S+\.\S+$/)){
    email.style.border="2px solid red";
    message=message+"Please enter a valid email address. \n";
    }
   if(message != ""){
    alert(message);
    return false;
   }
   saveApplication(name.value, birth.value, email.value, expertise.value, skills.value, education.value);
   alert("Thank you, " +name.value + "! Your request to join our team has been sent successfully ");
   document.getElementById("joinForm").reset();
   return false;
}

//read a listt from localStorage 
function getList(key){
   var list= JSON.parse(localStorage.getItem(key));
   if(list == null)
      list=[];
   return list;
}

function saveApplication(name, birth, email, expertise, skills, education){
   var pending= getList("pendingLeaders");
   pending.push({name: name, birth: birth, email: email, expertise: expertise, skills: skills, education: education});
   localStorage.setItem("pendingLeaders", JSON.stringify(pending));
}
//add a card for every leader that manager approved
function showLeaders(){
   var approved = getList("approvedLeaders");
   var html="";
   for(var i = 0 ; i < approved.length ; i++){
      html = html + "<div>"+ "<img src='images/profile.png' alt='" + approved[i].name + " Profile Picture'>"+ "<a href='leader.html' onclick='openLeader(" + i + ")'>" + approved[i].name + "</a>"
         + "</div>";
   }
document.getElementById("leadersList").innerHTML += html;
}

//show leader profile
function openLeader(i){
   var approved= getList("approvedLeaders");
   localStorage.setItem("currentLeader",JSON.stringify(approved[i]));
}
document.getElementById("joinForm").onsubmit= validateJoin;
showLeaders();
