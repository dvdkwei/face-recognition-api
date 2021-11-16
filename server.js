const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const register = require('./Controller/register.js');
const signIn = require('./Controller/signin');
const profile = require('./Controller/profile');
const image = require('./Controller/image');

const db = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_URL,
        ssl: true
    }
}); //for postgres database using knex

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors({
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('it is working!');
});

app.get('/profile/:id', (req, res) => {
    profile.profileHandler(req, res, db);
});

app.post('/signin', (req, res) => {
    signIn.handleSignIn(bcrypt, db, req, res);
});

app.post('/register', ((req, res) => {
    register.handleRegister(req, res, bcrypt, db);
}));

app.put('/image/:id', (req, res) => {
    image.imageHandler(req, res, db);
});

app.post('/image/api', (req, res) => {
    image.imageApiHandler(req, res);
})

app.listen((process.env.PORT || 8080), () => console.log('starting on port ' + process.env.PORT));