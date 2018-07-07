let URL = getURL();
let serviceId = URL.serviceId;
let jsonServices;

$(document).ready(function(){
    
    performPeopleAjaxCalls();

    performServicesAjaxCalls();

    $("#orderByService").click(function(){
        if( $(".PEOPLE-SERVICES").is(":visible") ){
            $(".PEOPLE-SERVICES").slideUp();
            $(this).removeClass("active");
        }else{
            $(".PEOPLE-SERVICES").slideDown();
            $(this).addClass("active");
        }
    });

    
    $(".PEOPLE-SERVICES").hide();
    
});



function performPeopleAjaxCalls(nextMethod){
    
    return $.ajax({
        method: "GET",
        dataType: "json",
        url: (serviceId===undefined) ? ("/rest/people") : ("/rest/services/"+serviceId+"/people"), //SERVER URL
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(data){loadJsonPeopleIntoHtml(data);}
    });
    
}

                  
                
function loadJsonPeopleIntoHtml(people){
    
    console.log(people);
    let el = "";
    
    for (let i = 0; i < people.length; i++) {
        
        let person = people[i];
        
        el += getPersonHtml(person, i);
    }
    
    //This trick is used in order NOT to have problems/glitches with the loading of dynamic content :)
    $(".PEOPLE").css("minHeight", $(".PEOPLE").height());
    $(".PEOPLE").empty();

    $(".PEOPLE").append(el);

    $(".PEOPLE").css("minHeight", 0);
    
    addPeopleHoverHandler();
    
}            

function getPersonHtml(person, i){
    
    return '<div class="people-card-container col-lg-4 col-md-6 col-sm-6 col-12 mb-4 text-center animated fadeIn" style="animation-delay: '+i*0.1+'s"><a class="card" href="person.html?id='+person.id+'"><div class="card-img-container"><img class="card-img-top" src="'+person.image+'"></div><div class="card-description-container"><h5 class="card-description">'+person.firstname+' '+person.lastname+'</h5></div><div class="card-title-container"><h3 class="card-title">'+person.profession+'</h3></div></a></div>';
       
}


function addPeopleHoverHandler(){
    
    $("div.card-description-container").hide();

    $(".card").hover(
        function(){
            let el = $(this).find("div.card-description-container");
            if(! el.is(":visible"))
                el.fadeIn(250);
        },
        function(){
            let el = $(this).find("div.card-description-container");
            el.hide();
    });
    
    
}

function performServicesAjaxCalls(){
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/rest/services",
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(data){ loadJsonServicesIntoHtml(data);}
    });
}

function loadJsonServicesIntoHtml(services){
    
    jsonServices = services;
    
    console.log("loading services... " + services);

    let el = "";

    el += '<div class="little-card-container col-lg-2 col-md-3 col-sm-4 col-6 mb-3 text-center animated fadeIn"><a class="card '+((serviceId===undefined) ? ('active') : ('') ) +' PEOPLE-SERVICE-EL" id="all" href="javascript:void(0)"><div class="card-img-container"><img class="card-img-top" src="../assets/img/locations/all.jpg"></div><div class="card-title-container"><h4 class="card-title link-custom">All</h4></div></a></div>';

    for (let i = 0; i < services.length; i++) {

        let service = services[i];

        el += '<div class="little-card-container col-lg-2 col-md-3 col-sm-4 col-6 mb-3 text-center animated fadeIn" style="animation-delay: '+(i+1)*0.1+'s;"><a class="card '+((serviceId==service.id) ? ('active') : ('') )+' PEOPLE-SERVICE-EL" id="'+service.id+'" href="javascript:void(0)"><div class="card-img-container"><img class="card-img-top" src="'+service.image+'"></div><div class="card-title-container"><h6 class="card-title link-custom">'+service.name+'</h6></div></a></div>';

    }

    $(".PEOPLE-SERVICES").append(el);
    
    loadPeopleName();
    
}

function loadPeopleName(){

    let peopleName;

    if(serviceId===undefined){
        peopleName = undefined;
    }else{
        for(let i = 0; i<jsonServices.length; i++){
            if(jsonServices[i].id == serviceId){
                peopleName = jsonServices[i].name;
            }
        }
    }

    $(".PEOPLE-NAME").text( (peopleName===undefined)? ("All people in alphabetical order") : ("People offering service: "+peopleName) );

}


$(document).on('click', '.PEOPLE-SERVICE-EL', function(ev){

    ev.preventDefault();
    
    console.log("HEU");

    $(".PEOPLE-SERVICE-EL").removeClass("active");

    //gets the current target id
    if(ev.currentTarget.id === "all"){
        serviceId = undefined;
        $("#all").addClass("active");
    }else{
        serviceId = ev.currentTarget.id;
        $("#"+serviceId).addClass("active");
    }

    performPeopleAjaxCalls();

    loadPeopleName();


});


// ---
//HELPER function to handle the URL query
// ---
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