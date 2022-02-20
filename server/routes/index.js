"use strict"
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
	res.render("index");
});

router.get("/houseworks", (req, res) => {
	res.render("houseworks/index");
});

router.get("/login", (req, res) => {
	res.render("login");
});

router.get("/register", (req, res) => {
	res.render("register");
});

router.get("/dashboard", (req, res) => {
	res.render("dashboard");
});

router.get("/booking", (req, res) => {
	res.render("booking/index");
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
