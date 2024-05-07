const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const { check, validationResult } = require('express-validator');
const app = express();

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS (Cross-Origin Resource Sharing)
const cors = require('cors');

// CORS for certain origins to have access
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'https://my-flix-database-movie-app-5157085d44be.herokuapp.com', 'http://localhost:1234', 'https://my-flix-database-movie-app-5157085d44be.herokuapp.com/users','http://localhost:1234/users'];

app.use(cors({
origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
    let message = 'The CORS policy for this application doesn\'t allow access from origin ' + origin;
    return callback(new Error(message ), false);
    }
    return callback(null, true);
}
}));

// Auth.js require
let auth = require('./auth')(app);

// Passport.js require
const passport = require('passport');
require('./passport');

// Morgan middleware library
app.use(morgan('common'));    

//Integrating Mongoose
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

//allows mongoose connection to database for CRUD
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Log all requests
// CREATE request - new user
    //Add a user
app.post('/users', [
    check('username', 'Username is required').isLength({min: 5}),
    check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email does not appear to be valid').isEmail()
], async (req,res) => {
    
    // check the validation object for errors
    let errors = validationResult(req);

    // if (!errors.isEmpty()) {
    // return res.status(422).json({ errors: errors.array() });
    // }

    let hashedPassword = Users.hashPassword(req.body.password);
    await Users.findOne({ username: req.body.Username })
        .then((user) => {
        if (user) {
            return res.status(400).send(req.body.Username + 'already exists');
        } else {
            Users
            .create({
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                birthday: req.body.birthday
            })
            .then((user) =>{res.status(201).json(user) })
            .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
            })
        }
        })
        .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
        });
    });

// UPDATE (PUT) request - existing user update

app.put('/users/:Username', passport.authenticate('jwt', {session: false}), [
        check('username', 'Username is required').isLength({min: 5}),
        check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email does not appear to be valid').isEmail()
    ], async(req,res) => {
    
    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.password);
    await Users.findOneAndUpdate({ username: req.params.Username }, { $set:
        {
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        birthday: req.body.birthday
        }
    },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    })
    
    });

// CREATE (POST) request - adding movie to favorites
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {session: false}), async (req, res) => {
    // CONDITION TO CHECK ADDED HERE
    if(req.user.username !== req.params.Username){
        return res.status(400).send('Permission denied');
    }
    // CONDITION ENDS
    await Users.findOneAndUpdate({ username: req.params.Username }, {
    $push: { favoriteMovies: req.params.MovieID }
    },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
    res.json(updatedUser);
    })
    .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
    });
});

// DELETE (DELETE) request - delete movie from favorites
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {session: false}), async (req, res) => {
    // CONDITION TO CHECK ADDED HERE
    if(req.user.username !== req.params.Username){
        return res.status(400).send('Permission denied');
    }
    // CONDITION ENDS
    await Users.findOneAndUpdate({ username: req.params.Username }, {
        $pull: { favoriteMovies: req.params.MovieID }
    },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// DELETE (DELETE) request - delete existing user
app.delete('/users/:Username', passport.authenticate('jwt', {session: false}), async (req, res) => {
    // CONDITION TO CHECK ADDED HERE
    if(req.user.username !== req.params.Username){
        return res.status(400).send('Permission denied');
    }
    // CONDITION ENDS
    await Users.findOneAndDelete({ username: req.params.Username })
    .then((user) => {
        if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
        } else {
        res.status(200).send(req.params.Username + ' was deleted.');
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// READ request (Movies)
app.get('/movies', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await Movies.find()
        .then((movies) => {
        res.status(201).json(movies);
        })
        .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
        });
    });
// READ request - title
app.get('/movies/:title', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await Movies.findOne({ Title: req.params.title })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});
// READ request - genre
app.get('/movies/genre/:genreName', passport.authenticate('jwt', {session: false}), async (req,res) => {
    await Movies.findOne({ 'Genre.Name': req.params.genreName })
        .then((movie) => {
            res.json(movie.Genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// READ request - director
app.get('/movies/director/:directorName', passport.authenticate('jwt', {session: false}), async (req,res) => {
    await Movies.findOne({ 'Director.Name': req.params.directorName })
        .then((movie) => {
            res.json(movie.Director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// READ all users
app.get('/users', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await Users.find()
    .then((users) => {
        res.status(201).json(users);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// GET requests
app.get('/', (req, res) => {
    res.send ('Welcome to my movie page!');
});

// Get a user by username
app.get('/users/:Username', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await Users.findOne({ username: req.params.Username })
    .then((user) => {
        res.json(user);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});
// Express static
app.use(express.static('public'));

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});    

// Listen requests
const port = process.env.PORT || 8080;
    app.listen(port, '0.0.0.0',() => {
    console.log('Listening on Port ' + port);
    });