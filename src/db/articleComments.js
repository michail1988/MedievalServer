var db = require('../db');

exports.getAllComments = function(articleid, done) {

	var values = [ articleid ];

	db
			.get()
			.query(
					'SELECT  c.comment as parentcomment, '
							+ 'c.date as parentdate, '
							+ 'c.id as parentid, '
							+ '(select concat(u.name, " ", u.surname) FROM MED_USERS u where u.id = c.fk_user) as parentusername, '
							+ 'c.status as parentconfirmed, '
							+

							'cc.comment as comment, '
							+ 'cc.date as date, '
							+ 'cc.id as id, '
							+ '(select concat(u.name, " ", u.surname) FROM MED_USERS u where u.id = cc.fk_user) as username, '
							+ 'cc.status as confirmed '
							+

							'FROM MED_COMMENTS as c '
							+ 'left JOIN MED_COMMENTS as cc '
							+ '  ON cc.FK_PARENTCOMMENT = c.id and c.status = cc.status '
							+ '  where c.FK_PARENTCOMMENT is null '
							+ '     and c.fk_post = ? '
							+ ' ORDER BY c.DATE ASC, cc.DATE ASC;', values,
					function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
					})
}

exports.getConfirmedComments = function(articleid, done) {

	var values = [ 'Y', articleid ];

	db
			.get()
			.query(
					'SELECT  c.comment as parentcomment, '
							+ 'c.date as parentdate, '
							+ 'c.id as parentid, '
							+ '(select concat(u.name, " ", u.surname) FROM MED_USERS u where u.id = c.fk_user) as parentusername, '
							+ 'c.status as parentconfirmed, '
							+

							'cc.comment as comment, '
							+ 'cc.date as date, '
							+ 'cc.id as id, '
							+ '(select concat(u.name, " ", u.surname) FROM MED_USERS u where u.id = cc.fk_user) as username, '
							+ 'cc.status as confirmed '
							+

							'FROM MED_COMMENTS as c '
							+ 'left JOIN MED_COMMENTS as cc '
							+ '  ON cc.FK_PARENTCOMMENT = c.id and c.status = cc.status '
							+ '  where c.FK_PARENTCOMMENT is null '
							+ '     and c.status = ? '
							+ '     and c.fk_post = ? '
							+ ' ORDER BY c.DATE ASC, cc.DATE ASC;', values,
					function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
					})
}

//todo createadmin Comment
exports.createComment = function(parentcomment, comment, fk_post, fk_user, confirmed, done) {
	
	if (!parentcomment.trim()) {
	    // is empty or whitespace
		parentcomment = null
	}
	
	var values = [ parentcomment, comment, fk_post, fk_user, confirmed ]

	db
			.get()
			.query(
					'insert into MED_COMMENTS (FK_PARENTCOMMENT, COMMENT, FK_POST, FK_USER, DATE, STATUS) VALUES (?, ?, ?, ?, NOW(), ?);',
					values, function(err, result) {
						if (err) {
							console.log('Error=' + err)
							return done(err)
						}
							
						done(null, result)

						console.log('Pomyslny insert do tabeli MED_COMMENTS.')
					})
}