"use strict"

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	_color: { type: mongoose.Schema.Types.ObjectId, ref: 'ColorSchema'}
	},
	{ collection: 'users' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model