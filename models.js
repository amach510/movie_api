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
        Actors: [String],
        ImagePath: String,
        Featured: Boolean
    });
    
    let usersSchema = mongoose.Schema({
        Username: {type: String, required: true},
        Password: {type: String, required: true},
        Email: {type: String, required: true},
        Birthday: Date,
        FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
    });
    
    let Movie = mongoose.model('Movie', moviesSchema);
    let User = mongoose.model('User', usersSchema);
    
    module.exports.Movie = Movie;
    module.exports.User = User;