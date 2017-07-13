var db = require('../db');

exports.getByName = function(name, done) {
	
	var values = [ '%' + name + '%' ]
	db.get().query(
			'SELECT name FROM MED_UNIVERSITIES where name COLLATE UTF8_GENERAL_CI like ?', values, 
			function(err, rows) {
				if (err)
					return done(err)
				done(null, rows)
				console.log('Universities selected')
			})
}

exports.getAll = function(done) {
	db.get().query('SELECT name FROM MED_UNIVERSITIES', function(err, rows) {
		if (err)
			return done(err)
		done(null, rows)
		console.log('Universities selected')
	})
}