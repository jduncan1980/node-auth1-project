const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const errorHandler = require('./middleware/errorHandler');
const restrictedRoute = require('./middleware/restrictedRoute');

const usersRouter = require('./users/userRoutes');
const authRouter = require('./auth/authRoutes');

const sessionConfig = {
	name: 'jmdCookie',
	secret: process.env.SESSION_SECRET,
	cookie: {
		maxAge: 60 * 60 * 1000, //One Hour
		secure: false,
		httpOnly: true,
	},
	resave: false,
	saveUninitialized: false,
	store: new knexSessionStore({
		knex: require('../database/dbConfig'),
		tablename: 'sessions',
		sidfieldname: 'sid',
		createtable: true,
		clearInterval: 60 * 60 * 1000, //One Hour
	}),
};

const server = express();

server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());
server.use(cors());

//Routes
server.use('/api/users', restrictedRoute, usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
	res.json({ api: 'up' });
});

server.use(errorHandler);

module.exports = server;
