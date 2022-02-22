"use strict"
const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')

const User = require('../../models/user')

router.post("/login", passport.authenticate("local", {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
}));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


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
