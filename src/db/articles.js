var db = require('../db');

exports.createArticle = function(user, text, done) {
	  var values = [user, text]
	  
	  this.get().query('INSERT INTO MED_ARTICLES (AUTHOR, CONTENT) VALUES(?, ?)', values, function(err, result) {
		  if (err) return done(err)
		    done(null, result)
		    
	    console.log('Pomyslny insert.')
	  })
	}

	exports.getAll = function(done) {
	  this.get().query('SELECT AUTHOR, CONTENT FROM MED_ARTICLES', function (err, rows) {
	    if (err) return done(err)
	    done(null, rows)
	     console.log('Pomyslny select.')
	  })
	}