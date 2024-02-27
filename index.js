const express = require('express'),
morgan = require('morgan');

const app = express();

// Log all requests; top movies
    let topMovies = [
        {
            title: 'Spirited Away',
            description: 'Vivid and intriguing, Spirited Away tells the story of Chihiro\'s journey through an unfamiliar world as she strives to save her parents and return home.',
            genre: {
                    name: ['Animation', 'Supernatural'],
                    description:'The supernatural genre encompasses storytelling that involves elements beyond the natural world, often featuring supernatural phenomena, mystical forces, paranormal activities, or entities that defy the laws of nature.'
                    },
            director: {
                    directorName: 'Miyazaki, Hayao',
                    bio: 'Founder of Studio Ghibli',
                    birth: '1941'
                },
            imageURL: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTqTEoJUOlTg4HakvM3SHU0a7a3gFpAQ1HrBL21fBAr1OYOeocP",
            date: '2001',
            featured: false
        },
        {
            title: 'Your Name',
            description: 'Your Name revolves around Mitsuha and Taki\'s actions, which begin to have a dramatic impact on each other\'s lives, weaving them into a fabric held together by fate and circumstance.',
            genre: {
                    name: ['Animation', 'Drama', 'Supernatural'],
                    description: 'The drama genre typically explores realistic and emotionally charged narratives, focusing on the complexities of human relationships, personal growth, and the everyday struggles and triumphs of characters in various life situations.'
                },
            director: {
                    directorName: 'Shinkai, Makoto',
                    bio: 'Regarded as "The New Miyazki"',
                    birth: '1973'
                },
            imageURL: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSdCn7P_niNCbNFHt9vLgDc-YlRIhwvnCPtHzyiHVP_GK-XmDS1",
            date: '2016',
            featured: false
        },
        {
            title: 'Weathering with You',
            description: 'Enchanting yet bittersweet love story between a teenage boy who can control the weather and a girl with a mysterious ability, set against the backdrop of a Tokyo plagued by incessant rain.',
            genre: {
                    name: ['Animation','Romance', 'Drama', 'Fantasy'],
                    description: 'Romance is a genre characterized by narratives that center around love and emotional relationships, often highlighting the development of romantic connections, challenges, and the pursuit of intimacy between characters.'
                },
            director: {
                    directorName: 'Shinkai, Makoto',
                    bio: 'Regarded as "The New Miyazki"',
                    birth: '1973'
                },
            imageURL: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQfiDnbbGZmmZfAnbjsU_AKKAsRfa4VmskkCWbhrmrYqnVtZWq2",
            date: '2019',
            featured: false
        },
        {
            title: 'My Neighbor Totoro',
            description: 'The magical adventures of two young sisters who befriend forest spirits, particularly the lovable creature Totoro, while navigating the challenges of moving to a new countryside home.',
            genre: {
                name: ['Animation', 'Supernatural'],
                description:'The supernatural genre encompasses storytelling that involves elements beyond the natural world, often featuring supernatural phenomena, mystical forces, paranormal activities, or entities that defy the laws of nature.'
                },
            director: {
                    directorName: 'Miyazaki, Hayao',
                    bio: 'Founder of Studio Ghibli',
                    birth: '1941'
                },
            imageURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcShhQmWrd7gqouln_mhRDdoLy8MkIOwZj1cNx7xhUU2I4cB0IEJ',
            date: '1988',
            featured: false
        },
        {
            title: 'Nausicaä of the Valley of the Wind',
            description: 'The courageous Princess Nausicaä strives to bring harmony between humanity and the environment in a post-apocalyptic world threatened by toxic jungles and warring nations.',
            genre:{ 
                    name: ['Animation', 'Adventure', 'Fantasy'],
                    description: 'The adventure genre encompasses narratives that revolve around characters undertaking perilous journeys, quests, or explorations, often featuring excitement, challenges, and a sense of discovery in unfamiliar and thrilling environments.'
                },
            director: {
                    directorName: 'Miyazaki, Hayao',
                    bio: 'Founder of Studio Ghibli',
                    birth: '1941'
                },
            imageURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRGi4HGfC4oJM34jPoaTDWLvMOlNxiXk0DZSyO57mQtZb2FirdB',
            date: '1984',
            featured: false
        },
        {
            title: 'Redline',
            description: 'High-octane Japanese animated film, featuring intense, intergalactic racing competition as daredevil racer JP strives to win the ultimate Redline race on a dangerous and visually stunning alien planet.',
            genre:{ 
                    name: ['Animation', 'Sci-Fi', 'Action'],
                    description: 'Science fiction, or sci-fi, is a genre that explores speculative and futuristic concepts, often incorporating advanced technology, space exploration, and scientific principles to envision alternative realities, possible futures, and the impact of scientific advancements on society.'
                },
            director: {
                    directorName: 'Koike, Takeshi',
                    bio: 'Protegee of Yoshiaki Kawajiri',
                    birth: '1968'
                },
            imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-r0UhA_dp_pNbQQY1l1GytMTOEAS6qD-413w9f-2ME5tg6GEF',
            date: '2009',
            featured: false
        },
        {
            title: 'Princess Mononoke',
            description: 'Chronicling the journey of a young warrior named Ashitaka, who becomes entangled in a conflict between industrial humans and nature spirits, led by the fierce and enigmatic Princess Mononoke, in a beautifully crafted tale of environmentalism and the struggle for balance.',
            genre:{
                    name: ['Animation', 'Fantasy', 'Action', 'Adventure'],
                    description: 'Fantasy is a genre characterized by imaginative and often magical elements, where stories unfold in fantastical worlds with mythical creatures, magical powers, and extraordinary settings that go beyond the bounds of reality.'
                },
            director: {
                    directorName: 'Miyazaki, Hayao',
                    bio: 'Founder of Studio Ghibli',
                    birth: '1941'
                },
            imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQntZTJb1c6O4iFaT_Ll3w4a-R3TzlpID2dJ0wDdwjemnMbOx7r',
            date: '1997',
            featured: false
        },
        {
            title: 'Kiki\'s Delivery Service',
            description: 'Following the coming-of-age journey of a young witch named Kiki as she establishes her own delivery service in a quaint seaside town, discovering friendship and self-confidence along the way.',
            genre: {
                    name: ['Animation', 'Adventure', 'Comedy', 'Drama', 'Fantasy'],
                    description: 'The adventure genre encompasses narratives that revolve around characters undertaking perilous journeys, quests, or explorations, often featuring excitement, challenges, and a sense of discovery in unfamiliar and thrilling environments.'
                },
            director: {
                    directorName: 'Miyazaki, Hayao',
                    bio: 'Founder of Studio Ghibli',
                    birth: '1941'
                },
            imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHAXQmo6UAT_P8xIAppBglmEruxxExDBGELnwXCqjDjZToWwXr',
            date: '1989',
            featured: false
        },
        {
            title: 'A Silent Voice',
            description: 'Delving into themes of redemption and empathy as it tells the story of a former bully seeking redemption and connection with a deaf classmate he once tormented in elementary school.',
            genre: {
                name: ['Animation', 'Drama'],
                description: 'The drama genre typically explores realistic and emotionally charged narratives, focusing on the complexities of human relationships, personal growth, and the everyday struggles and triumphs of characters in various life situations.'
            },
            director: {
                    directorName: 'Yamada, Naoko',
                    bio: 'Directed the K-On! and Tamako Market anime series',
                    birth: '1984'
                },
            imageURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQJrlYXvqlm1bAFMMfjhlX970K4B0z2AJv66KKb1Y9gW-4eml2X',
            date: '2016',
            featured: false
        },
        {
            title: 'Ride Your Wave',
            description: 'Blending romance and fantasy as it follows a young woman who discovers the transformative power of love and resilience after her surfer boyfriend\'s tragic death.',
            genre: {
                    name: ['Animation', 'Drama', 'Romance', 'Supernatural'],
                    description: 'The drama genre typically explores realistic and emotionally charged narratives, focusing on the complexities of human relationships, personal growth, and the everyday struggles and triumphs of characters in various life situations.'
                },
            director: {
                    directorName: 'Yuasa, Masaaki',
                    bio:'Co-founded Science SARU',
                    birth:'1965'
                },
            imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5FoZxavLyV9NpxWm1XGPwVEQ0qAon_B6KIv55nJb3BAjfAX-V',
            date: '2020',
            featured: false
        }
    ];

    // READ request
    app.get('/movies', (req,res) => {
        res.status(200).json(movies)
    });
        // READ request - title
        app.get('/movies/:title', (req,res) => {
            const { title } = req.params;
            const movie = movies.find( movie => movie.Title === title);

            if (movie){
                res.status(200).json(movie);
            } else {
                res.status(400).send('no such movie')
            }
        });

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