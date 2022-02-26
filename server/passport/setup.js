'use strict'

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user)
	})
})

passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
	User.findOne({ username })
		.then(user => {
			
			if (!user) {
				return done(null, false, { message: 'Wrong username or password' })
			}

			bcrypt.compare(password, user.password)
				.then(check => {
					return check ? done(null, user, { message: 'Success'}) : done(null, false, { message: 'Wrong username or password' })
				})
		})
}))

module.exports = passport