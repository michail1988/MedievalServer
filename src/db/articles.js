var db = require('../db');

exports.createArticle = function(author, title, content, headline, fk_editor, done) {
	var values = [ author, title, content, headline, fk_editor ]

	db
			.get()
			.query(
					'INSERT INTO MED_ARTICLES (AUTHOR, TITLE, CONTENT, HEADLINE, FK_EDITOR) VALUES(?, ?, ?, ?, ?)',
					values, function(err, result) {
						if (err)
							return done(err)
						done(null, result)

						console.log('Pomyslny insert do tabeli MED_ARTICLES.')
					})
}

exports.updateArticle = function(author, title, content, headline, fk_editor, id, done) {
	var values = [ author, title, content, headline, fk_editor, id ]

	db
			.get()
			.query(
					'UPDATE MED_ARTICLES set AUTHOR =?, TITLE=?, CONTENT=?, HEADLINE=?, FK_EDITOR=? where ID = ?',
					values, function(err, result) {
						if (err)
							return done(err)
						done(null, result)

						console.log('Pomyslny update do tabeli MED_ARTICLES.')
					})
}

exports.getAll = function(done) {
	db.get().query('SELECT id, author, title, content, headline FROM MED_ARTICLES',
			function(err, rows) {
				if (err)
					return done(err)
				done(null, rows)
			})
}

exports.getArticle = function(id, done) {

	var values = [ id ]
	db
			.get()
			.query(
					'SELECT id, author, title, content, headline FROM MED_ARTICLES where id = ?',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
					})
}

//TODO zamiast tabeli MED_ADMINS bedzie tabela userow
exports.getArticleHistory = function(fk_article, done) {

	var values = [ fk_article ]
	db
			.get()
			.query(
					'SELECT author, title, content, headline, username as editor, modified_date FROM MED_ARTICLES_H, MED_ADMINS a where fk_article = ? and FK_EDITOR = a.ID order by modified_date desc',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
					})
}