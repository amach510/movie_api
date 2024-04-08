const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const app = express();

// Body Parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

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
mongoose.connect('mongodb://localhost:27017/myFlix', { useNewUrlParser: true, useUnifiedTopology: true });

// Log all requests
    // JWT authentation endpoint
    app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
        await Movies.find()
          .then((movies) => {
            res.status(201).json(movies);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      });

    // CREATE request - new user
    //Add a user
        /* We’ll expect JSON in this format
        {
            ID: Integer,
            Username: String,
            Password: String,
            Email: String,
            Birthday: Date
        }*/
    app.post('/users', async (req,res) => {
        await Users.findOne({ username: req.body.Username })
          .then((user) => {
            if (user) {
              return res.status(400).send(req.body.Username + 'already exists');
            } else {
              Users
                .create({
                  username: req.body.username,
                  password: req.body.password,
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
        /* We’ll expect JSON in this format
        {
            Username: String,
            (required)
            Password: String,
            (required)
            Email: String,
            (required)
            Birthday: Date
        }*/
        app.put('/users/:Username', passport.authenticate('jwt', {session: false}), async(req,res) => {
            // CONDITION TO CHECK ADDED HERE
            if(req.user.Username !== req.params.Username){
                return res.status(400).send('Permission denied');
            }
            // CONDITION ENDS
            await Users.findOneAndUpdate({ username: req.params.Username }, { $set:
                {
                username: req.body.username,
                password: req.body.password,
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
        app.post('/users/:Username/movies/:MovieID', async (req, res) => {
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
            await Users.findOneAndUpdate({ username: req.params.Username }, {
                $pull: { FavoriteMovies: req.params.MovieID }
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
            try {
                const movies = await Movies.find();
                res.status(200).json(movies);
            } catch (error) {
                console.error(error);
                res.status(500).send('Error: ' + error);
            }
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
        app.get('/users', async (req, res) => {
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
    app.listen(8080, () => {
        console.log('Your app is listening on port 8080.');
    });