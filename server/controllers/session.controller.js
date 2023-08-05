import Session from '../models/Session.js';

//middleware for sessions
const session = async (req, res, next) => {
	// get session id from header
	const sessionId = req.headers.session;
	
	if (!sessionId) {
		return next();
	}
	const session = await Session.findById(sessionId);
	if (!session) {
		return next();
	}
	if (session.isExpired()) {
		await session.deleteOne();
		return next();
	}
	req.session = session;
	next();
};

export default session;