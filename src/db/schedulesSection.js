var db = require('../db');

exports.getAll = function(done) {
	db.get().query('SELECT id, title, status FROM MED_SCHEDULES_SECTION', function(err, rows) {
		if (err)
			return done(err)
		done(null, rows)
	})
}

exports.getSchedule = function(id, done) {

	var values = [ id ]
	db.get().query('SELECT id, title, status FROM MED_SCHEDULES_SECTION where id = ?', values,
			function(err, rows) {
				if (err)
					return done(err)
				done(null, rows)
			})
}

exports.createSchedule = function(title, status, done) {
	var values = [ title, status ]

	db.get().query('INSERT INTO MED_SCHEDULES_SECTION (TITLE, STATUS) VALUES(?,?)', values,
			function(err, result) {
				if (err)
					return done(err)
				done(null, result)

				console.log('Pomyslny insert do tabeli MED_SCHEDULES_SECTION.')
			})
}

exports.updateSchedule = function(id, title, status, done) {
	var values = [ title, status, id ]

	db.get().query('UPDATE MED_SCHEDULES_SECTION set TITLE =?, STATUS=? where ID = ?', values,
			function(err, result) {
				if (err)
					return done(err)
				done(null, result)

				console.log('Pomyslny update do tabeli MED_SCHEDULES_SECTION.')
			})
}

// todo constraint, usun wszystkie eventy
exports.deleteSchedule = function(id, done) {
	var values = [ id ]

	db.get().query('DELETE FROM MED_SCHEDULES_SECTION where ID = ?', values,
			function(err, result) {
				if (err)
					return done(err)
				done(null, result)

				console.log('Usunieto z tabeli MED_SCHEDULES_SECTION.')
			})
}