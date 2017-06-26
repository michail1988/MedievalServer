var db = require('../db');

exports.getAll = function(done) {
	db.get().query('SELECT id, name, surname, date, email FROM MED_ENROLMENTS',
			function(err, rows) {
				if (err)
					return done(err)
				done(null, rows)
				console.log('Erolments selected')
			})
}