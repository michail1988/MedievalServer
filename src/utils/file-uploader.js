var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = './uploads/';

var storage = multer.diskStorage({
	destination : function(request, file, callback) {
		callback(null, './uploads');
	},
	filename : function(request, file, callback) {
		console.log("File=" + file);
		console.log("Original=" + file.originalname)
		callback(null, file.originalname)
	}
});

var upload = multer({
	storage : storage
}).single('file');

exports.uploadFile = function(req, res) {

	upload(req, res, function(err) {
		if (err) {
			console.log('Error Occured' + err);
			return;
		}
		
		res.sendStatus(200);
		console.log(req.file);
		console.log('Photo Uploaded');
	})
};