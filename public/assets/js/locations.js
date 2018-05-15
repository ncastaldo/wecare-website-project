$(document).ready(function(){
    
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/assets/json/locations.json", //SERVER URL
        
        success: function (response) {
            console.log(response); //LOG RESPONSE
            loadData(response); //LOAD THE RESPONSE DATA IN HTML
        },
        error: function (request, error) {
            console.log(request, error);
        }
    });
    
});
                  
                
function loadData(json){
    
    console.log(json);
    var el = "";
    
    for (let i = 0; i < json.locations.length; i++) {
        
        let location = json.locations[i];
        
        console.log(location.id);
        
        //TODO change the href
        
        //CREATE A LI ELEMENT WITH ALL ATTRIBUTES NEEDED
        el += '<div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 text-center"><a class="card" href="home.html"><img class="card-img-top" src="'+location.image+'"><h3 class="card-title pt-2 link-custom">'+location.name+'</h3></a></div>';
        

    }
    
    $(".LOCATIONS").append(el);   
    
}                  