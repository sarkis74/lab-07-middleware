'use strict';


//Write not found middleware
module.exports = (request, response, next) => {
    console.log('Route not found');
    response.status(404).send('An error has been encountered');
    response.end();
};