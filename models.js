const mongoose = require('mongoose');
    let moviesSchema = mongoose.Schema({
        Title: {type: String, required: true},
        Description: {type: String, required: true},
        Genre: {
        Name: String,
        Description: String
        },
        Director: {
        Name: String,
        Bio: String
        },
        ImagePath: String,
        Featured: Boolean
    });
    
    let usersSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: {type: String, required: true},
        email: {type: String, required: true},
        birthday: Date,
        favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
    });
    
    let Movie = mongoose.model('Movie', moviesSchema);
    let User = mongoose.model('User', usersSchema);
    
    module.exports.Movie = Movie;
    module.exports.User = User;