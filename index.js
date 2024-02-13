const express = require('express');
const app = express();

// Log all requests; top movies
    let topMovies = [
        {
            title: 'Spirited Away',
            date: '2001'
        },
        {
            title: 'Your Name',
            date: '2016'
        },
        {
            title: 'Wandering with You',
            date: '2019'
        },
        {
            title: 'My Neighbor Totoro',
            date: '1988'
        },
        {
            title: 'Nausicaa of the Valley of the Wind',
            date: '1984'
        },
        {
            title: 'Redline',
            date: '2009'
        },
        {
            title: 'Princess Mononoke',
            date: '1997'
        },
        {
            title: 'Kiki\'s Delivery Service',
            date: '1989'
        },
        {
            title: 'A Silent Voice',
            date: '2016'
        },
        {
            title: 'Ride Your Wave',
            date: '2020'
        }
    ];

// GET request
    app.get('/', (req, res) => {
        res.send ('Welcome to my movie page!');
    });

    app.get('/movies', (req,res) => {
        res.json(topMovies);
    });

// Express static
    app.use(express.static('public'));
    
// Listen requests
    app.listen(8080, () => {
        console.log('Your app is listening on port 8080.');
    });