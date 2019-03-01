'use strict';

const express = require('express');
const app = express();

const errorMiddleware = require('./error');
const notFoundMiddleware = require('./404');
const dateTimeMiddleware = require('./date_time')

const PORT = process.env.PORT || 8080;

app.use(errorMiddleware);

//Catch-all route(/notFound) that uses it
app.use('/notFound', notFoundMiddleware);

app.use(dateTimeMiddleware);

//Write middleware that runs on every route that will run a console.log() containing the method, path, and the new property requestTime from the request
app.use((request, response, next) => {
    console.log(`Date/Time: ${request.requestTime} \n Method: ${request.method} \n URL: ${request.url}`);
    next();
});

//Write middleware that runs only on the /c route that performs an additional console.log() with a randomly generated number
app.use('/c', (error, request, response, next) => {
    console.log(Math.floor((Math.random() * 100) + 1));
    next();
});

//Write middleware that runs on the /d route that raises an error using next
app.use('/d', (error, request, response, next) => {
    next(error);
})

//Write middleware that runs on the and /b route that takes a number as a parameter, squares it, and and sets that value on the request object in a property called number
app.use('/b/:id', (request, response, next) => {
     request.number = Math.pow(request.params.id, 2);
     console.log(request.number);
     next();
});


app.get('/a', (request,response) => {
    response.status(200).send('Route A');
});

app.get('/b', (request,response) => {
    response.status(200).send('Route B');
});

app.get('/b/:id', (request,response) => {
    response.send(request.number.toString());
});

app.get('/c', (request,response) => {
    response.status(200).send('Route C');
});

app.get('/d', (request,response) => {
    response.status(200).send('Route D');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
