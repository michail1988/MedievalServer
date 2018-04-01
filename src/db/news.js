var db = require('../db');

exports.createNews = function(author, title, content, headline, fk_editor, done) {
	var values = [ author, title, content, headline, fk_editor, 'A' ]

	db
			.get()
			.query(
					'INSERT INTO MED_NEWS (AUTHOR, TITLE, CONTENT, HEADLINE, FK_EDITOR, STATUS) VALUES(?, ?, ?, ?, ?, ?)',
					values, function(err, result) {
						if (err)
							return done(err)
						done(null, result)

						console.log('Pomyslny insert do tabeli MED_NEWS.')
					})
}

exports.updateNews = function(author, title, content, headline, fk_editor, id, done) {
	var values = [ author, title, content, headline, fk_editor, id ]

	db
			.get()
			.query(
					'UPDATE MED_NEWS set AUTHOR =?, TITLE=?, CONTENT=?, HEADLINE=?, FK_EDITOR=? where ID = ?',
					values, function(err, result) {
						if (err)
							return done(err)
						done(null, result)

						console.log('Pomyslny update do tabeli MED_NEWS.')
					})
}

exports.deleteNews = function(id, fk_editor, done) {
	var values = [ 'D', fk_editor, id ]

	db
			.get()
			.query(
					'UPDATE MED_NEWS set STATUS =?, FK_EDITOR=? where ID = ?',
					values, function(err, result) {
						if (err)
							return done(err)
						done(null, result)

						console.log('Pomyslny update do tabeli MED_NEWS.')
					})
}

exports.setActiveNews = function(id, fk_editor, done) {
	var values = [ 'A', fk_editor, id ]

	db
			.get()
			.query(
					'UPDATE MED_NEWS set STATUS =?, FK_EDITOR=? where ID = ?',
					values, function(err, result) {
						if (err)
							return done(err)
						done(null, result)

						console.log('Pomyslny update do tabeli MED_NEWS.')
					})
}

exports.getAll = function(done) {
	db.get().query('SELECT id, author, title, content, headline, status FROM MED_NEWS',
			function(err, rows) {
				if (err)
					return done(err)
				done(null, rows)
			})
}

exports.getActive = function(done) {
	var values = [ 'D' ]
	
	db.get().query('SELECT id, author, title, content, headline, status FROM MED_NEWS where STATUS <> ? or STATUS is null',
			values,
			function(err, rows) {
				if (err)
					return done(err)
				done(null, rows)
			})
}

exports.getDeletedNews = function(done) {
	var values = [ 'D' ]
	
	db.get().query('SELECT id, author, title, content, headline, status FROM MED_NEWS where STATUS = ?',
			values,
			function(err, rows) {
				if (err)
					return done(err)
				done(null, rows)
			})
}

exports.getNews = function(id, done) {

	var values = [ id ]
	db
			.get()
			.query(
					'SELECT id, author, title, content, headline, status FROM MED_NEWS where id = ?',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
					})
}

//TODO zamiast tabeli MED_ADMINS bedzie tabela userow
exports.getNewsHistory = function(fk_article, done) {

	var values = [ fk_article ]
	db
			.get()
			.query(
					'SELECT author, title, content, headline, CONCAT(u.name, " ", u.SURNAME) as editor, modified_date FROM MED_NEWS_H h, MED_USERS u where fk_article = ? and h.FK_EDITOR = u.ID order by modified_date desc',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
					})
}