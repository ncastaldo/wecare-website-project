$(document).ready(function(){
    
    getPeopleData(loadData);
    
});

function getPeopleData(nextMethod){
    
    return $.ajax({
        method: "GET",
        dataType: "json",
        url: "/rest/people", //SERVER URL
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(data){nextMethod(data);}
    });
    
}

                  
                
function loadData(json){
    
    console.log(json);
    let el = "";

    /*Sort people by alphabetical order
    sortedPeople.sort(function(a,b){ 
        if(a.lastname < b.lastname) return -1;
        if(a.lastname > b.lastname) return +1;
        if(a.firstname < b.firstname) return -1;
        if(a.firstname > b.firstname) return +1;
        return 0;
    });*/
    
    
    for (let i = 0; i < json.length; i++) {
        
        let person = json[i];
        
        console.log(person.id);
        
        //CREATE A LI ELEMENT WITH ALL ATTRIBUTES NEEDED
        el += '<div class="col-lg-3 col-md-4 col-sm-6 col-12 text-center mb-4 animated fadeIn" style="animation-delay: '+i*0.1+'s;"><a href="#"><img class="rounded-circle img-fluid d-block p-4" src="'+person.image+'" alt=""><h4>'+person.firstname+' '+person.lastname+'<br><small class="link-description">'+person.profession+'</small></a></div>';

    }
    
    $(".PEOPLE").append(el);   
    
}                  