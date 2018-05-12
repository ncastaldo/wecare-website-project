$(document).ready(function(){
    
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "/assets/json/people.json", //SERVER URL
        
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
    
    for (let i = 0; i < json.people.length; i++) {
        
        let person = json.people[i];
        
        console.log(person.id);
        
        //CREATE A LI ELEMENT WITH ALL ATTRIBUTES NEEDED
        el += '<div class="col-lg-3 col-md-4 col-sm-6 col-12 text-center mb-4"><a href="#"><img class="rounded-circle img-fluid d-block p-4" src="'+person.image+'" alt=""></a><h4>'+person.firstname+' '+person.lastname+'<br><small>'+person.profession+'</small></h4>'+person.description+'</div>';

    }
    
    $(".PEOPLE").append(el);   
    
}                  