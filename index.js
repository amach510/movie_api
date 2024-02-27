const express = require('express'),
morgan = require('morgan');

const app = express();

// Log all requests; top movies
    let topMovies = [
        {
            title: 'Spirited Away',
            genre: ['Animation', 'Supernatural'],
            director: {
                    directorName: 'Miyazaki, Hayao',
                    bio: 'Founder of Studio Ghibli',
                    birth: '1941'
                },
            date: '2001'
        },
        {
            title: 'Your Name',
            genre: ['Animation', 'Drama', 'Supernatural'],
            director: {
                    directorName: 'Shinkai, Makoto',
                    bio: 'Regarded as "The New Miyazki"',
                    birth: '1973'
                },
            date: '2016'
        },
        {
            title: 'Weathering with You',
            genre: ['Animation', 'Drama', 'Fantasy', 'Romance'],
            director: {
                    directorName: 'Shinkai, Makoto',
                    bio: 'Regarded as "The New Miyazki"',
                    birth: '1973'
                },
            date: '2019'
        },
        {
            title: 'My Neighbor Totoro',
            genre: ['Animation', 'Supernatural'],
            director: {
                    directorName: 'Miyazaki, Hayao',
                    bio: 'Founder of Studio Ghibli',
                    birth: '1941'
                },
            date: '1988'
        },
        {
            title: 'Nausicaa of the Valley of the Wind',
            genre: ['Animation', 'Adventure', 'Fantasy'],
            director: {
                    directorName: 'Miyazaki, Hayao',
                    bio: 'Founder of Studio Ghibli',
                    birth: '1941'
                },
            date: '1984'
        },
        {
            title: 'Redline',
            genre: ['Animation', 'Action', 'Sci-Fi'],
            director: {
                    directorName: 'Koike, Takeshi',
                    bio: 'Protegee of Yoshiaki Kawajiri',
                    birth: '1968'
                },
            date: '2009'
        },
        {
            title: 'Princess Mononoke',
            genre: ['Animation', 'Action', 'Adventure', 'Fantasy'],
            director: {
                    directorName: 'Miyazaki, Hayao',
                    bio: 'Founder of Studio Ghibli',
                    birth: '1941'
                },
            date: '1997'
        },
        {
            title: 'Kiki\'s Delivery Service',
            genre: ['Animation', 'Adventure', 'Comedy', 'Drama', 'Fantasy'],
            director: {
                    directorName: 'Miyazaki, Hayao',
                    bio: 'Founder of Studio Ghibli',
                    birth: '1941'
                },
            date: '1989'
        },
        {
            title: 'A Silent Voice',
            genre: ['Animation', 'Drama'],
            director: {
                    directorName: 'Yamada, Naoko',
                    bio: 'Directed the K-On! and Tamako Market anime series',
                    birth: '1984'
                },
            date: '2016'
        },
        {
            title: 'Ride Your Wave',
            genre: ['Animation', 'Drama', 'Romance', 'Supernatural'],
            director: {
                    directorName: 'Yuasa, Masaaki',
                    bio:'Co-founded Science SARU',
                    birth:'1965'
                },
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

// Morgan middleware library
    app.use(morgan('common'));    

// Error handler
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });    

// Listen requests
    app.listen(8080, () => {
        console.log('Your app is listening on port 8080.');
    });