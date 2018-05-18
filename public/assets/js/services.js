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

let locationId = URL.locationId;

$(document).ready(function(){

    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/rest/services" + ( (locationId===undefined) ? ("") : ("?locationId="+locationId) ),  //SERVER URL
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(data){ loadJsonServicesIntoHtml(data);}
    });
    
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/rest/locations",
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(data){ loadJsonLocationsIntoHtml(data);}
    });
    
    
    //getServicesData(saveAndLoadData);
    
    //console.log(" loc id " + locationId);
    //$("#"+URL.locationId).trigger("click");

});

function loadJsonServicesIntoHtml(services){

    console.log(services);
    var el = "";

    for (let i = 0; i < services.length; i++) {

        let service = services[i];
        el += getServiceHtml(service,i );
    }

    $(".SERVICES").append(el);   

}   

function getServiceHtml(service, i ){
    return '<div class="card-container col-lg-3 col-md-4 col-sm-6 col-12 mb-4 text-center animated fadeIn" style="animation-delay: '+i*0.1+'s;"><a class="card" href="service.html?id='+service.id+'"><img class="card-img-top" src="'+service.image+'"><div class="card-body"><h5 class="card-title">'+service.name+'</h5><p class="card-description link-description">'+service.description1+'</p></div></a></div>';
}

function loadJsonLocationsIntoHtml(locations){
    
    console.log(locations);
    
    let locationName;
    let el = "";

    el += '<div class="little-card-container col-lg-2 col-md-3 col-sm-3 col-4 mb-2 text-center"><a class="card '+((locationId===undefined) ? ('active') : ('') ) +'" href="services.html"><img class="card-img-top" src="../assets/img/locations/all.jpg"><h6 class="card-title pt-2 link-custom">All</h6></a></div>';

    for (let i = 0; i < locations.length; i++) {

        let location = locations[i];
        if(locationId == location.id)
            locationName=location.name;

        el += '<div class="little-card-container col-lg-2 col-md-3 col-sm-3 col-4 mb-2 text-center"><a class="card '+((locationId==location.id) ? ('active') : ('') )+' " href="services.html?locationId='+location.id+'"><img class="card-img-top" src="'+location.image+'"><h6 class="card-title pt-2 link-custom">'+location.name+'</h6></a></div>';

    }

    $(".SERVICE-LOCATIONS").append(el);
    
    $(".SERVICES-NAME").text( (locationName===undefined)? ("All services") : ("Services in "+locationName) );

}
