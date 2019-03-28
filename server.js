const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex')
const bcrypt = require('bcrypt-nodejs')


const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '123456',
    database : 'smart-brain'
  }
});

const app = express()
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {
	res.json(db.users);
})

app.post('/signin', (req, res)=> {signin.signHandler(req, res, bcrypt, db)})

app.get('/profile/:id', (req, res)=> {profile.profHandler(req, res, db)})

app.post('/register', (req, res)=> {register.regHandler(req, res, bcrypt, db)})

app.put('/image', (req, res)=> {image.imgHandler(req, res, db)})

app.post('/Api', (req, res)=> {image.ApiCall(req, res)})



app.listen(3000, ()=> {
	console.log('Hello, im listening to you!')
})

