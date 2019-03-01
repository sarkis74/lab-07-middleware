'use strict';


//Write error handling middleware
module.exports = (error, request, response, next) => {
    console.log(error.stack);
    response.status(500).send('An error has been encountered');
};