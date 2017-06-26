var db = require('../db');

exports.getAll = function(done) {
	db.get().query('SELECT NAME, SURNAME, DATE, EMAIL FROM MED_ENROLMENTS',
			function(err, rows) {
				if (err)
					return done(err)
				done(null, rows)
				console.log('Erolments selected')
			})
}