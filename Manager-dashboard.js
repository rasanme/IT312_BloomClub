function getList(getList){
    var list= JSON.parse(localStorage.getItem(key));
    if(list == null)
        list=[];
    return list;
}

function showPendingLeaders(){
    var pending = getList("pendeingLeaders");
    var html = "<tr><th> Name </th><th>Email</th><th>Aera of Expertise</th><th>Actions</th>";

    if(pending.length==0){
        html= html + "<tr><td colspan='4'>No pending applications.</td></tr>";
    }

    for(var i=0 ; i < pending.length ; i++){
        html = html + "<tr>" + "<td>" + pending[i].name + "</td>"+
        "<td>" + pending[i].email + "</td>"+
        "<td>" + pending[i].expertise+ "</td>"+
        "<td>" + "<button type='button' class='mgr-btn-approved' onclick='approveLeader("+i+")'>Approve</button>"+"<button type='button' class='mgr-btn-decline' onclick='declineLeader("+i+")'> Decline</button>"+ "</td>"+
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
    localStorage.setItem("approvedLeaders".JSON.stringify(approved));
    localStorage.setItem("pendingLeaders".JSON.stringify(pending));

    alert(leader.name +"was approved and added to the Activity Leaders.");
    showPendingLeaders();


}

function declineLeader(i){
    var pending= getList("pendingLeaders");
    var leader = pending[i];

    pending.splice(i,1);
    localStorage.setItem("pendingLeaders".JSON.stringify(pending));

    alert("The application of"+ leader.name+ "was declined.");
    showPendingLeaders();

}

showPendingLeaders();

