$(document).ready(function(){
    
    getData().done(loadData);
    
    
    
});

function getData(){
    
    return $.ajax({
        method: "GET",
        dataType: "json",
        url: "/assets/json/locations.json", //SERVER URL
        error: function (request, error) {
            console.log(request, error);
        }
    });
    
}
                  
                
function loadData(json){
    
    console.log(json);
    var el = "";
    
    for (let i = 0; i < json.locations.length; i++) {
        
        let location = json.locations[i];
        
        console.log(location.id);
        
        //CREATE A LI ELEMENT WITH ALL ATTRIBUTES NEEDED
        el += '<div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 text-center"><a class="card" href="location.html?id='+location.id+'"><img class="card-img-top" src="'+location.image+'"><h3 class="card-title pt-2 link-custom">'+location.name+'</h3></a></div>';
        

    }
    
    $(".LOCATIONS").append(el);   
    
}                  