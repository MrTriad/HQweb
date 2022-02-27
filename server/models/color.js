"use strict"

const mongoose = require('mongoose')

const Color = new mongoose.Schema({
	name: { type: String, required: true },	//metodo un po'raw. Ma funzionale per la demo
	hex: { type: String, required: true },
	_user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'}
	},
	{ collection: 'color' }
)



const model = mongoose.model('Color', Color)

module.exports = model