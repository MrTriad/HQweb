"use strict"
const express = require('express')
const router = express.Router();

const User = require('../../models/calendar_event')

router.post("/addBooking", async (req, res) => {
	
	const { date_start, date_end, guests_number } = req.body
	const author = req.user.username	

	if(new Date(date_start).valueOf() < new Date().valueOf() || new Date(date_start).valueOf() < new Date(date_end).valueOf()){
		req.flash('error_messages', 'wtf');
		res.redirect('/addBooking')
	}else{
		res.json({ res: false})
	}
	/*
	res.locals.error_messages = req.flash('error_messages');
	
	try {
		const response = await User.create({
			author,
			guests_number,
			date_start,
			date_end
		})
		console.log('### Event created successfully: ', response)
	} catch (error) {
		if (error.code == 11000) {
			return res.json({ status: 'error', error: 'Username already in use' })
		} else {
			console.log(error)
			return res.json({ status: 'error' })
		}
	}

	res.json({stat: 'ok'})
	
	
	*/	
});


module.exports = router
