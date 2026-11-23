function getList(key){
    var list= JSON.parse(localStorage.getItem(key));
    if(list == null)
        list=[];
    return list;
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
var pendingRequests = [
   {  member: "Lamar Thamer", offering: "Bridal Bouquet Design", date: "12/10/2026"  },
     { member: "Fatima Zaid", offering: "Flower Arranging 101", date: "15/10/2026" },
    { member: "Wed Abdulaziz", offering: "Botanical Photography Workshop", date: "20/10/2026" },
    { member: "Alanoud Ibrahim", offering: "Floral Perfume Preparation", date: "25/10/2026" }
];

function showPendingRequests(){
    var html ="<tr><th>Member Name</th><th>Requested Offering</th><th>Request Date</th><th>Actions</th></tr>";
    if(pendingRequests.length == 0 )
        html = html +"<tr><td colspan = '4'> No pending requests.</td></tr>";
    for(var i = 0; i < pendingRequests.length; i++){
        html = html + "<tr><td>" + pendingRequests[i].member + "</td>" +
        "<td>" + pendingRequests[i].offering + "</td>" +
        "<td>" + pendingRequests[i].date + "</td>" +
        "<td>" + "<button type = 'button' class='mgr-btn-approve' onclick='approveRequest("+i+")'>Approve</button>" +
        "<button type = 'button' class='mgr-btn-decline' onclick='declineRequest("+i+")'>Decline</button>" +   
        "</td></tr>";    
    }

    document.getElementById("requestsTable").innerHTML=html;
    document.getElementById("requestsCounter").innerHTML=pendingRequests.length;
}

function approveRequest(i){
    var request = pendingRequests[i];
    pendingRequests.splice(i, 1);
    alert(request.member+"'s request to join "+ request.offering+" was approved");
    showPendingRequests();
}
function declineRequest(i){
    var request = pendingRequests[i];
    if(confirm("Are you sure you want to to decline the request of "+request.member+" ?")){
        pendingRequests.splice(i, 1); 
        alert(request.member+"'s request to join "+ request.offering+" was declined");
        showPendingRequests();
    }
}
showPendingRequests();
showManagerOfferings();
