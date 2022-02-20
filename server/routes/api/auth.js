"use strict"
const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')
const flash = require('express-flash')





///////////////////////////////////////////////////////////////////////////
///// Database Connection /////////////////////////////////////////////////

const User = require('../../models/user')

router.post("/login", passport.authenticate("local", {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
}));


/*
router.post("/login", (req, res, next) => {
	passport.authenticate("local", function (err, user, info) {
		if (err) {
			return res.status(400).json({ errors: err });
		}
		if (!user) {
			return res.status(400).json({ errors: "Wrong username or password" });
		}
		req.logIn(user, function (err) {
			if (err) {
				return res.status(400).json({ errors: err });
			}
			return res.status(200).json({ success: `logged in ${user.id}` });
		});
	})(req, res, next);
});
*/
router.post("/register", async (req, res) => {

	const { username, password: plainPassword } = req.body
	const password = await bcrypt.hash(plainPassword, 10)

	try {
		const response = await User.create({
			username,
			password
		})
		console.log('### User created successfully: ', response)
	} catch (error) {
		if (error.code == 11000) {
			return res.json({ status: 'error', error: 'Username already in use' })
		} else {
			console.log(error)
			return res.json({ status: 'error' })
		}
		throw error
	}

	res.json({ status: 'oke' })
});

module.exports = router
