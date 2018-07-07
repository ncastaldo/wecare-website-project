let URL = getURL();
let personId = URL.id;

$(document).ready(function(){

    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/rest/people/"+personId,
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(json){ loadJsonPersonIntoHtml(json);}
    });
    
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/rest/people/"+personId+"/services",
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(json){ loadJsonServicesIntoHtml(json);}
    });
    
});

function loadJsonPersonIntoHtml(person){
    
    $(".PERSON-FIRSTNAME").text(person.firstname);
    $(".PERSON-LASTNAME").text(person.lastname);
    $(".PERSON-FULLNAME").text(person.firstname + " " + person.lastname);
    $(".PERSON-PROFESSION").html(person.profession);
    $(".PERSON-DESCRIPTION").html(person.description);
    $(".PERSON-IMAGE").attr("src", person.image);

}

function loadJsonServicesIntoHtml(services){
    
    let el = "";

    for (let i = 0; i < services.length; i++) {

        let service = services[i];
        el += '<div class="little-card-container text-center col-lg-2 col-md-3 col-sm-4 col-6 mb-3 animated fadeIn" style="animation-delay: '+(i+1)*0.1+'s;"><a class="card" href="service.html?id='+service.id+'"><div class="card-img-container"><img class="card-img-top" src="'+service.image+'"></div><div class="card-title-container"><h6 class="card-title link-custom">'+service.name+'</h6></div></a></div>';
        
    }
    
    $(".PERSON-SERVICES").append(el);
    
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