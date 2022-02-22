"use strict"
const express = require('express')
const router = express.Router();

const CalendarEvent = require('../../models/calendar_event')
const ShoppingList = require('../../models/shopping_list')


///////////////////////////////////////////////////////////////////////////
///// API /////////////////////////////////////////////////////////////////

router.post("/api/addItem", async (req, res) => {
	
	res.json({ stat: 'it worky'})

	const { item } = req.body
	const author = req.user.username	
	
	if(new Date(date_start).valueOf() < new Date().valueOf() - 86400000 || new Date(date_start).valueOf() > new Date(date_end).valueOf()){
		req.flash('error', 'Please enter a valid date');
		res.redirect('/addBooking')
	}else{
		try {
			const response = await CalendarEvent.create({
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

router.get("/", (req, res) => {
	if (req.isAuthenticated()) {
		res.render("shopping/index", {session: req.user});
	}else{
		res.redirect('login')
	}
});

router.get("/showList", (req, res) => {
	if (req.isAuthenticated()) {
		res.render("shopping/showList", {session: req.user});
	}else{
		res.redirect('login')
	}
});

module.exports = router
