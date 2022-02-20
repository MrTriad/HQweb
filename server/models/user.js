"use strict"

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true }
	},
	{ collection: 'users' }
)

const model = mongoose.model('UserSChema', UserSchema)

module.exports = model