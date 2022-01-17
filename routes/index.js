"use strict"
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
	res.render("index");
});

router.post("/houseworks", (req, res) => {
	res.render("./houseworks/index");
});

// router.post("/dashboard", (req, res) => {
// 	res.render("/dashboard");
// });

router.post("/reviews", (req, res) => {
	res.render("./reviews/index");
});

router.post("/shoppingList", (req, res) => {
	res.render("./shoppingList/index");
});

module.exports = router;
