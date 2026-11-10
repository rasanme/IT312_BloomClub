var leader =JSON.parse(localStorage.getItem("currentLeader"));

if(leader != null ){
    document.getElementById("leaderName").innerHTML = leader.name;
    document.getElementById("leaderBirth").innerHTML = leader.birth;
    document.getElementById("leaderEmail").innerHTML = leader.email;
    document.getElementById("leaderExpertise").innerHTML = leader.expertise;
    document.getElementById("leaderEducation").innerHTML = leader.education;

    var skills = leader.skills.split(",");
    var html="";
    for(var i = 0 ; i < skills.length ; i++){
        html=html +"<li>"+ skills[i] + "</li>";
    }
    document.getElementById("leaderSkills").innerHTML = html;
}