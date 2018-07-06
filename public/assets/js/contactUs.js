$(document).ready(function(){

    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/rest/contactUs",
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(json){
            $("#JSON-telephone").attr("href", "tel:"+ json.telephone);
            $("#JSON-telephone .text").text(json.telephone);
            $("#JSON-email").attr("href", "mailto:"+ json.email);
            $("#JSON-email .text").text(json.email);
            $("#JSON-address").attr("href", "https://www.google.com/maps?daddr="+ json.address);
            $("#JSON-address .text").text(json.address);
        }

    });


    $("#form").submit(function(e){
        sendData();
    });

})

function sendData(){

    let fullname = $("#fullname").val();
    let email = $("#email").val();
    let telephone = $("#telephone").val();
    let who = $("#who").val();
    let details = $("#details").val();

    $.ajax({
        method: "POST",
        url: "/rest/requests",
        data: {fullname, email, telephone, who, details},
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(json){
            alert("Message has been sent successfully!");
        }
    });


}