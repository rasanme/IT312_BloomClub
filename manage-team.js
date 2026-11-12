var leaders = [
    {name : "Rasan"},
    {name : "Sara"},
    {name : "Joud"},
    {name : "Ghada"}
];

document.getElementById("deleteForm").onsubmit=deleteLeader;
document.getElementById("addLeaderForm").onsubmit=addLeader;

function deleteLeader(event){
    event.preventDefault();

    var checked= document.querySelectorAll("input[name='delete']:checked");

    if(checked.length === 0){
        alert("Please select at least one Leader");
        return;
    }

    if(confirm("Are you sure you want to delete the selected Leader/s ?")){
        for(var i = 0 ; i < checked.length ; i++){
            checked[i].closest(".mgr-member").remove();
        }
        alert("Leader/s deleted successfully.");
    }
}

function addLeader(event){
    event.preventDefault();
    
    var name = document.getElementById("inst-name");
    var photo = document.getElementById("inst-photo");
    var dob = document.getElementById("inst-dob");
    var email = document.getElementById("inst-email");
    var expertise = document.getElementById("inst-expertise");
    var skills = document.getElementById("inst-skills");
    var education = document.getElementById("inst-education");

    if(name.value === "" ||photo.value === "" ||dob.value === "" ||email.value === "" ||expertise.value === "" ||skills.value === "" || education.value === ""){
        alert("Please fill in all fields.");
        return;
    }
 
    leaders.push({name: name.value});

    alert(name.value +" has been added successfully.");

    document.getElementById("addLeaderForm").reset();
}