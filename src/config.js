var config = {};

config.mygmail = {};
config.mygmail.user = 'labuda.michal.pawel@gmail.com';
config.mygmail.password = 'Test123123';
config.mygmail.smtphost= 'smtp.gmail.com';

config.twitter = {};
config.redis = {};
config.web = {};

config.default_stuff = [ 'red', 'green', 'blue', 'apple', 'yellow', 'orange',
		'politics' ];
config.twitter.user_name = process.env.TWITTER_USER || 'username';
config.twitter.password = process.env.TWITTER_PASSWORD || 'password';
config.redis.uri = process.env.DUOSTACK_DB_REDIS;
config.redis.host = 'hostname';
config.redis.port = 6379;
config.web.port = process.env.WEB_PORT || 9980;

config.contact = {};
config.contact.user = 'kontakt@vikmp.pl';
config.contact.password = 'Kontakt123123';
config.contact.smtphost= 'labudamichve.nazwa.pl';
config.contact.email = 'kontakt@vikmp.pl';

module.exports = config;