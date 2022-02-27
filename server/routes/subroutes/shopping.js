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
		res.redirect('/auth/login')
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
		res.redirect('/auth/login')
	}

});

///////////////////////////////////////////////////////////////////////////
///// Routes //////////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
	if (req.isAuthenticated()) {
		const shopping_lists_old = await ShoppingList.find({
			"date_closure": {
				$ne: null
			}
		}).sort({
			date_closure: -1
		})
		const shopping_list_new = await ShoppingList.findOne({
			"date_closure": null
		}).populate({
			path: 'items',
			populate: {
				path: 'user',
				model: 'UserSchema',
				populate: {
					path: '_color',
					model: 'ColorSchema'
				}
			}
		})

		res.render("shopping/index", {
			session: req.user,
			shopping_lists_old: shopping_lists_old,
			shopping_list_new: shopping_list_new
		});
	} else {
		res.redirect('/auth/login')
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
		}).populate({
			path: 'items',
			populate: {
				path: 'user',
				model: 'UserSchema',
				populate: {
					path: '_color',
					model: 'ColorSchema'
				}
			}
		})
		if(shopping_list){
			res.render("shopping/showList", {
				session: req.user,
				shopping_list: shopping_list
			});
		}else{
			res.redirect('/shopping')
		}
	} else {
		res.redirect('/auth/login')
	}

});

module.exports = router