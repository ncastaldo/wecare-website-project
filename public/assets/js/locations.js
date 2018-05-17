$(document).ready(function(){
    
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/rest/locations",
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(json){ loadJsonIntoHtml(json);}
    });
    
});                  
                
function loadJsonIntoHtml(locations){
    
    var el = "";
    
    for (let i = 0; i < locations.length; i++) {
        
        let location = locations[i];
        
        console.log(location.id);
        
        //CREATE A LI ELEMENT WITH ALL ATTRIBUTES NEEDED
        el += '<div class="simple-card-container col-lg-3 col-md-4 col-sm-6 col-12 mb-4 text-center animated fadeIn" style="animation-delay: '+i*0.1+'s;""><a class="card" href="location.html?id='+location.id+'"><img class="card-img-top" src="'+location.image+'"><h5 class="card-title pt-2">'+location.name+'</h5></a></div>';
        

    }
    
    $(".LOCATIONS").append(el);   
    
}                  