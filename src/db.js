var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'medievaluser',
  password: 'medievaluser3306',
  database: 'medieval'
})

connection.connect(function(err) {
  if (err) {
	  console.log('Wystapil blad przy probie polaczenia z baza danych. '  + err)
	  throw err
  }
  
  console.log('Polaczono z baza danych.')
})