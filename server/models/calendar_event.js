"use strict"

const mongoose = require('mongoose')

const CalendarEventSchema = new mongoose.Schema({
	author: { type: String, required: true },		//andrebbe cambiato con una relazione ma sono stanco
	guests_number: { type: Number, required: true },
	date_start: { type: Date, required: true },
	date_end: { type: Date, required: true }
	},
	{ collection: 'calendar_events' }
)

const model = mongoose.model('CalendarEventSchema', CalendarEventSchema)

module.exports = model