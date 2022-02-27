"use strict"
const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')

const User = require('../../models/user')

///////////////////////////////////////////////////////////////////////////
///// API /////////////////////////////////////////////////////////////////

router.post("/api/login", passport.authenticate("local", {
	successRedirect: '/',
	failureRedirect: '/auth/login',
	failureFlash: true
}));

router.get('/api/logout', function (req, res) {
	if (req.isAuthenticated()) {

		req.logout();
		res.redirect('/');
	} else {
		res.redirect('/auth/login')
	}
});

router.post("/api/register", async (req, res) => {
	if (req.isAuthenticated()) {
		const {
			username,
			password: plainPassword
		} = req.body
		const password = await bcrypt.hash(plainPassword, 10)

		try {
			const response = await User.create({
				username,
				password
			})
		} catch (error) {
			if (error.code == 11000) {
				req.flash('error', 'Username already in use');
				res.redirect('/auth/register')
			} else {
				req.flash('error', 'System error, contact an admin');
				res.redirect('/auth/register')
			}
		}

		res.redirect('/profile')
	} else {
		res.redirect('/auth/login')
	}
});

///////////////////////////////////////////////////////////////////////////
///// Routes //////////////////////////////////////////////////////////////

router.get("/login", (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect("/");
	}else{
		res.render('login')
	}
});


router.get("/register", (req, res) => {   //MISSING
	if (req.isAuthenticated()) {
		res.render("register", {session: req.user});
	}else{
		res.redirect('/auth/login')
	}
});


module.exports = router