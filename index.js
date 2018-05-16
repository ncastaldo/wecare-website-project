let express = require("express");
let app = express();
let process = require("process");
let bodyParser = require("body-parser");
let _ = require("lodash");
let myPort = process.env.PORT | 3000; // if port is not defined, it is 3000 (heroku VS locally)



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let peopleData = require("./public/assets/json/people.json");

app.use(express.static(__dirname + "/public"));
app.set("port", myPort);

app.get("/people", function(req, res){
    res.send(JSON.stringify(peopleData));
});

app.get("/people/:id", function(req,res) {
    
    let personId = req.params.id;
    let found = false;
    
    console.log(" --------- "+personId+" ---------- ");
    
    let person = _.find(peopleData.people, function(o){
        return o.id === personId;
    });
    if(_.isUndefined(person)){
        res.status(400);
        res.send({message : "Person not found!"});
    }else{
        res.status(200);
        res.send(JSON.stringify(person));
    }
    
    /*
    
    for(let i = 0; i<peopleData.people.length && !found; i++){
        if(peopleData.people[i].id === personId){
            res.send(JSON.stringify(peopleData.people[i]));
            found = true;
        }
    }
    if(!found){
        res.status(400);
        res.send({message : "Person not found!"});
    }*/
});

app.listen(myPort, function(){
    console.log("The server is running on port: " + myPort);
})