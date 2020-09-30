const db = require('../../database/dbConfig');

const getUsers = () => {
	return db('users').select('id', 'username').orderBy('id');
};

const getUserById = (id) => {
	return db('users').where({ id }).first();
};

const addUser = async (user) => {
	try {
		const [id] = await db('users').insert(user);
		return getUserById(id);
	} catch (error) {
		throw Error;
	}
};

const getByUsername = (username) => {
	return db('users').where(username);
};
module.exports = {
	getUsers,
	getUserById,
	getByUsername,
	addUser,
};
