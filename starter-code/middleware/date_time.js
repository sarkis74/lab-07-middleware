'use strict';

//Write middleware that runs on every route that adds a property called requestTime with a value of the current Date/Time
module.exports = (request, response, next) => {
    const date_time = new Date().toDateString();
    request.requestTime = date_time;
    console.log('Request time: logged')
    next();
};