"use strict"
const express = require('express')
const router = express.Router();

const CalendarEvent = require('../../models/calendar_event')

///////////////////////////////////////////////////////////////////////////
///// API /////////////////////////////////////////////////////////////////

router.post("/api/addBooking", async (req, res) => {
	
	const { date_start, date_end, guests_number } = req.body
	const author = req.user.username	
	
	if(new Date(date_start).valueOf() < new Date().valueOf() - 86400000 || new Date(date_start).valueOf() > new Date(date_end).valueOf()){
		req.flash('error', 'Please enter a valid date');
		res.redirect('/booking/addBooking')
	}else{
		try {
			const response = await CalendarEvent.create({
				author,
				guests_number,
				date_start,
				date_end
			})
			req.flash('success', 'Event created with success!');
			res.redirect('/booking/addBooking')
		} catch (error) {
			req.flash('error', 'System error, contact an admin');
			res.redirect('/booking/addBooking')
		}
	}
	
});

///////////////////////////////////////////////////////////////////////////
///// Routes //////////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
	if (req.isAuthenticated()) {
		const calendar_events = await CalendarEvent.find().sort({ date_start: 1 })
		res.render("booking/index", {
			session: req.user,
			calendar_events: calendar_events
		});
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
