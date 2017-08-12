var db = require('../db');

exports.getAll = function(done) {
	db.get().query('SELECT id, title FROM MED_SCHEDULES', function(err, rows) {
		if (err)
			return done(err)
		done(null, rows)
	})
}

exports.getSchedule = function(id, done) {

	var values = [ id ]
	db.get().query('SELECT id, title FROM MED_SCHEDULES where id = ?', values,
			function(err, rows) {
				if (err)
					return done(err)
				done(null, rows)
			})
}

exports.createSchedule = function(title, done) {
	var values = [ title ]

	db.get().query('INSERT INTO MED_SCHEDULES (TITLE) VALUES(?)', values,
			function(err, result) {
				if (err)
					return done(err)
				done(null, result)

				console.log('Pomyslny insert do tabeli MED_SCHEDULES.')
			})
}

exports.updateSchedule = function(id, title, done) {
	var values = [ id, title ]

	db.get().query('UPDATE MED_SCHEDULES set TITLE =? where ID = ?', values,
			function(err, result) {
				if (err)
					return done(err)
				done(null, result)

				console.log('Pomyslny update do tabeli MED_SCHEDULES.')
			})
}

// todo constraint, usun wszystkie eventy
exports.deleteSchedule = function(id, done) {
	var values = [ id ]

	db.get().query('DELETE FROM MED_SCHEDULES where ID = ?', values,
			function(err, result) {
				if (err)
					return done(err)
				done(null, result)

				console.log('Usunieto z tabeli MED_SCHEDULES.')
			})
}