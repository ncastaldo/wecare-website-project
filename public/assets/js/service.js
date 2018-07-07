let URL = getURL();
let serviceId = URL.id;

$(document).ready(function(){

    console.log(serviceId)
    
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
        url: "/rest/services/"+ serviceId +"/locations", //SERVER URL
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(data){ loadJsonRelatedLocations(data);}

    });
    
    $("#relatedLocations").click(function(){
        if( $(".RELATED-LOCATIONS").is(":visible") ){
            $(".RELATED-LOCATIONS").slideUp();
        }else{
            $(".RELATED-LOCATIONS").slideDown();
        }
    });
    
    $(".RELATED-LOCATIONS").hide();


});


//LOAD THE RESPONSE DATA IN HTML
function loadJsonServiceIntoHtml(service){

    $(".SERVICE-NAME").text(service.name);
    $(".SERVICE-DESCRIPTION").html(service.description2);
    $(".SERVICE-IMAGE").attr("src", service.image);
    $(".SERVICE-PRACTICAL-INFO").html(service.practicalInfo);
    $(".SERVICE-TELEPHONE").text(service.telephone);
    
    $(".PEOPLE-LINK").attr("href","people.html#serviceId="+serviceId);

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
        
        el += '<div class="little-card-container text-center col-lg-2 col-md-3 col-sm-4 col-6 mb-3 animated fadeIn" style="animation-delay: '+(j+1)*0.1+'s;"><a class="card" href="location.html?id='+location.id+'"><div class="card-img-container"><img class="card-img-top" src="'+location.image+'"></div><div class="card-title-container"><h6 class="card-title link-custom">'+location.name+'</h6></div></a></div>';

    }

    $(".RELATED-LOCATIONS").append(el);

}


// ---
//HELPER function to handle the URL query
// ---
function getURL() {
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
};