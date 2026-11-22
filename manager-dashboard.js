function getList(key){
    var list= JSON.parse(localStorage.getItem(key));
    if(list == null)
        list=[];
    return list;
}

function showPendingLeaders(){
    var pending = getList("pendingLeaders");
    var html = "<tr><th>Photo</th><th>Name</th><th>Email</th><th>Area of Expertise</th><th>Actions</th></tr>";
   
    if(pending.length==0){
        html= html + "<tr><td colspan='5'>No pending applications.</td></tr>";
    }

    for(var i=0 ; i < pending.length ; i++){
        
        var photo = pending[i].photo;

        if(photo==null  || photo == "")
            photo = "images/profile.png";
        html = html + "<tr>" + "<td><img src='" + photo + "' alt='Photo of " + pending[i].name + "' width='50' height='50' style='object-fit:cover;border-radius:50%'></td>"+ "<td>" + pending[i].name + "</td>"+        "<td>" + pending[i].email + "</td>"+
        "<td>" + pending[i].expertise+ "</td>"+
        "<td>" + "<button type='button' class='mgr-btn-approve' onclick='approveLeader("+i+")'>Approve</button>"+"<button type='button' class='mgr-btn-decline' onclick='declineLeader("+i+")'> Decline</button>"+ "</td>"+
        "</tr>";
    }   

    document.getElementById("leadersTable").innerHTML=html;
    document.getElementById("LeadersCounter").innerHTML=pending.length;

}

function approveLeader(i){
    var pending= getList("pendingLeaders");
    var approved = getList("approvedLeaders");
    var leader = pending[i];

    approved.push(leader);
    pending.splice(i,1);
    localStorage.setItem("approvedLeaders",JSON.stringify(approved));   
    localStorage.setItem("pendingLeaders",JSON.stringify(pending));

    alert(leader.name +" was approved and added to the Activity Leaders.");
    showPendingLeaders();


}

function declineLeader(i){
    var pending= getList("pendingLeaders");
    var leader = pending[i];

    pending.splice(i,1);
    localStorage.setItem("pendingLeaders",JSON.stringify(pending));

    alert("The application of "+ leader.name+ " was declined.");
    showPendingLeaders();

}

// show the offerings that the manager added from the "Add New Offering" page
function showManagerOfferings() {
    var offerings = getList("managerOfferings");
    var table = document.getElementById("offeringsTable");
    var html = "";

    for (var i = 0; i < offerings.length; i++) {
        html = html + "<tr>"
            + "<td>" + offerings[i].name + "</td>"
            + "<td>" + offerings[i].price + " &#x20C1;</td>"
            + "<td>"
            + "<select aria-label='Actions for " + offerings[i].name + "'>"
            + "<option value='' selected disabled>Actions</option>"
            + "<option value='edit'>Edit</option>"
            + "<option value='delete'>Delete</option>"
            + "<option value='activate'>Activate</option>"
            + "<option value='deactivate'>Deactivate</option>"
            + "</select>"
            + "</td>"
            + "</tr>";
    }

    table.innerHTML = table.innerHTML + html;
}

showPendingLeaders();
showManagerOfferings();