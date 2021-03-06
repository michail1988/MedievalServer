var db = require('../db');


// TODO koniecznie jakas odpowiedz
exports.createUser = function(req, done) {
	var values = [ req.body.name, req.body.surname, req.body.email,
			req.body.password, new Date(), req.body.university, req.body.phone,
			req.body.congressrole, req.body.subjectdescription,
			req.body.contactcomments, null, '', req.body.academic_title, 
			req.body.academic_status, req.body.master, req.body.engineer, 
			req.body.participation, req.body.invoice, req.body.invoice_data, 
			req.body.accommodation, req.body.accommodation_from, req.body.accommodation_to, 
			req.body.meal, req.body.lactose_intolerance, req.body.gluten_intolerance, req.body.smooking_room ]

	db
			.get()
			.query(
					'insert into MED_USERS (NAME, SURNAME, EMAIL, PASSWORD, REGISTERDATE, UNIVERSITY, PHONE, CONGRESSROLE, SUBJECTDESCRIPTION, '
							+ 'CONTACTCOMMENTS, CONFIRMATION, PRIVILEGES, academic_title, academic_status, master, engineer, participation, '
							+ 'INVOICE, INVOICE_DATA, ACCOMMODATION, ACCOMMODATION_FROM, ACCOMMODATION_TO, MEAL, lactose_intolerance, gluten_intolerance, smooking_room) '
							+ 'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
					values, function(err, result) {
						if (err)
							return done(err)
						done(null, result)

						console.log('Pomyslny insert do tabeli MED_USERS.')
					})
}

exports.getAll = function(done) {
	db
			.get()
			.query(
					'SELECT id, name, surname, email, password, registerdate, university, phone, congressrole, subjectdescription, '
							+ 'contactcomments, confirmation, privileges, summary, abstract, paper_acceptation, payment, payment_accepted, academic_title, '
							+ 'academic_status, master, engineer, participation, invoice, invoice_data, accommodation, accommodation_from, accommodation_to, '
							+ 'meal, lactose_intolerance, gluten_intolerance, smooking_room '
							+ ' FROM MED_USERS', function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}

exports.updateUser = function(body, done) {
	var values = [ body.name, body.surname, body.email, body.password, body.university, body.phone,
	               body.congressrole, body.subjectdescription, body.contactcomments, body.confirmation,
	               body.privileges, 'null', 'null', body.paper_acceptation, body.payment, body.payment_accepted,
	               body.academic_title, body.academic_status, body.master, body.engineer, body.fk_editor, body.participation, 
	               body.invoice, body.invoice_data, body.accommodation, body.accommodation_from, body.accommodation_to, 
	               body.meal, body.lactose_intolerance, body.gluten_intolerance, body.smooking_room, body.id ]

	db
			.get()
			.query(
					'UPDATE MED_USERS set name =?, surname=?, email=?, password=?, university=?, phone=?, congressrole=?, '
							+ ' subjectdescription=?, contactcomments=?, confirmation=?, privileges=?, summary=?, abstract=?, paper_acceptation=?, '
							+ 'payment=?, payment_accepted=?, academic_title=?, academic_status=?, master=?, engineer=?, FK_EDITOR=?, '
							+ 'participation=?, invoice=?, invoice_data=?, accommodation=?, accommodation_from=?, accommodation_to=?, meal=?, lactose_intolerance=?, gluten_intolerance=?, smooking_room=? where ID = ?',
					values, function(err, result) {
						if (err)
							return done(err)
						done(null, result)

						console.log('Pomyslny update do tabeli MED_USERS.')
					})
}

exports.updatePassword = function(body, done) {
	var values = [ body.password, body.fk_editor, body.id ]

	db
			.get()
			.query(
					'UPDATE MED_USERS set password=?, FK_EDITOR=? where ID = ?',
					values, function(err, result) {
						if (err)
							return done(err)
						done(null, result)

						console.log('Pomyslny update do tabeli MED_USERS.')
					})
}

exports.getAccepted = function(done) {
	var values = [ 'Y' ]

	db
			.get()
			.query(
					'SELECT id, name, surname, email, password, registerdate, university, phone, congressrole, subjectdescription, '
							+ 'contactcomments, confirmation, privileges, summary, abstract, paper_acceptation, payment, payment_accepted, academic_title, '
							+ 'academic_status, master, engineer, participation, invoice, invoice_data, accommodation, accommodation_from, accommodation_to, '
							+ 'meal, lactose_intolerance, gluten_intolerance, smooking_room '
							+ ' FROM MED_USERS where confirmation = ? ',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}

exports.getPending = function(done) {

	db
			.get()
			.query(
					'SELECT id, name, surname, email, password, registerdate, university, phone, congressrole, subjectdescription, '
							+ 'contactcomments, confirmation, privileges, summary, abstract, paper_acceptation, payment, payment_accepted, academic_title, '
							+ 'academic_status, master, engineer, participation, invoice, invoice_data, accommodation, accommodation_from, accommodation_to, '
							+ 'meal, lactose_intolerance, gluten_intolerance, smooking_room '
							+ ' FROM MED_USERS where confirmation is null ',
					function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}

exports.getWorkshop = function(done) {

	db
			.get()
			.query(
					'SELECT id, name, surname, email, password, registerdate, university, phone, congressrole, subjectdescription, '
							+ 'contactcomments, confirmation, privileges, summary, abstract, paper_acceptation, payment, payment_accepted, academic_title, '
							+ 'academic_status, master, engineer, participation, invoice, invoice_data, accommodation, accommodation_from, accommodation_to, '
							+ 'meal, lactose_intolerance, gluten_intolerance, smooking_room '
							+ ' FROM MED_USERS where participation > 1 ',
					function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}

exports.getInvoice = function(done) {

	db
			.get()
			.query(
					'SELECT id, name, surname, email, password, registerdate, university, phone, congressrole, subjectdescription, '
							+ 'contactcomments, confirmation, privileges, summary, abstract, paper_acceptation, payment, payment_accepted, academic_title, '
							+ 'academic_status, master, engineer, participation, invoice, invoice_data, accommodation, accommodation_from, accommodation_to, '
							+ 'meal, lactose_intolerance, gluten_intolerance, smooking_room '
							+ ' FROM MED_USERS where invoice > 0 ',
					function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}

exports.getAllUsersInfo = function(done) {
	db
			.get()
			.query(
					'SELECT count(*) as count FROM MED_USERS ',
					function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}

exports.getAcceptedUsersInfo = function(done) {
	var values = [ 'Y' ]
	
	db
			.get()
			.query(
					'SELECT count(*) as count FROM MED_USERS where confirmation = ? ',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}

exports.getPendingUsersInfo = function(done) {
	db
			.get()
			.query(
					'SELECT count(*) as count FROM MED_USERS where confirmation is null ',
					function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}

exports.getRejectedUsersInfo = function(done) {
	var values = [ 'N' ]
	
	db
			.get()
			.query(
					'SELECT count(*) as count FROM MED_USERS where confirmation = ? ',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}


exports.getSpeakersUsersInfo = function(done) {
	var values = [ 'R' ]
	
	db
			.get()
			.query(
					'SELECT count(*) as count FROM MED_USERS where congressrole = ? ',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}


exports.getPaymentAcceptedUsersInfo = function(done) {
	var values = [ 'Y' ]
	
	db
			.get()
			.query(
					'SELECT count(*) as count FROM MED_USERS where payment_accepted = ? ',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}

exports.getPaymentPendingUsersInfo = function(done) {
	var values = [ 'Y' ]
	
	db
			.get()
			.query(
					'SELECT count(*) as count FROM MED_USERS where payment_accepted <> ? or payment_accepted is null ',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}

exports.getWorkshopUsersInfo = function(done) {
	db
			.get()
			.query(
					'SELECT count(*) as count FROM MED_USERS where participation > 1 ',
					function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}

exports.getInvoiceUsersInfo = function(done) {
	db
			.get()
			.query(
					'SELECT count(*) as count FROM MED_USERS where invoice > 0 ',
					function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}


exports.getRejected = function(done) {
	var values = [ 'N' ]

	db
			.get()
			.query(
					'SELECT id, name, surname, email, password, registerdate, university, phone, congressrole, subjectdescription, '
							+ 'contactcomments, confirmation, privileges, summary, abstract, paper_acceptation, payment, payment_accepted, academic_title, '
							+ 'academic_status, master, engineer, participation, invoice, invoice_data, accommodation, accommodation_from, accommodation_to, '
							+ 'meal, lactose_intolerance, gluten_intolerance, smooking_room '
							+ ' FROM MED_USERS where confirmation = ? ',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}

exports.getSpeakers = function(done) {
	var values = [ 'R' ]

	db
			.get()
			.query(
					'SELECT id, name, surname, email, password, registerdate, university, phone, congressrole, subjectdescription, '
							+ 'contactcomments, confirmation, privileges, summary, abstract, paper_acceptation, payment, payment_accepted, academic_title, '
							+ ' academic_status, master, engineer, participation, invoice, invoice_data, accommodation, accommodation_from, accommodation_to, '
							+ 'meal, lactose_intolerance, gluten_intolerance, smooking_room '
							+ ' FROM MED_USERS where congressrole = ?', values,
					function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}

exports.login = function(username, password, done) {
	var values = [ username, password ]

	db
			.get()
			.query(
					'SELECT id, name, surname, registerdate, email, password, university, phone, congressrole, subjectdescription, '
							+ 'contactcomments, confirmation, privileges, summary, abstract, paper_acceptation, payment, payment_accepted, academic_title, '
							+ 'academic_status, master, engineer, participation, invoice, invoice_data, accommodation, accommodation_from, accommodation_to, meal, lactose_intolerance, gluten_intolerance, smooking_room '
							+ ' FROM MED_USERS where email = ? and password = ?',
					values, function(err, rows) {
						if (err)
							// TODO if error
							return done(err)
						done(null, rows)
					})
}

exports.getUser = function(id, done) {
	var values = [ id ]

	db
			.get()
			.query(
					'SELECT id, name, surname, email, password, registerdate, university, phone, congressrole, subjectdescription, '
							+ 'contactcomments, confirmation, privileges, summary, abstract, paper_acceptation, payment, payment_accepted, academic_title, '
							+ 'academic_status, master, engineer, participation, invoice, invoice_data, accommodation, accommodation_from, accommodation_to, meal, lactose_intolerance, gluten_intolerance, smooking_room '
							+ ' FROM MED_USERS where id = ?', values,
					function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('User selected')
					})
}

exports.acceptUser = function(id, done) {
	var values = [ 'Y', id ]

	db.get().query('UPDATE MED_USERS set CONFIRMATION =? where ID = ?', values,
			function(err, result) {
				if (err) {
					console.log('Error' + err)
					return done(err)
				}

				done(null, result)

				console.log('Pomyslny update tabeli MED_USER.')
			})
}

exports.rejectUser = function(id, done) {
	var values = [ 'N', id ]

	db.get().query('UPDATE MED_USERS set CONFIRMATION =? where ID = ?', values,
			function(err, result) {
				if (err)
					return done(err)
				done(null, result)

				console.log('Pomyslny update tabeli MED_USER.')
			})
}

exports.acceptPayment = function(id, done) {
	var values = [ 'Y', id ]

	db.get().query('UPDATE MED_USERS set PAYMENT_ACCEPTED =? where ID = ?', values,
			function(err, result) {
				if (err) {
					console.log('Error' + err)
					return done(err)
				}

				done(null, result)

				console.log('Pomyslny update tabeli MED_USER.')
			})
}

exports.rejectPayment = function(id, done) {
	var values = [ 'N', id ]

	db.get().query('UPDATE MED_USERS set PAYMENT_ACCEPTED =? where ID = ?', values,
			function(err, result) {
				if (err)
					return done(err)
				done(null, result)

				console.log('Pomyslny update tabeli MED_USERS.')
			})
}

exports.getPassword = function(email, done) {
	var values = [ email ]

	db.get().query('SELECT password FROM MED_USERS where email = ?', values,
			function(err, rows) {
				if (err)
					return done(err)
				done(null, rows)
				console.log('User selected')
			})
}

exports.getId = function(email, done) {
	var values = [ email ]

	db.get().query('SELECT id FROM MED_USERS where email = ?', values,
			function(err, rows) {
				if (err)
					return done(err)
				done(null, rows)
				console.log('User selected')
			})
}

exports.getAcceptedPayment = function(done) {
	var values = [ 'Y' ]

	db
			.get()
			.query(
					'SELECT id, name, surname, email, password, registerdate, university, phone, congressrole, subjectdescription, '
							+ 'contactcomments, confirmation, privileges, summary, abstract, paper_acceptation, payment, payment_accepted, academic_title, '
							+ 'academic_status, master, engineer, participation, invoice, invoice_data, accommodation, accommodation_from, accommodation_to, meal, lactose_intolerance, gluten_intolerance, smooking_room '
							+ ' FROM MED_USERS where payment_accepted = ? ',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}

exports.getPendingPayment = function(done) {
	var values = [ 'Y' ]

	db
			.get()
			.query(
					'SELECT id, name, surname, email, password, registerdate, university, phone, congressrole, subjectdescription, '
							+ 'contactcomments, confirmation, privileges, summary, abstract, paper_acceptation, payment, payment_accepted, academic_title, '
							+ 'academic_status, master, engineer, participation, invoice, invoice_data, accommodation, accommodation_from, accommodation_to, meal, lactose_intolerance, gluten_intolerance, smooking_room '
							+ ' FROM MED_USERS where payment_accepted <> ? or payment_accepted is null ',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}

exports.getUserHistory = function(fk_user, done) {

	var values = [ fk_user ]
	db
			.get()
			.query(
					'SELECT h.name, h.surname, h.email, h.password, h.registerdate, h.university, h.phone, h.congressrole, h.subjectdescription, '
							+ 'h.contactcomments, h.confirmation, h.privileges, h.summary, h.abstract, h.paper_acceptation, h.payment, h.payment_accepted, ' 
							+ 'h.academic_title, h.academic_status, h.master, h.engineer, h.participation, h.invoice, CONCAT(u.name, " ", u.SURNAME) as editor, modified_date  FROM MED_USERS_H h, MED_USERS u '
							+ 'where fk_user = ? and h.FK_EDITOR = u.ID order by modified_date desc',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
					})
}

