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

let serviceId = URL.id;

$(document).ready(function(){

    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/rest/services/" + serviceId, //SERVER URL
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(data){ loadJsonServiceIntoHtml(data);}

    });
    
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/rest/locations?serviceId=" + serviceId, //SERVER URL
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(data){ loadJsonRelatedLocations(data);}

    });
    
    $("#relatedLocations").click(function(){
        if( $(".RELATED-LOCATIONS").is(":visible") ){
            $(".RELATED-LOCATIONS").slideUp();
            $("#relatedLocations").text("Show");
        }else{
            $(".RELATED-LOCATIONS").slideDown();
            $("#relatedLocations").text("Hide");
        }
    });
    
    $(".RELATED-LOCATIONS").hide();
    $("#relatedLocations").text("Show");


});


//LOAD THE RESPONSE DATA IN HTML
function loadJsonServiceIntoHtml(service){

    $(".SERVICE-NAME").text(service.name);
    $(".SERVICE-DESCRIPTION").html(service.description2);
    $(".SERVICE-IMAGE").attr("src", service.image);
    $(".SERVICE-PRACTICAL-INFO").html(service.practicalInfo);
    $(".SERVICE-TELEPHONE").text(service.telephone);

    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/rest/services/" + serviceId + "/photogallery", //SERVER URL
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(photogallery){
        
            let el= "";
            for(let i=0; i<photogallery.length; i++){
                el += '<div class="col-lg-4 col-md-6 col-12 d-block mb-4 h-100"><a href ="'+photogallery[i].image+'" target="_blank"><img class="img-fluid img-thumbnail" src="'+photogallery[i].image+'" alt=""></a></div>'
                }
            $(".SERVICE-PHOTOGALLERY").append(el);   
        
        }

    });   


}

function loadJsonRelatedLocations(locations){

    let el = "";

    for (let j = 0; j < locations.length; j++) {

        let location = locations[j];


        el +='<div class="simple-card-container col-lg-2 col-md-3 col-sm-4 col-6 mb-4 text-center"><a class="card" href="location.html?id='+location.id+'"><img class="card-img-top" src="'+location.image+'"><h6 class="card-title pt-2 link-custom">'+location.name+'</h6></a></div>'

    }

    $(".RELATED-LOCATIONS").append(el);

}