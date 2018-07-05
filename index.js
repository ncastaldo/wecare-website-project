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

let peopleJson = require("./other/json/people.json");
let peopleServicesJson = require("./other/json/people_services.json");
let locationsJson = require("./other/json/locations.json");
let servicesJson = require("./other/json/services.json");
let locationsServicesJson = require("./other/json/locations_services.json");
let whoWeAreJson = require("./other/json/whoWeAre.json");
let photogalleryJson = require("./other/json/photogallery.json");



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
                filename: "./other/wecare.sqlite"
            }
        });
    }else{
        sqlDb = knex({
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
    return ensureWhoWeAre()
    && ensurePeople() 
    && ensurePeopleServices()
    && ensureLocations() 
    && ensureServices() 
    && ensureLocationsServices() 
    && ensurePhotogallery()
    && ensureRequests();
}

function ensureWhoWeAre(){
    return sqlDb.schema.hasTable("whoWeAre").then(function (exists){
        if(!exists){
            return sqlDb.schema.createTable("whoWeAre", function (table){
                table.integer("id").unsigned();
                table.string("title");
                table.text("description");
                table.string("image");
            }).then( function() {
                let insertion = _.map(whoWeAreJson, function(el) {
                    return sqlDb("whoWeAre").insert(el);
                })
                return Promise.all(insertion); //to return when all promises are fulfilled
            })
        } else {
            return true;
        };
    });
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

//no need to fill it, just create it to save new requests on the ContactUs page
function ensureRequests(){
    return sqlDb.schema.hasTable("requests").then(function (exists){
        if(!exists)
            return sqlDb.schema.createTable("requests", function (table){
                table.increments("id");
                table.timestamp("date").defaultTo(sqlDb.fn.now());
                table.string("fullname");
                table.string("email");
                table.string("telephone");
                table.enu("who",["parent","donator","futureCollaborator","other"]);
                table.text("details");
            })
        return true;                        
    });
}



/***************************/
/***** WEB-SERVER INIT *****/
/***************************/


let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let myPort = process.env.PORT || 3000; // if port is not defined, it is 3000 (heroku VS locally)
app.use(express.static(__dirname + "/public"));
app.set("port", myPort);



/*******************************/
/***** REST ENDPOINTS INIT *****/
/*******************************/


// WHO-WE-ARE

app.get("/rest/whoWeAre", function(req, res){
    let myQuery = sqlDb("whoWeAre")
    .select("id","title", "description", "image")
    .orderBy("id")
    .then( (el) => {
        res.send(
            JSON.stringify(el));
    });
});


// PEOPLE

app.get("/rest/people", function(req, res){
    let myQuery = sqlDb("people")
    .select("id", "firstname", "lastname", "image", "profession")
    .orderBy("firstname")
    .then( (person) => {
        res.send(
            JSON.stringify(person));
    });
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

app.get("/rest/people/:id/services", function(req,res) {
    let personId = req.params.id;
    let myQuery = sqlDb
    .select("services.id","services.name","services.image")
    .from("services")
    .leftJoin("people_services", "services.id", "people_services.serviceId")
    .where("people_services.personId", personId)
    .orderBy("services.name")
    .then( (service) => {
        res.send(JSON.stringify(service));
    });
});


// LOCATIONS

app.get("/rest/locations", function(req, res){
    let myQuery = sqlDb("locations")
    .select("id", "name", "image")
    .orderBy("name")
    .then( (location) => {
        res.send(JSON.stringify(location));
    });
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

app.get("/rest/locations/:id/services", function(req, res){
    let locationId = req.params.id;
    let myQuery = sqlDb
    .select("services.id","services.name","services.image", "services.description1")
    .from("services")
    .leftJoin("locations_services", "services.id", "locations_services.serviceId")
    .where("locations_services.locationId", locationId)
    .orderBy("services.name")
    .then( (service) => {
        res.send(JSON.stringify(service));
    });
});


// SERVICES

app.get("/rest/services", function(req, res){
    let myQuery = sqlDb("services")
    .select("id", "image", "name", "description1")
    .orderBy("name")
    .then( (service) => {
        res.send(JSON.stringify(service));
    });
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

app.get("/rest/services/:id/locations", function(req, res){
    let serviceId = req.params.id;
    let myQuery = sqlDb
    .select("locations.id","locations.name","locations.image")
    .from("locations")
    .leftJoin("locations_services", "locations.id", "locations_services.locationId")
    .where("locations_services.serviceId", serviceId)
    .orderBy("locations.name")
    .then( (location) => {
        res.send(JSON.stringify(location));
    });
});

app.get("/rest/services/:id/people", function(req, res){
    let serviceId = req.params.id;
    let myQuery = sqlDb
    .select("people.id","people.firstname","people.lastname","people.image", "people.profession")
    .from("people")
    .leftJoin("people_services", "people.id", "people_services.personId")
    .where("people_services.serviceId", serviceId)
    .orderBy("people.firstname")
    .then( (people) => {
        res.send(JSON.stringify(people));
    });

});


// CONTACT US

app.get("/rest/requests", function(req, res){
    let myQuery = sqlDb
    .from("requests")
    .then( (contactReq) => {
        res.send(JSON.stringify(contactReq));
    });
});


app.post("/rest/requests", function(req, res){
    let json = req.body;
    console.log("The json that will be inserted: " +json);
    sqlDb("requests")
        .insert({fullname:json.fullname, 
                 email:json.email, 
                 telephone:json.telephone, 
                 who:json.who,
                 details:json.details})
        .then( res.sendStatus(200) );
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


