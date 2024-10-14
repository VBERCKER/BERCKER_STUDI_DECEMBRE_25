import { rateLimit } from 'express-rate-limit';

const registerLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 15 minutes
	limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: "Trop de requêtes, veuillez réessayer plus tard",
	//standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	//legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})
const logInLimiter = rateLimit({
	windowMs: 60 * 1000, // 15 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: "Trop de requêtes, veuillez réessayer plus tard",
	//standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	//legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

const generalLimiter = rateLimit({
	windowMs: 5000, 
	limit: 5, 
    message: "Trop de requêtes, veuillez réessayer plus tard",
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

export { registerLimiter, logInLimiter, generalLimiter };