"use strict"
const express = require('express')
const router = express.Router();

const User = require('../../models/calendar_event')

///////////////////////////////////////////////////////////////////////////
///// API /////////////////////////////////////////////////////////////////

router.post("/addBooking", async (req, res) => {
	
	const { date_start, date_end, guests_number } = req.body
	const author = req.user.username	
	
	if(new Date(date_start).valueOf() < new Date().valueOf() - 86400000 || new Date(date_start).valueOf() > new Date(date_end).valueOf()){
		req.flash('error', 'Please enter a valid date');
		res.redirect('/addBooking')
	}else{
		try {
			const response = await User.create({
				author,
				guests_number,
				date_start,
				date_end
			})
			req.flash('success', 'Event created with success!');
			console.log('CREATED')
			res.redirect('/addBooking')
		} catch (error) {
			req.flash('error', 'System error, contact an admin');
			res.redirect('/addBooking')
		}
	}
	
});

///////////////////////////////////////////////////////////////////////////
///// Routes //////////////////////////////////////////////////////////////

router.get("/booking", (req, res) => {
	if (req.isAuthenticated()) {
		
		res.render("booking/index", {session: req.user});
	}else{
		res.render('/login')
	}
});

router.get("/addBooking", (req, res) => {
	if (req.isAuthenticated()) {
		res.render("booking/addBooking", {session: req.user});
	}else{
		res.redirect('login')
	}
});


module.exports = router
