var URL = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();

$(document).ready(function(){

    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/rest/locations/"+URL.id,
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(json){ loadJsonIntoHtml(json);}
    });

});

function loadJsonIntoHtml(currentLocation){

    $(".LOCATION-NAME").text(currentLocation.name);
    $(".LOCATION-DESCRIPTION").html(currentLocation.description);
    $(".LOCATION-IMAGE").attr("src", currentLocation.image);
    $(".LOCATION-PRACTICAL-INFO").html(currentLocation.practicalInfo);
    
    $(".LOCATION-TELEPHONE").attr("href", "tel:"+ currentLocation.telephone);
    $(".LOCATION-TELEPHONE span").text(currentLocation.telephone);
    
    $(".LOCATION-EMAIL").attr("href", "mailto:"+ currentLocation.email);
    $(".LOCATION-EMAIL span").text(currentLocation.email);
    
    $(".LOCATION-ADDRESS").attr("href", "http://maps.google.com/?daddr="+ currentLocation.address);
    $(".LOCATION-ADDRESS span").text(currentLocation.address);

    
    $('.SERVICES-LINK').attr("href","services.html#locationId="+currentLocation.id);
    
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/rest/locations/" + currentLocation.id + "/photogallery", //SERVER URL
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(photogallery){
        
            let el= "";
            for(let i=0; i<photogallery.length; i++){
                el += '<div class="col-lg-4 col-md-6 col-12 d-block mb-4 h-100"><a href ="'+photogallery[i].image+'" target="_blank"><img class="img-fluid img-thumbnail" src="'+photogallery[i].image+'" alt=""></a></div>'
                }
            $(".LOCATION-PHOTOGALLERY").append(el);   
        
        }

    });   

}