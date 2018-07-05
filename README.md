# README

## Web application
- Heroku URL:  https://polimi-hyp-2018-team-10472465.herokuapp.com
- Bitbucket repo URL:  https://bitbucket.org/polimihyp2018team10472465/polimi-hyp-2018-project/src/master/

## Team
- Team administrator:   NICOLA, CASTALDO,   10472465,   polimi-hyp-2018-10472465
- Team member n.2   :   ROBERT, AMAHIRWE,   10453754,   polimi-hyp-2018-10453754

## Database structure //TODO
![alt text](file:///Users/Nicola/hypermedia/polimi-hyp-2018-project/other/db.png)

## Description of the REST API

###### - [/rest/whoWeAre](https://polimi-hyp-2018-team-10472465.herokuapp.com/rest/whoWeAre)
- Returns: who we are 
- Usage: [WHO WE ARE](https://polimi-hyp-2018-team-10472465.herokuapp.com/pages/whoWeAre.html)

###### - [/rest/people](https://polimi-hyp-2018-team-10472465.herokuapp.com/rest/people)
- Returns: all the people 
- Fields: "id", "firstname", "lastname", "image", "profession"
- Usage: [PEOPLE](https://polimi-hyp-2018-team-10472465.herokuapp.com/pages/people.html)

###### - /rest/people/:id
- :id = identifier of the person in the database
- Returns: all the data about a specific person
- Example: [/rest/people/1](https://polimi-hyp-2018-team-10472465.herokuapp.com/rest/people/1)
- Usage: [PERSON](https://polimi-hyp-2018-team-10472465.herokuapp.com/pages/person.html?id=1)

###### - /rest/people/:id/services
- :id = identifier of the person in the database
- Returns: all the services related to a specific person
- Fields: "id","name","image"
- Example: [/rest/people/1/services](https://polimi-hyp-2018-team-10472465.herokuapp.com/rest/people/1/services)
- Usage: [PERSON](https://polimi-hyp-2018-team-10472465.herokuapp.com/pages/person.html?id=1)

###### - [/rest/locations](https://polimi-hyp-2018-team-10472465.herokuapp.com/rest/locations)
- Returns: all the locations 
- Fields: "id", "name", "image"
- Usage: [LOCATIONS](https://polimi-hyp-2018-team-10472465.herokuapp.com/pages/locations.html)

###### - /rest/locations/:id
- :id = identifier of the location in the database
- Returns: all the data about a specific location
- Example: [/rest/locations/1](https://polimi-hyp-2018-team-10472465.herokuapp.com/rest/locations/1)
- Usage: [LOCATION](https://polimi-hyp-2018-team-10472465.herokuapp.com/pages/location.html?id=1)

###### - /rest/locations/:id/photogallery
- :id = identifier of the location in the database
- Returns: the links of the images related to a specific location
- Fields: "image"
- Example: [/rest/locations/1/photogallery](https://polimi-hyp-2018-team-10472465.herokuapp.com/rest/locations/1/photogallery)
- Usage: [LOCATION](https://polimi-hyp-2018-team-10472465.herokuapp.com/pages/location.html?id=1)

###### - /rest/locations/:id/services
- :id = identifier of the location in the database
- Returns: all the services related to a specific location
- Fields: "id", "name","image", "description1"
- Example: [/rest/locations/1/services](https://polimi-hyp-2018-team-10472465.herokuapp.com/rest/locations/1/services)
- Usage: [SERVICES BY LOCATION](https://polimi-hyp-2018-team-10472465.herokuapp.com/pages/services.html#locationId=1)

###### - [/rest/services](https://polimi-hyp-2018-team-10472465.herokuapp.com/rest/services)
- Returns: all the services
- Fields: id", "image", "name", "description1"
- Usage: [SERVICES](https://polimi-hyp-2018-team-10472465.herokuapp.com/pages/services.html)

###### - /rest/services/:id
- :id = identifier of the service in the database
- Returns: all the data about a specific service (exept for "description1" that is not used)
- Example: [/rest/services/1](https://polimi-hyp-2018-team-10472465.herokuapp.com/rest/services/1)
- Usage: [SERVICE](https://polimi-hyp-2018-team-10472465.herokuapp.com/pages/service.html?id=1)

###### - /rest/services/:id/photogallery
- :id = identifier of the service in the database
- Returns: the links of the images related to a specific service
- Fields: "image"
- Example: [/rest/services/1/photogallery](https://polimi-hyp-2018-team-10472465.herokuapp.com/rest/services/1/photogallery)
- Usage: [SERVICE](https://polimi-hyp-2018-team-10472465.herokuapp.com/pages/service.html?id=1)

###### - /rest/services/:id/locations
- :id = identifier of the service in the database
- Returns: all the locations related to a specific service
- Fields: "id","name","image"
- Example: [/rest/services/1/locations](https://polimi-hyp-2018-team-10472465.herokuapp.com/rest/services/1/locations)
- Usage: [SERVICE](https://polimi-hyp-2018-team-10472465.herokuapp.com/pages/service.html?id=1)

###### - /rest/services/:id/people
- :id = identifier of the service in the database
- Returns: all the people related to a specific service
- Fields: "id", "firstname", "lastname", "image", "profession"
- Example: [/rest/services/1/people](https://polimi-hyp-2018-team-10472465.herokuapp.com/rest/services/1/people)
- Usage: [PEOPLE BY SERVICE](https://polimi-hyp-2018-team-10472465.herokuapp.com/pages/people.html#serviceId=1)

#### Optional

###### - [/rest/requests](https://polimi-hyp-2018-team-10472465.herokuapp.com/rest/requests)
- Returns: all the requests sent with the contact-us form
- Attention! This REST endpoint is only for **TESTING** purpose and for the professor to verify its functionality. This endpoint should not be visible from the outside, because it may contain sensitive informations

###### - /rest/requests - POST
- Accepts: a JSON file containing the information filled in the form of the Contact Us page
- Usage: [CONTACT-US](https://polimi-hyp-2018-team-10472465.herokuapp.com/pages/contactUs.html)



