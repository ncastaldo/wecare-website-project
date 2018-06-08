/*************************/
/***** REQUIRE FILES *****/
/*************************/

let express = require("express");
let process = require("process");
let bodyParser = require("body-parser");
let _ = require("lodash");
let knex = require("knex");



/*************************/
/***** JSON UPLOADER *****/
/*************************/

let peopleJson = require("./public/assets/json/people.json");
let peopleServicesJson = require("./public/assets/json/people_services.json");
let locationsJson = require("./public/assets/json/locations.json");
let servicesJson = require("./public/assets/json/services.json");
let locationsServicesJson = require("./public/assets/json/locations_services.json");
let whoWeAreJson = require("./public/assets/json/whoweare.json");
let photogalleryJson = require("./public/assets/json/photogallery.json");



/*************************/
/***** DATABASE INIT *****/
/*************************/

let sqlDb;
function initDatabaseConnection(){

    /* locally
        
        TEST=true node index
        
    */
    
    
    
    if (process.env.TEST){
        sqlDb = knex({
            client: "sqlite3",
            debug: true,
            connection: {
                filename: "./wecare.sqlite"
            }
        });
    }else{
        sqlDb = sqlDbFactory({
            debug: true,
            client: "pg",
            connection: process.env.DATABASE_URL,
            ssl: true
        });   
    }

}



/*****************************/
/***** DATABASE POPULATE *****/
/*****************************/

function ensurePopulated(){
    //this returns a "promise", I can use "then" with a callback
    return ensurePeople() 
        && ensurePeopleServices()
        && ensureLocations() 
        && ensureServices() 
        && ensureLocationsServices() 
        && ensurePhotogallery();
}

function ensurePeople(){
    return sqlDb.schema.hasTable("people").then(function (exists){
        if(!exists){
            //I have to fill it with data, 1st param name of table, 2nd param callback when finish
            return sqlDb.schema.createTable("people", function (table){
                table.integer("id").unsigned();
                table.string("firstname");
                table.string("lastname");
                table.text("image"); //Better "text" than "string" when content exceeds 255 chars
                table.string("profession");
                table.text("description");
            }).then( function() {
                //insert single element: return sqlDb("people").insert(peopleData[0]);
                let insertion = _.map(peopleJson, function(el) {
                    //delete el.id; //delete the id in json, before
                    return sqlDb("people").insert(el);
                })
                return Promise.all(insertion); //to return when all promises are fulfilled
            })

        } else {
            return true;
        };
    });
}


function ensurePeopleServices(){
    return sqlDb.schema.hasTable("people_services").then(function (exists){
        if(!exists){
            return sqlDb.schema.createTable("people_services", function (table){
                table.integer("personId").unsigned();
                table.integer("serviceId").unsigned();
            }).then( function() {
                let insertion = _.map(peopleServicesJson, function(el) {
                    return sqlDb("people_services").insert(el);
                })
                return Promise.all(insertion); //to return when all promises are fulfilled
            })
        } else {
            return true;
        };
    });


}

function ensureLocations(){
    return sqlDb.schema.hasTable("locations").then(function (exists){
        if(!exists){
            return sqlDb.schema.createTable("locations", function (table){
                table.integer("id").unsigned();
                table.string("city");
                table.string("name");
                table.text("image");
                table.text("description");
                table.text("practicalInfo");
                table.text("contactPerson");
                table.string("address");
                table.string("email");
                table.string("telephone");   
                table.text("photogallery");   
            }).then( function() {
                let insertion = _.map(locationsJson, function(el) {
                    return sqlDb("locations").insert(el);
                })
                return Promise.all(insertion); //to return when all promises are fulfilled
            })
        } else {
            return true;
        };
    });
}

function ensureServices(){
    return sqlDb.schema.hasTable("services").then(function (exists){
        if(!exists){
            return sqlDb.schema.createTable("services", function (table){
                table.integer("id").unsigned();
                table.string("name");
                table.text("image");
                table.text("description1");
                table.text("description2");
                table.text("practicalInfo");    
            }).then( function() {
                let insertion = _.map(servicesJson, function(el) {
                    return sqlDb("services").insert(el);
                })
                return Promise.all(insertion); //to return when all promises are fulfilled
            })
        } else {
            return true;
        };
    });
}

function ensureLocationsServices(){
    return sqlDb.schema.hasTable("locations_services").then(function (exists){
        if(!exists){
            return sqlDb.schema.createTable("locations_services", function (table){
                table.integer("locationId").unsigned();
                table.integer("serviceId").unsigned();
            }).then( function() {
                let insertion = _.map(locationsServicesJson, function(el) {
                    return sqlDb("locations_services").insert(el);
                })
                return Promise.all(insertion); //to return when all promises are fulfilled
            })
        } else {
            return true;
        };
    });
}

function ensurePhotogallery(){
    return sqlDb.schema.hasTable("photogallery").then(function (exists){
        if(!exists){
            return sqlDb.schema.createTable("photogallery", function (table){
                table.enu("type",["service","location"]);
                table.integer("id").unsigned();
                table.text("image");
            }).then( function() {
                let insertion = _.map(photogalleryJson, function(el) {
                    return sqlDb("photogallery").insert(el);
                })
                return Promise.all(insertion); //to return when all promises are fulfilled
            })
        } else {
            return true;
        };
    });
}



/***************************/
/***** WEB-SERVER INIT *****/
/***************************/


let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let myPort = process.env.PORT | 3000; // if port is not defined, it is 3000 (heroku VS locally)
app.use(express.static(__dirname + "/public"));
app.set("port", myPort);



/*******************************/
/***** REST ENDPOINTS INIT *****/
/*******************************/


// PEOPLE

app.get("/rest/people", function(req, res){
    let start = parseInt(_.get(req, "query.start", 0)); //if the start (query param) is not defined -> 0 is default
    let limit = parseInt(_.get(req, "query.limit", 5));

    let serviceId = parseInt(_.get(req, "query.serviceId", -1));

    if(serviceId<0){
        let myQuery = sqlDb("people")
        .offset(start)
        .limit(limit)
        .orderBy("lastname", "firstname")
        .then( (person) => {
            res.send(JSON.stringify(person));
        });
    }else{
        let myQuery = sqlDb
        .select("people.id","people.firstname","people.lastname","people.image", "people.profession")
        .from("people")
        .leftJoin("people_services", "people.id", "people_services.personId")
        .where("people_services.serviceId", serviceId)
        .orderBy("people.lastname","people.firstname")
        .then( (people) => {
            res.send(JSON.stringify(people));
        });
    }

});

app.get("/rest/people/:id", function(req,res) {

    let personId = req.params.id;
    let myQuery = sqlDb("people")
    .where("id", personId)
    .first()
    .then( (person) => {
        res.send(JSON.stringify(person));
    });

});




// LOCATIONS

app.get("/rest/locations", function(req, res){
    let start = parseInt(_.get(req, "query.start", 0)); //if the start (query param) is not defined -> 0 is default
    let limit = parseInt(_.get(req, "query.limit", 5));

    let serviceId = parseInt(_.get(req, "query.serviceId", -1));

    if(serviceId<0){
        let myQuery = sqlDb("locations")
        .offset(start)
        .limit(limit)
        .orderBy("name")
        .then( (location) => {
            res.send(JSON.stringify(location));
        });

    }else{

        let myQuery = sqlDb
        .select("locations.id","locations.name","locations.image", "locations.city")
        .from("locations")
        .leftJoin("locations_services", "locations.id", "locations_services.locationId")
        .where("locations_services.serviceId", serviceId)
        .orderBy("locations.name")
        .then( (location) => {
            res.send(JSON.stringify(location));
        });

    }

});

app.get("/rest/locations/:id", function(req, res){
    let locationId = req.params.id;
    let myQuery = sqlDb("locations")
    .where("id", locationId)
    .first()
    .then( (location) => {
        res.send(JSON.stringify(location));
    });
});

app.get("/rest/locations/:id/photogallery", function(req, res){
    let locationId = req.params.id;
    let myQuery = sqlDb.select("image")
    .from("photogallery")
    .where("id", locationId)
    .andWhere("type", "location")
    .then( (image) => {
        res.send(JSON.stringify(image));
    });
});



// SERVICES

app.get("/rest/services", function(req, res){

    let start = parseInt(_.get(req, "query.start", 0)); //if the start (query param) is not defined -> 0 is default
    let limit = parseInt(_.get(req, "query.limit", 5));

    let locationId = parseInt(_.get(req, "query.locationId", -1));
    let personId = parseInt(_.get(req, "query.personId", -1));

    if(locationId > 0){
        let myQuery = sqlDb
        .select("services.id","services.name","services.image", "services.description1")
        .from("services")
        .leftJoin("locations_services", "services.id", "locations_services.serviceId")
        .where("locations_services.locationId", locationId)
        .orderBy("services.name")
        .then( (service) => {
            res.send(JSON.stringify(service));
        });

    }else if(personId > 0){

        let myQuery = sqlDb
        .select("services.id","services.name","services.image")
        .from("services")
        .leftJoin("people_services", "services.id", "people_services.serviceId")
        .where("people_services.personId", personId)
        .orderBy("services.name")
        .then( (service) => {
            res.send(JSON.stringify(service));
        });

    }else{

        let myQuery = sqlDb("services")
        .offset(start)
        .limit(limit)
        .orderBy("name")
        .then( (service) => {
            res.send(JSON.stringify(service));
        });
    }
});


app.get("/rest/services/:id", function(req, res){
    let serviceId = req.params.id;
    let myQuery = sqlDb("services")
    .where("id", serviceId)
    .first()
    .then( (service) => {
        res.send(JSON.stringify(service));
    });
});

app.get("/rest/services/:id/photogallery", function(req, res){
    let serviceId = req.params.id;
    let myQuery = sqlDb.select("image")
    .from("photogallery")
    .where("id", serviceId)
    .andWhere("type", "service")
    .then( (image) => {
        res.send(JSON.stringify(image));
    });
});



/***********************************/
/***** START THE WHOLE MACHINE *****/
/***********************************/

initDatabaseConnection();
ensurePopulated().then(function(){
    app.listen(myPort, function(){
        console.log("The server is running on port: " + myPort);
    });
});





/* COMMENTS */


/*
app.get("/rest/people/:id", function(req,res) {

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

    for(let i = 0; i<peopleData.people.length && !found; i++){
        if(peopleData.people[i].id === personId){
            res.send(JSON.stringify(peopleData.people[i]));
            found = true;
        }
    }
    if(!found){
        res.status(400);
        res.send({message : "Person not found!"});
    }

*/


//knex js for database switch (remote - local)

/* OLD VERSION
app.get("/people", function(req, res){
    let myQuery = sqlDb("people").then( (person) => {
        res.send(JSON.stringify(person));
    })
});
*/

