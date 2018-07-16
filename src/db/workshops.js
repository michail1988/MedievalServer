var db = require('../db');

exports.getAll = function(done) {
	db
			.get()
			.query(
					'select id, title, author, content, contact, place, date, status, fk_editor from MED_WORKSHOPS',
					function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
					})
}

exports.getWorkshop = function(id, done) {

	var values = [ id ]
	db
			.get()
			.query(
					'select id, title, author, content, contact, place, date, status, fk_editor from MED_WORKSHOPS where id = ?',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
					})
}

exports.createWorkshop = function(title, author, content, contact, place, date, status, fk_editor,
		done) {
	var values = [ title, author, content, contact, place, date, status, fk_editor ]

	db
			.get()
			.query(
					'INSERT INTO MED_WORKSHOPS (title, author, content, contact, place, date, status, fk_editor) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
					values, function(err, result) {
						if (err)
							return done(err)
						done(null, result)

						console.log('Pomyslny insert do tabeli MED_WORKSHOPS.')
					})
}

exports.updateWorkshop = function(id, title, author, content, contact, place, date, status, fk_editor, done) {
	var values = [ title, author, content, contact, place, date, status, fk_editor, id ]

	db
			.get()
			.query(
					'UPDATE MED_WORKSHOPS set title=?, author=?, content=?, contact=?, place=?, date=?, status=?, fk_editor=? where ID = ?',
					values, function(err, result) {
						if (err)
							return done(err)
						done(null, result)

						console.log('Pomyslny update do tabeli MED_WORKSHOPS.')
					})
}

exports.deleteWorkshop = function(id, fk_editor, done) {
	var values = [ 'D', fk_editor, id ]

	db
			.get()
			.query(
					'UPDATE MED_WORKSHOPS set STATUS =?, FK_EDITOR=? where ID = ?',
					values, function(err, result) {
						if (err)
							return done(err)
						done(null, result)

						console.log('Pomyslny update do tabeli MED_WORKSHOPS.')
					})
}

exports.getActive = function(done) {
	var values = [ 'D' ]
	
	db.get().query('SELECT id, title, author, content, contact, place, date, status, fk_editor FROM MED_WORKSHOPS where STATUS <> ? or STATUS is null',
			values,
			function(err, rows) {
				if (err)
					return done(err)
				done(null, rows)
			})
}

exports.getDeleted = function(done) {
	var values = [ 'D' ]
	
	db.get().query('SELECT id, title, author, content, contact, place, date, status, fk_editor FROM MED_WORKSHOPS where STATUS = ?',
			values,
			function(err, rows) {
				if (err)
					return done(err)
				done(null, rows)
			})
}

exports.setActiveWorkshop = function(id, fk_editor, done) {
	var values = [ 'A', fk_editor, id ]

	db
			.get()
			.query(
					'UPDATE MED_WORKSHOPS set STATUS =?, FK_EDITOR=? where ID = ?',
					values, function(err, result) {
						if (err)
							return done(err)
						done(null, result)

						console.log('Pomyslny update do tabeli MED_WORKSHOPS.')
					})
}