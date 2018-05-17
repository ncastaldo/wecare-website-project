var allServices = "";
var allLocations = "";

$(document).ready(function(){

    getServicesData(saveAndLoadData);

    $.getScript("/assets/js/locations.js",function(){
        getLocationsData(loadServicesLocationsData);
    });
    
    console.log(" loc id " +URL.locationId);
    $("#"+URL.locationId).trigger("click");

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

function saveAndLoadData(json){
    allServices = json;
    loadServicesData(allServices);
}

function loadServicesData(json){

    console.log(json);
    var el = "";

    for (let i = 0; i < json.services.length; i++) {

        let service = json.services[i];
        console.log(service.id);
        el += getServiceHtml(service,i );
    }

    $(".SERVICES").append(el);   
    
    $(".SERVICES-NAME").text("All services");

}   

function getServiceHtml(service,i ){
    return '<div class="card-container col-lg-3 col-md-4 col-sm-6 col-12 mb-4 text-center animated fadeIn" style="animation-delay: '+i*0.1+'s;"><a class="card" href="service.html?id='+service.id+'"><img class="card-img-top" src="'+service.image+'"><div class="card-body"><h5 class="card-title">'+service.name+'</h5><p class="card-description link-description">'+service.description1+'</p></div></a></div>';
}

function loadServicesLocationsData(json){

    allLocations = json;
    
    let el = "";

    el += '<div class="little-card-container col-lg-2 col-md-3 col-sm-3 col-4 mb-2 text-center"><a class="card active" href="#" id="all"><img class="card-img-top" src="../assets/img/locations/all.jpg"><h5 class="card-title pt-2 link-custom">All</h5></a></div>';

    for (let i = 0; i < json.locations.length; i++) {

        let location = json.locations[i];

        console.log(location.id);

        el += '<div class="little-card-container col-lg-2 col-md-3 col-sm-3 col-4 mb-2 text-center"><a class="card" href="#" id="'+location.id+'"><img class="card-img-top" src="'+location.image+'"><h5 class="card-title pt-2 link-custom">'+location.name+'</h5></a></div>';

    }

    $(".SERVICE-LOCATIONS").append(el);

    addServicesLocationsClickHandler();

}

function addServicesLocationsClickHandler(){

    $('.SERVICE-LOCATIONS .little-card-container a').click( function() {
        $('.SERVICE-LOCATIONS .card.active').removeClass('active');
        $(this).addClass('active');

        $(".SERVICES").empty();

        let id = $(this).attr("id");
        if(id==="all") {
            loadServicesData(allServices);
        }else{
            loadFilteredServices(id);
        }
    });

}

function loadFilteredServices(locationId){

    let servicesId;
    let currentLocation;
    let el = ""; 
    

    for(let j=0; j<allLocations.locations.length; j++){

        if(allLocations.locations[j].id == locationId){
            currentLocation = allLocations.locations[j];
            servicesId = currentLocation.services;
        }

    }
    
    let added = 0;
    
    for(let i=0; i<servicesId.length; i++){

        for (let j = 0; j < allServices.services.length; j++) {

            if(servicesId[i].id == allServices.services[j].id){
                
                let service = allServices.services[j];
                el += getServiceHtml(service, added);
                
                added++;
                
            }
            
            
        }

    }
    
    $(".SERVICES").append(el);   
    
    $(".SERVICES-NAME").text("Services in " + currentLocation.name);



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

