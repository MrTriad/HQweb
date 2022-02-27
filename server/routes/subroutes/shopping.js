"use strict"
const express = require('express')
const router = express.Router();

const ShoppingList = require('../../models/shopping_list')


///////////////////////////////////////////////////////////////////////////
///// API /////////////////////////////////////////////////////////////////



router.post("/api/addItem", async (req, res) => {
	if (req.isAuthenticated()) {
		const {
			item_name
		} = req.body
		const item_user = req.user._id
		if (typeof (item_name) === 'undefined') {
			req.flash('error', 'Please enter a valid item name');
			res.redirect('/shopping')
		} else {

			try {
				await ShoppingList.findOneAndUpdate({
					date_closure: null
				}, {
					$push: {
						items: {
							name: item_name,
							user: item_user
						}
					}
				}, {
					upsert: true,
					new: true,
					setDefaultsOnInsert: true
				})

			} catch (error) {
				req.flash('error', 'System error, contact an admin');
				res.redirect('/shopping')
			}

			req.flash('success', 'Item addded correctly');
			res.redirect('/shopping')
		}
	} else {
		res.redirect('/login')
	}

});

router.post("/api/terminateList", async (req, res) => {
	if (req.isAuthenticated()) {
		const {
			list_cost
		} = req.body
		const list_user = req.user._id

		if (typeof (list_cost) === 'undefined' || list_cost === '') {
			req.flash('error', 'Please enter a valid item name');
			res.redirect('/shopping')
		} else {
			try {
				await ShoppingList.findOneAndUpdate({
					date_closure: null
				}, {
					total: list_cost,
					payer: list_user,
					date_closure: new Date()
				})
			} catch (error) {
				req.flash('error', 'System error, contact an admin');
				res.redirect('/shopping')
			}

			req.flash('success', 'List closed with success');
			res.redirect('/shopping')
		}
	} else {
		res.redirect('/login')
	}

});

///////////////////////////////////////////////////////////////////////////
///// Routes //////////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
	if (req.isAuthenticated()) {
		const shopping_list = await ShoppingList.find({}).sort({
			date_closure: -1
		})
		res.render("shopping/index", {
			session: req.user,
			shopping_lists: shopping_list
		});
	} else {
		res.redirect('/login')
	}
});

router.get("/showList", (req, res) => {
	if (req.isAuthenticated()) {
		res.render("shopping/showList", {
			session: req.user
		});
	} else {
		res.redirect('/login')
	}
});

router.post('/showList', async (req, res) => {
	if (req.isAuthenticated()) {
		const {
			_id
		} = req.body
		if (typeof (_id) === 'undefined') {
			res.redirect('/shopping')
		}
		const shopping_list = await ShoppingList.findOne({
			_id: _id
		})

		res.render("shopping/showList", {
			session: req.user,
			shopping_list: shopping_list
		});
	} else {
		res.redirect('/login')
	}

});

module.exports = router