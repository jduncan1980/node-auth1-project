const router = require('express').Router();
const users = require('../users/usersModel');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res, next) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 10);
	user.password = hash;
	try {
		const savedUser = await users.addUser(user);
		res.status(201).json(savedUser);
	} catch (error) {
		next({ apiCode: 500, apiMessage: 'Error Registering', ...error });
	}
});

router.post('/login', async (req, res, next) => {
	const { username, password } = req.body;
	try {
		const [user] = await users.getByUsername({ username });
		console.log('user!!!', user);
		if (user && bcrypt.compareSync(password, user.password)) {
			req.session.user = user;
			console.log('session.user', req.session.user);
			res.status(200).json({ message: `Welcome, ${username}` });
		} else {
			next({ apiCode: 401, apiMessage: 'Invalid Credentials', ...error });
		}
	} catch (error) {
		next({ apiCode: 500, apiMessage: 'Error logging in', ...error });
	}
});

router.get('/logout', (req, res, next) => {
	if (req.session.user) {
		req.session.destroy((err) => {
			if (err) {
				next({ apiCode: 400, apiMessage: 'Error logging out', ...err });
			} else {
				res.send('Logging out');
			}
		});
	} else {
		res.send('Already logged out');
	}
});

module.exports = router;
