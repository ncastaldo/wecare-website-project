function getURL() {
    var query_string = {};
    var query = window.location.hash.substring(1);
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

let URL = getURL();
let locationId = URL.locationId;
let jsonLocations;

$(document).ready(function(){

    performServicesAjaxCalls();

    performLocationsAjaxCalls();

    $("#orderByLocation").click(function(){
        if( $(".SERVICE-LOCATIONS").is(":visible") ){
            $(".SERVICE-LOCATIONS").slideUp();
            $(this).removeClass("active");
        }else{
            $(".SERVICE-LOCATIONS").slideDown();
            $(this).addClass("active");
        }
    });

    
    $(".SERVICE-LOCATIONS").hide();


});

function performServicesAjaxCalls(){

    $.ajax({
        method: "GET",
        dataType: "json",
        url: (locationId===undefined) ? ("/rest/services") : ("/rest/locations/"+locationId+"/services" ),  //SERVER URL
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(data){ loadJsonServicesIntoHtml(data);}
    });

}

function loadJsonServicesIntoHtml(services){

    console.log(services);
    var el = "";

    for (let i = 0; i < services.length; i++) {

        let service = services[i];
        el += getServiceHtml(service,i );
    }


    //This trick is used in order NOT to have problems/glitches with the loading of dynamic content :)
    $(".SERVICES").css("minHeight", $(".SERVICES").height());
    $(".SERVICES").empty();

    $(".SERVICES").append(el);

    $(".SERVICES").css("minHeight", 0);

    addServicesHoverHandler();

}

function getServiceHtml(service, i ){

    return '<div class="card-container col-lg-3 col-md-4 col-sm-6 col-6 mb-4 text-center animated fadeIn" style="animation-delay: '+i*0.1+'s"><a class="card" href="service.html?id='+service.id+'"><div class="card-img-container"><img class="card-img-top" src="'+service.image+'"><div class="card-description-container"><div class="card-description">'+service.description1+'</div></div></div><div class="card-title-container"><h5 class="card-title">'+service.name+'</h5></div></a></div>';

}


function addServicesHoverHandler(){
    
    $("div.card-description-container").hide();

    $(".card").hover(
        function(){
            let el = $(this).find("div.card-description-container");
            if(! el.is(":visible"))
                el.slideDown(300);
        },
        function(){
            let el = $(this).find("div.card-description-container");
            el.slideUp(300);
    });

}

function performLocationsAjaxCalls(){
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/rest/locations",
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(data){ loadJsonLocationsIntoHtml(data);}
    });
}

function loadJsonLocationsIntoHtml(locations){

    jsonLocations = locations;

    console.log("loading locations.." + locations);

    let el = "";

    el += '<div class="little-card-container col-lg-2 col-md-3 col-sm-4 col-6 mb-3 text-center animated fadeIn"><a class="card '+((locationId===undefined) ? ('active') : ('') ) +' SERVICE-LOCATION-EL" id="all" href="javascript:void(0)"><div class="card-img-container"><img class="card-img-top" src="../assets/img/locations/all.jpg"></div><div class="card-title-container"><h4 class="card-title link-custom">All</h4></div></a></div>';

    for (let i = 0; i < locations.length; i++) {

        let location = locations[i];

        el += '<div class="little-card-container col-lg-2 col-md-3 col-sm-4 col-6 mb-3 text-center animated fadeIn" style="animation-delay: '+(i+1)*0.1+'s;"><a class="card '+((locationId==location.id) ? ('active') : ('') )+' SERVICE-LOCATION-EL" id="'+location.id+'" href="javascript:void(0)"><div class="card-img-container"><img class="card-img-top" src="'+location.image+'"></div><div class="card-title-container"><h6 class="card-title link-custom">'+location.name+'</h6></div></a></div>';

    }

    $(".SERVICE-LOCATIONS").append(el);

    loadServicesName();

}


function loadServicesName(){

    let locationName;

    if(locationId===undefined){
        locationName = undefined;
    }else{
        for(let i = 0; i<jsonLocations.length; i++){
            if(jsonLocations[i].id == locationId){
                locationName = jsonLocations[i].name;
            }
        }
    }

    $(".SERVICES-NAME").text( (locationName===undefined)? ("All services") : ("Services in "+locationName) );

}


$(document).on('click', '.SERVICE-LOCATION-EL', function(ev){

    ev.preventDefault();

    $(".SERVICE-LOCATION-EL").removeClass("active");

    //gets the current target id
    if(ev.currentTarget.id === "all"){
        locationId = undefined;
        $("#all").addClass("active");
    }else{
        locationId = ev.currentTarget.id;
        $("#"+locationId).addClass("active");
    }

    performServicesAjaxCalls();

    loadServicesName();


});
