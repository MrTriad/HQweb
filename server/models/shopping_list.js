"use strict"

const mongoose = require('mongoose')

const ShoppingList = new mongoose.Schema({
	total: { type: Number },
	payer: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'},
	date_closure: { type: Date },
	items: [
		{ 
			name: {type: String},
			user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'}
		}
	]
	},
	{ collection: 'shopping_list' }
)


const model = mongoose.model('ShoppingList', ShoppingList)

module.exports = model