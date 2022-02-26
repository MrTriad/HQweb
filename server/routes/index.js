"use strict"
const express = require('express');
const router = express.Router();



router.get("/", (req, res) => {
	res.render("index", {session: req.user});
});

router.get("/houseworks", (req, res) => {
	if (req.isAuthenticated()) {
		res.render("houseworks/index", {session: req.user});
	}else{
		res.redirect('login')
	}
});

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
		res.redirect('login')
	}
});

router.get("/reviews", (req, res) => {
	if (req.isAuthenticated()) {
		res.render("reviews/index", {session: req.user});
	}else{
		res.render("reviews/index");
	}
});

router.get("/profile", (req, res) => {
	if (req.isAuthenticated()) {
		res.render("profile/index", {session: req.user});
	}else{
		res.redirect('login')
	}
});

module.exports = router;
