$(document).ready(function(){
    
    getData().done(loadData);
    
});

function getData(){
    
    return $.ajax({
        method: "GET",
        dataType: "json",
        url: "/assets/json/services.json", //SERVER URL
        error: function (request, error) {
            console.log(request, error);
        }
    });
}
                  
                
function loadData(json){
    
    console.log(json);
    var el = "";
    
    for (let i = 0; i < json.services.length; i++) {
        
        let service = json.services[i];
        
        console.log(service.id);
        
        //CREATE A LI ELEMENT WITH ALL ATTRIBUTES NEEDED
        el += '<div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 text-center"><div class="card"><img class="card-img-top" src="'+service.image+'"><div class="card-body pb-2"><h5 class="card-title">'+service.name+'</h5><p class="card-description">'+service.description1+'</p></div><div class="card-footer"><a href="service.html?id='+service.id+'" class="btn btn-primary">Read more</a></div></div></div>';

    }
    
    $(".SERVICES").append(el);   
    
}                  