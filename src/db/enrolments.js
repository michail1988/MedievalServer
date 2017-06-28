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

exports.createEnrolment = function(name, surname, date, email, done) {
	  var values = [name, surname, new Date(), email]
	  
	  console.log('Create enrolments: ' + values)
	  db.get().query('INSERT INTO MED_ENROLMENTS (NAME, SURNAME, DATE, EMAIL) VALUES(?, ?, ?, ?)', values, function(err, result) {
		  if (err) return done(err)
		    done(null, result)
		    
	   
	  })
	}