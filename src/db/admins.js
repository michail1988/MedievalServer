var db = require('../db');


//TODO Michal szyfrowanie hasla

exports.login = function(username, password, done) {
	var values = [username, password]
	
	db.get().query('SELECT username FROM MED_ADMINS where username = ? and password = ?', values, 
			function(err, rows) {
				if (err)
					//TODO if error
					return done(err)
				done(null, rows)
			})
}