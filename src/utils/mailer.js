var nodemailer = require("nodemailer");
var config = require('../config');

// http://localhost:3000/email
// create reusable transport method (opens pool of SMTP connections)
var smtpConfig = {
	host : config.contact.smtphost,
	port : 465,
	secure : true, // use SSL
	auth : {
		user : config.contact.user,
		pass : config.contact.password
	},
	tls : {
		rejectUnauthorized : false
	}
};
var transporter = nodemailer.createTransport(smtpConfig);

exports.sendEmail = function() {
	// setup e-mail data with unicode symbols
	var mailOptions = {
		from : "Kongres mediewistow polskich ✔ <mediewisci@kongres.pl>", // sender
		// address
		to : "michail1988@o2.pl", // list of receivers
		subject : "Dziekujemy za zgloszenie ✔", // Subject line
		text : "Hello world ✔", // plaintext body
		html : "<b>Dziekujemy za rejestracje. ✔</b>" // html body
	}

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, response) {
		if (error) {
			console.log(error);
		} else {
			console.log("Message sent: " + response.message);
		}

		// if you don't want to use this transport object anymore, uncomment
		// following line
		// smtpTransport.close(); // shut down the connection pool, no more
		// messages
	});
}

exports.sendMessageEmail = function(name, email, subject, message) {

	var mailOptions = {
		from : "kontakt@vikmp.pl", // sender
		to : "michail1988@o2.pl, " + config.contact.email, // todo
															// parametryzacja,
															// administracja
		subject : subject, // Subject line
		text : message, // plaintext body
		html : "<b>Wiadomosc z formularza kontaktowego od " + name
				+ "</b><br/>" + email + "<hr><br/>" + message
	}

	transporter.sendMail(mailOptions, function(error, response) {
		if (error) {
			console.log(error);
		} else {
			console.log("Message sent: " + message);
		}
	});
}

exports.sendAdminMessages = function(name, emails, subject, message) {

	var mailOptions = {
		from : config.contact.email, // todo parametryzacja, administracja
		to : emails,
		subject : subject, // Subject line
		text : message, // plaintext body
		html : message
	}

	transporter.sendMail(mailOptions, function(error, response) {
		if (error) {
			console.log(error);
		} else {
			console.log("Message sent: " + message);
		}
	});
}

exports.sendPassword = function(email, password) {

	var mailOptions = {
		from : config.contact.email,
		to : email,
		subject : "Zapomniane hasło", // Subject line
		text : "Pozdrawiamy", // plaintext body
		html : "Twoje hasło <br/><b>" + password + "</b>"
	}

	transporter.sendMail(mailOptions, function(error, response) {
		if (error) {
			console.log(error);
		} else {
			console.log("Password sent: " + message);
		}
	});
}

exports.sendUserAccepted = function(email) {

	var mailOptions = {
		from : config.contact.email,
		to : email,
		subject : "Zgłoszenie zaakceptowane", // Subject line
		text : "Pozdrawiamy", // plaintext body
		html : "Miło nam poinformowac, że Pana/Pani zgłoszenie uczestnictwa w VI Kongresie Mediewistów Polskich zostało <b> zaakceptowane.</b>" +
				"<br/>"
			+ "<br/> Można teraz zalogowac się na stronie: ...."
	}

	transporter.sendMail(mailOptions, function(error, response) {
		if (error) {
			console.log(error);
		} else {
			console.log("Acceptation mail sent: " + message);
		}
	});
}

exports.sendUserRejected = function(email) {

	var mailOptions = {
		from : config.contact.email,
		to : email,
		subject : "Zgłoszenie nie zostało przyjęte", // Subject line
		text : "Pozdrawiamy", // plaintext body
		html : "Niestety musimy poinformowac, że Pana/Pani zgłoszenie nie zostało przyjęte <br/>"
	}

	transporter.sendMail(mailOptions, function(error, response) {
		if (error) {
			console.log(error);
		} else {
			console.log("Rejection mail sent: " + message);
		}
	});
}