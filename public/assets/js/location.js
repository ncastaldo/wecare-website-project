var serviceId;

$(document).ready(function(){
    
    $.getScript("/assets/js/locations.js",function(){
        getData().done(loadLocationData);
    });
    
});

//LOAD THE RESPONSE DATA IN HTML
function loadLocationData(json){
    
    for (let j = 0; j < json.locations.length; j++) {
    
        if(URL.id === json.locations[j].id){
            
            let location = json.locations[j];
            
            $(".LOCATION-NAME").text(location.name);
            $(".LOCATION-DESCRIPTION").html(location.description);
            $(".LOCATION-IMAGE").html('<img src="'+location.image+'" style="max-width:70%; min-width: 200px;" />');
            $(".LOCATION-PRACTICAL-INFO").html(location.practicalInfo);

            let el= "";
            for(let i=0; i<location.photogallery.length; i++){
                el += '<div class="col-lg-4 col-md-6 col-12 d-block mb-4 h-100"><img class="img-fluid img-thumbnail" src="'+location.photogallery[i].image+'" alt=""></div>'
            }
            $(".LOCATION-PHOTOGALLERY").append(el);        
            
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