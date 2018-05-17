var serviceId;

$(document).ready(function(){

    getServicesData(loadServiceData);

});

function getServicesData(nextMethod){

    return $.ajax({
        method: "GET",
        dataType: "json",
        url: "/assets/json/services.json", //SERVER URL
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(data){ nextMethod(data);}
    });
}


//LOAD THE RESPONSE DATA IN HTML
function loadServiceData(json){

    for (let j = 0; j < json.services.length; j++) {

        if(URL.id === json.services[j].id){

            let service = json.services[j];

            serviceId = service.id;

            $(".SERVICE-NAME").text(service.name);
            $(".SERVICE-DESCRIPTION").html(service.description2);
            $(".SERVICE-IMAGE").html('<img class="image-intro animated fadeInRight" src="'+service.image+'" />');
            $(".SERVICE-PRACTICAL-INFO").html(service.practicalInfo);

            let el= "";
            for(let i=0; i<service.photogallery.length; i++){
                el += '<div class="col-lg-4 col-md-6 col-12 d-block mb-4 h-100"><img class="img-fluid img-thumbnail" src="'+service.photogallery[i].image+'" alt=""></div>'
            }
            $(".SERVICE-PHOTOGALLERY").append(el);        

        }

    }   

    $.getScript("/assets/js/locations.js",function(){
        getLocationsData().done(loadRelatedLocations);
    });

}

function loadRelatedLocations(json){

    let el = "";
    console.log(json);

    for (let j = 0; j < json.locations.length; j++) {

        let location = json.locations[j];

        for(let i = 0; i<location.services.length; i++){

            if(location.services[i].id === serviceId){

                //TODO HREF

                el +='<div class="simple-card-container col-lg-2 col-md-3 col-sm-4 col-6 mb-4 text-center"><a class="card" href="location.html?id='+location.id+'"><img class="card-img-top" src="'+location.image+'"><h6 class="card-title pt-2 link-custom">'+location.name+'</h6></a></div>'


            }

        }

    }

    $(".RELATED-LOCATIONS").append(el);

}


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
