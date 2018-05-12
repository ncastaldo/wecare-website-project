$(document).ready(function(){
    
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/assets/json/services.json", //SERVER URL
        //RETRIEVING ALL SERVICES - no rest implemented with query
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
    
    for (let j = 0; j < json.services.length; j++) {
    
        if(URL.id === json.services[j].id){
            
            let service = json.services[j];
            
            $(".SERVICE-NAME").text(service.name);
            $(".SERVICE-DESCRIPTION").html(service.description2);
            $(".SERVICE-IMAGE").html('<img src="'+service.image+'" style="max-width:70%; min-width: 200px;" />');
            $(".SERVICE-PRACTICAL-INFO").html(service.practicalInfo);

            let el= "";
            for(let i=0; i<service.photogallery.length; i++){
                el += '<div class="col-lg-4 col-md-6 col-12 d-block mb-4 h-100"><img class="img-fluid img-thumbnail" src="'+service.photogallery[i].image+'" alt=""></div>'
            }
            $(".SERVICE-PHOTOGALLERY").append(el);        
            
        }
    
    }
    
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
