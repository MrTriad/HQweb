"use strict"
const express = require('express');
const router = express.Router();



router.get("/", (req, res) => {
	res.render("index", {session: req.user});
});

router.get("/houseworks", (req, res) => {
	res.render("houseworks/index", {session: req.user});
});

router.get("/profile", (req, res) => {

	res.render("profile/index", {session: req.user});
});

const Color = require('../models/color')

router.get("/debug", async (req,res) => {
	res.json({ out: 'it worky'})
})

module.exports = router;
