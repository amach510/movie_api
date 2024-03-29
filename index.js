const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const morgan = require('morgan');
const app = express();

//Integrating Mongoose
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

//allows mongoose connection to database for CRUD
mongoose.connect('mongodb://localhost:27017/myFlix', { useNewUrlParser: true, useUnifiedTopology: true });

// Body Parser
app.use(bodyParser.json());

// Morgan middleware library
app.use(morgan('common'));    

// Log all requests
    let users = [
        {
            id: 1,
            name: 'Jim',
            favoriteMovies: ['Weathering with You']
        },
        {
            id: 2,
            name: 'Carrie',
            favoriteMovies: []
        },
    ]

    let movies = [
        {
            title: 'Spirited Away',
            description: 'Vivid and intriguing, Spirited Away tells the story of Chihiro\'s journey through an unfamiliar world as she strives to save her parents and return home.',
            genre: {
                    name: 'Supernatural',
                    description:'The supernatural genre encompasses storytelling that involves elements beyond the natural world, often featuring supernatural phenomena, mystical forces, paranormal activities, or entities that defy the laws of nature.'
                    },
            director: {
                    name: 'Miyazaki, Hayao',
                    bio: 'Founder of Studio Ghibli',
                    birthYear: '1941',
                    deathYear: '',
                },
            imageURL: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTqTEoJUOlTg4HakvM3SHU0a7a3gFpAQ1HrBL21fBAr1OYOeocP",
            date: '2001',
            featured: false
        },
        {
            title: 'Your Name',
            description: 'Your Name revolves around Mitsuha and Taki\'s actions, which begin to have a dramatic impact on each other\'s lives, weaving them into a fabric held together by fate and circumstance.',
            genre: {
                    name: 'Drama',
                    description: 'The drama genre typically explores realistic and emotionally charged narratives, focusing on the complexities of human relationships, personal growth, and the everyday struggles and triumphs of characters in various life situations.'
                },
            director: {
                    name: 'Shinkai, Makoto',
                    bio: 'Regarded as "The New Miyazki"',
                    birthYear: '1973',
                    deathYear: '',
                },
            imageURL: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSdCn7P_niNCbNFHt9vLgDc-YlRIhwvnCPtHzyiHVP_GK-XmDS1",
            date: '2016',
            featured: false
        },
        {
            title: 'Weathering with You',
            description: 'Enchanting yet bittersweet love story between a teenage boy who can control the weather and a girl with a mysterious ability, set against the backdrop of a Tokyo plagued by incessant rain.',
            genre: {
                    name: 'Romance',
                    description: 'Romance is a genre characterized by narratives that center around love and emotional relationships, often highlighting the development of romantic connections, challenges, and the pursuit of intimacy between characters.'
                },
            director: {
                    name: 'Shinkai, Makoto',
                    bio: 'Regarded as "The New Miyazki"',
                    birthYear: '1973',
                    deathYear: '',
                },
            imageURL: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQfiDnbbGZmmZfAnbjsU_AKKAsRfa4VmskkCWbhrmrYqnVtZWq2",
            date: '2019',
            featured: false
        },
        {
            title: 'My Neighbor Totoro',
            description: 'The magical adventures of two young sisters who befriend forest spirits, particularly the lovable creature Totoro, while navigating the challenges of moving to a new countryside home.',
            genre: {
                name: 'Supernatural',
                description:'The supernatural genre encompasses storytelling that involves elements beyond the natural world, often featuring supernatural phenomena, mystical forces, paranormal activities, or entities that defy the laws of nature.'
                },
            director: {
                    name: 'Miyazaki, Hayao',
                    bio: 'Founder of Studio Ghibli',
                    birthYear: '1941',
                    deathYear: '',
                },
            imageURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcShhQmWrd7gqouln_mhRDdoLy8MkIOwZj1cNx7xhUU2I4cB0IEJ',
            date: '1988',
            featured: false
        },
        {
            title: 'Nausicaä of the Valley of the Wind',
            description: 'The courageous Princess Nausicaä strives to bring harmony between humanity and the environment in a post-apocalyptic world threatened by toxic jungles and warring nations.',
            genre:{ 
                    name: 'Adventure',
                    description: 'The adventure genre encompasses narratives that revolve around characters undertaking perilous journeys, quests, or explorations, often featuring excitement, challenges, and a sense of discovery in unfamiliar and thrilling environments.'
                },
            director: {
                    name: 'Miyazaki, Hayao',
                    bio: 'Founder of Studio Ghibli',
                    birthYear: '1941',
                    deathYear: '',
                },
            imageURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRGi4HGfC4oJM34jPoaTDWLvMOlNxiXk0DZSyO57mQtZb2FirdB',
            date: '1984',
            featured: false
        },
        {
            title: 'Redline',
            description: 'High-octane Japanese animated film, featuring intense, intergalactic racing competition as daredevil racer JP strives to win the ultimate Redline race on a dangerous and visually stunning alien planet.',
            genre:{ 
                    name: 'Sci-Fi',
                    description: 'Science fiction, or sci-fi, is a genre that explores speculative and futuristic concepts, often incorporating advanced technology, space exploration, and scientific principles to envision alternative realities, possible futures, and the impact of scientific advancements on society.'
                },
            director: {
                    name: 'Koike, Takeshi',
                    bio: 'Protegee of Yoshiaki Kawajiri',
                    birthYear: '1968',
                    deathYear: '',
                },
            imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-r0UhA_dp_pNbQQY1l1GytMTOEAS6qD-413w9f-2ME5tg6GEF',
            date: '2009',
            featured: false
        },
        {
            title: 'Princess Mononoke',
            description: 'Chronicling the journey of a young warrior named Ashitaka, who becomes entangled in a conflict between industrial humans and nature spirits, led by the fierce and enigmatic Princess Mononoke, in a beautifully crafted tale of environmentalism and the struggle for balance.',
            genre:{
                    name: 'Fantasy',
                    description: 'Fantasy is a genre characterized by imaginative and often magical elements, where stories unfold in fantastical worlds with mythical creatures, magical powers, and extraordinary settings that go beyond the bounds of reality.'
                },
            director: {
                    name: 'Miyazaki, Hayao',
                    bio: 'Founder of Studio Ghibli',
                    birthYear: '1941',
                    deathYear: '',
                },
            imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQntZTJb1c6O4iFaT_Ll3w4a-R3TzlpID2dJ0wDdwjemnMbOx7r',
            date: '1997',
            featured: false
        },
        {
            title: 'Kiki\'s Delivery Service',
            description: 'Following the coming-of-age journey of a young witch named Kiki as she establishes her own delivery service in a quaint seaside town, discovering friendship and self-confidence along the way.',
            genre: {
                    name: 'Adventure',
                    description: 'The adventure genre encompasses narratives that revolve around characters undertaking perilous journeys, quests, or explorations, often featuring excitement, challenges, and a sense of discovery in unfamiliar and thrilling environments.'
                },
            director: {
                    name: 'Miyazaki, Hayao',
                    bio: 'Founder of Studio Ghibli',
                    birthYear: '1941',
                    deathYear: '',
                },
            imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHAXQmo6UAT_P8xIAppBglmEruxxExDBGELnwXCqjDjZToWwXr',
            date: '1989',
            featured: false
        },
        {
            title: 'A Silent Voice',
            description: 'Delving into themes of redemption and empathy as it tells the story of a former bully seeking redemption and connection with a deaf classmate he once tormented in elementary school.',
            genre: {
                name: 'Drama',
                description: 'The drama genre typically explores realistic and emotionally charged narratives, focusing on the complexities of human relationships, personal growth, and the everyday struggles and triumphs of characters in various life situations.'
            },
            director: {
                    name: 'Yamada, Naoko',
                    bio: 'Directed the K-On! and Tamako Market anime series',
                    birthYear: '1984',
                    deathYear: '',
                },
            imageURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQJrlYXvqlm1bAFMMfjhlX970K4B0z2AJv66KKb1Y9gW-4eml2X',
            date: '2016',
            featured: false
        },
        {
            title: 'Ride Your Wave',
            description: 'Blending romance and fantasy as it follows a young woman who discovers the transformative power of love and resilience after her surfer boyfriend\'s tragic death.',
            genre: {
                    name: 'Drama',
                    description: 'The drama genre typically explores realistic and emotionally charged narratives, focusing on the complexities of human relationships, personal growth, and the everyday struggles and triumphs of characters in various life situations.'
                },
            director: {
                    name: 'Yuasa, Masaaki',
                    bio:'Co-founded Science SARU',
                    birthYear:'1965',
                    deathYear: '',
                },
            imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5FoZxavLyV9NpxWm1XGPwVEQ0qAon_B6KIv55nJb3BAjfAX-V',
            date: '2020',
            featured: false
        }
    ];

    // CREATE request - new user
    app.post('/users', (req,res) => {
        const newUser = req.body;
        
        if (newUser.name) {
            newUser.id = uuid.v4();
            users.push(newUser);
            res.status(201).json(newUser)
        } else {
            res.status(400).send('user needs names')
        }
    });

    // UPDATE (PUT) request - existing user update
    app.put('/users/:id', (req,res) => {
        const { id } = req.params;
        const updatedUser = req.body;
        
        let user = users.find( user => user.id == id );
        
        if (user) {
            user.name = updatedUser.name;
            res.status(200).json(user);
        } else {
            res.status(400).send('no such user')
        }
    });    

    // CREATE (POST) request - adding movie to favorites
    app.post('/users/:id/:movietitle', (req,res) => {
        const { id, movietitle } = req.params;
        
        let user = users.find( user => user.id == id );
        
        if (user) {
            user.favoriteMovies.push(movietitle);
            res.status(200).send(`${movietitle} has been added to user ${id}'s array`);
        } else {
            res.status(400).send('no such user')
        }
    });  

    // DELETE (DELETE) request - delete movie to favorites
    app.delete('/users/:id/:movietitle', (req,res) => {
        const { id, movietitle } = req.params;
        
        let user = users.find( user => user.id == id );
        
        if (user) {
            user.favoriteMovies = user.favoriteMovies.filter(title => title !== movietitle);
            res.status(200).send(`${movietitle} has been removed from user ${id}'s array`);
        } else {
            res.status(400).send('no such user')
        }
    });  

    // DELETE (DELETE) request - delete existing user
    app.delete('/users/:id', (req,res) => {
        const { id } = req.params;
        
        let user = users.find( user => user.id == id );
        
        if (user) {
            users = users.filter(user => user.id != id);
            res.status(200).send(`user ${id} has been deleted`);
        } else {
            res.status(400).send('no such user')
        }
    });  
    
    // READ request
    app.get('/movies', (req,res) => {
        res.status(200).json(movies)
    });
        // READ request - title
        app.get('/movies/:title', (req,res) => {
            const { title } = req.params;
            const movie = movies.find( movie => movie.title === title);

            if (movie){
                res.status(200).json(movie);
            } else {
                res.status(400).send('no such movie')
            }
        });
        // READ request - genre
        app.get('/movies/genre/:genrename', (req,res) => {
            const { genrename } = req.params;
            const genre = movies.find( movie => movie.genre.name === genrename).genre;

            if (genre){
                res.status(200).json(genre);
            } else {
                res.status(400).send('no such genre')
            }
        });

        // READ request - director
        app.get('/movies/director/:directorName', (req,res) => {
            const { directorName } = req.params;
            const director = movies.find( movie => movie.director.name === directorName).director;

            if (director){
                res.status(200).json(director);
            } else {
                res.status(400).send('no such director')
            }
        });

    // GET request
    app.get('/', (req, res) => {
        res.send ('Welcome to my movie page!');
    });

    app.get('/movies', (req,res) => {
        res.json(movies);
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