module.exports = (req, res, next) => {
	// console.log(req.session.user);
	if (req.session && req.session.user) {
		next();
	} else {
		next({ apiCode: 403, apiMessage: 'Not Authorized' });
		// next();
	}
};
