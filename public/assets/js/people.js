$(document).ready(function(){
    
    getData().done(loadData);
    
});

function getData(){
    
    return $.ajax({
        method: "GET",
        dataType: "json",
        url: "/assets/json/people.json", //SERVER URL
        error: function (request, error) {
            console.log(request, error);
        }
    });
    
}

                  
                
function loadData(json){
    
    console.log(json);
    let el = "";
    
    console.log(json.people)
    
    let sortedPeople = json.people;
    
    //Sort people by alphabetical order
    sortedPeople.sort(function(a,b){ 
        if(a.lastname < b.lastname) return -1;
        if(a.lastname > b.lastname) return +1;
        if(a.firstname < b.firstname) return -1;
        if(a.firstname > b.firstname) return +1;
        return 0;
    });
    
    console.log(sortedPeople);
    
    for (let i = 0; i < sortedPeople.length; i++) {
        
        let person = sortedPeople[i];
        
        console.log(person.id);
        
        //CREATE A LI ELEMENT WITH ALL ATTRIBUTES NEEDED
        el += '<div class="col-lg-3 col-md-4 col-sm-6 col-12 text-center mb-4"><a href="#"><img class="rounded-circle img-fluid d-block p-4" src="'+person.image+'" alt=""></a><h4>'+person.firstname+' '+person.lastname+'<br><small>'+person.profession+'</small></h4>'+person.description+'</div>';

    }
    
    $(".PEOPLE").append(el);   
    
}                  