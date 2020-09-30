const router = require('express').Router();
const users = require('./usersModel');

router.get('/', async (req, res, next) => {
	try {
		const usersList = await users.getUsers();
		res.status(200).json(usersList);
	} catch (error) {
		next({
			apiCode: 500,
			apiMessage: 'Something went wrong with the server...',
		});
	}
});

module.exports = router;
