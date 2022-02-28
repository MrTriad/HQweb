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
		res.redirect('/auth/login')
	}
});

router.get("/profile", (req, res) => {
	if (req.isAuthenticated()) {
		res.render("profile/index", {session: req.user});
	}else{
		res.redirect('/auth/login')
	}
});

router.get("/debug", async (req,res) => {
	res.json({ out: 'it worky'})
})

module.exports = router;
