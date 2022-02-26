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




router.get("/shoppingList", (req, res) => {
	if (req.isAuthenticated()) {
		res.render("shoppingList/index", {session: req.user});
	}else{
		res.redirect('login')
	}
});

router.get("/showList", (req, res) => {
	if (req.isAuthenticated()) {
		res.render("shoppingList/showList", {session: req.user});
	}else{
		res.redirect('login')
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
