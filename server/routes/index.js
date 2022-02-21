"use strict"
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
	//
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

<<<<<<< HEAD

router.get("/register", (req, res) => {   //MISSING
	res.render("login");
=======
router.get("/register", (req, res) => {
	res.render("register");
>>>>>>> d5d4b86d9cac551712a9122ee1d91739a8de6297
});

router.get("/dashboard", (req, res) => {  //DELETE?
	res.render("dashboard");
});

router.get("/booking", (req, res) => {
	if (req.isAuthenticated()) {
		res.render("booking/index", {session: req.user});
	}else{
		res.render('/login')
	}
	
});

router.get("/addBooking", (req, res) => {
	res.render("booking/addBooking");
});

router.get("/reviews", (req, res) => {
	res.render("reviews/index");
});

router.get("/shoppingList", (req, res) => {
	res.render("shoppingList/index");
});

router.get("/showList", (req, res) => {
	res.render("shoppingList/showList");
});

router.get("/profile", (req, res) => {
	res.render("profile/index");
});

router.get("/debug", (req, res) => {
	res.render("navbar");
});

module.exports = router;
