"use strict"
const express = require('express')
const router = express.Router();

const ShoppingList = require('../../models/shopping_list')


///////////////////////////////////////////////////////////////////////////
///// API /////////////////////////////////////////////////////////////////

router.post("/api/addItem", async (req, res) => {

	const { item_name } = req.body
	const item_user = req.user._id

	
	try {
		await ShoppingList.findOneAndUpdate({ total: null }, {$push: { items: { name: item_name, user: item_user} }}, { upsert: true, new: true, setDefaultsOnInsert: true })

	} catch (error) {
		req.flash('error', 'System error, contact an admin');
		res.redirect('/shopping')
	}

	req.flash('success', 'Item addded correctly');
	res.redirect('/shopping')

});

///////////////////////////////////////////////////////////////////////////
///// Routes //////////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
	if (req.isAuthenticated()) {
		const shopping_list = await ShoppingList.find({}).sort({ date_closure: -1 })
		
		res.render("shopping/index", {
			session: req.user,
			shopping_lists: shopping_list
		});
		
		
		
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
