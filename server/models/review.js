"use strict"

const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
	user: { type: String, required: true },
	host: {type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema', required: true},
	content: { type: String, required: true },
    rate: { type: Number, min: 1, max: 5, required:true},
    posted_at: { type: Date, default: Date.now()}
	},
	{ collection: 'reviews' }
)

const model = mongoose.model('Review', ReviewSchema)

module.exports = model