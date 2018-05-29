const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { check, validationResult } = require('express-validator/check');

const User = require('../models/user');
const userUtil = require('../utils/user');

router.get('/', (req, res) => {

});

// POST /user - register new user
router.post('/', [
	check('username').isLength({ min: 5 }),
	check('password').isLength({ min: 5 }),
	check('answers').isLength({ min: 2 })
],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ error: 'Invalid data', data: null });
		}

		// hash password
		bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
			if (err) {
				console.error('Hash password failed: ', err);
				return res.status(500).json({ error: 'Internal server error', data: null });
			}

			// get scores
			const score = userUtil.getScore(req.body.answers);
			if (score === false) {
				console.error('getScore() failed');
				return res.status(400).json({ error: 'Invalid data', data: null });
			}
			const rank = userUtil.getRank(score);
			if (rank === false) {
				console.error('getRank() failed');
				return res.status(400).json({ error: 'Invalid data', data: null });
			}

			const userData = {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				address: req.body.address,
				username: req.body.username,
				password: hash,
				rank: rank
			};
			const user = new User(userData);
			user.save((err, doc) => {
				if (err) {
					console.error('Create new user failed: ', err);
					return res.status(500).json({ error: 'Internal server error', data: null });
				}

				return res.status(201).json({ error: null, data: doc });
			});
		});
	});

module.exports = router;
