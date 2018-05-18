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
    $(".LOCATION-IMAGE").html('<img class="animated fadeInRight" src="'+currentLocation.image+'" style="max-width:70%; min-width: 200px;" />');
    $(".LOCATION-PRACTICAL-INFO").html(currentLocation.practicalInfo);

    let el= "";
    
    console.log("hey");
    
    
    /* TODO photogallery
    $.ajax({
        url : currentLocation.photogallery,
        error: function (request, error) {
            console.log(request, error);
        },
        success: function (data) {
            $(data).find("a.contains(jpg)" ).each(function () {
                let filename = this.href.replace(window.location.host, "").replace("http:///", "");
                console.log(filename);
            //$("body").append($("<img src=" + dir + filename + "></img>"));
            });
        }
    });*/
    
    //el += '<div class="col-lg-4 col-md-6 col-12 d-block mb-4 h-100"><img class="img-fluid img-thumbnail" src="'+currentLocation.photogallery+ val+'" alt=""></div>';
    
    //$(".LOCATION-PHOTOGALLERY").append(el);        

        /*
    $('.SERVICES-BUTTON').click(function(){
        console.log("hey");
        window.location.href = '/pages/services.html?locationId='+currentLocation.id;
    });
    
    */

}