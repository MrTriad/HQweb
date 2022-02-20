"use strict"
const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')

///////////////////////////////////////////////////////////////////////////
///// Database Connection /////////////////////////////////////////////////

const User = require('../models/user')

router.post("/login", async (req, res) => {
	const { username, password } = req.body

	

	const user = await User.findOne({ username }).lean()

	if(!user){
		return res.json({ status: 'error', error: 'Invalid username/password'})
	}

	if(bcrypt.compare(password, user.password)){

		return res.json({ status: 'ok' })

	}

	return res.json({ status: 'error', error: 'Invalid username/password'})

});

router.post("/register", async (req, res) => {

	const { username, password: plainPassword } = req.body

	if(!username || typeof(username) !== 'string'){
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if(!plainPassword || typeof(plainPassword) !== 'string'){
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	const password = await bcrypt.hash(plainPassword, 10)

	try {
		const response = await User.create({
			username,
			password
		})
		console.log('### User created successfully: ', response)
	} catch (error) {
		if(error.code == 11000){
			return res.json({ status: 'error', error: 'Username already in use' })
		}else{
			console.log(error)
			return res.json({ status: 'error'})
		}
		throw error
	}

	res.json({ status: 'oke' })
});

module.exports = router;
