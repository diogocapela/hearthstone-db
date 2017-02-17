/*
 *
 *	by Diogo Capela
 *
 */

const express = require('express');
const hbs = require('hbs');
const unirest = require('unirest');

var app = express();

// Definir os partials
// --------------------------------------------
hbs.registerPartials(__dirname + '/views/partials');

// Definir as views (ficam default no folder /views) 
// --------------------------------------------
app.set('view engine', 'hbs');

// Route para __dirname
// --------------------------------------------
app.get('/', function(request, response, next) {

	getClientIP(request);

	unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards")
	.header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
	.end(function (result) {

		console.log('Index');
		response.render('index.hbs', result.body);

	});
});

// Route para __dirname/card/{{name}}
// --------------------------------------------
app.get('/card/:name', function (request, response, next) {

	getClientIP(request);

	var query = request.query;
	var name = request.params.name;
	var locale = query.locale;

	unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/" + name + "?locale=" + locale)
	.header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
	.header("Accept", "application/json")
	.end(function (result) {

		console.log('Card: ' + name + 'Locale: ' + locale);
		response.render('card.hbs', result.body[0]);

	});
});

// Route para __dirname/set/{{set}}
// --------------------------------------------
app.get('/set/:set', function(request, response, next) {

	getClientIP(request);

	var set = request.params.set;

	unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/sets/" + set)
	.header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
	.end(function (result) {

		var obj = new Object();
		obj.setName = set;
		obj.sets = result.body;

		console.log('Set:', set);
		response.render('set.hbs', obj);

	});
});

// Route para __dirname/class/{{class}}
// --------------------------------------------
app.get('/class/:hsClass', function(request, response, next) {

	getClientIP(request);

	var hsClass = request.params.hsClass;

	unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/" + hsClass)
	.header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
	.end(function (result) {

		var obj = new Object();
		obj.className = hsClass;
		obj.class = result.body;

		console.log('Class:', hsClass);
		response.render('class.hbs', obj);

	});
});

// Route para __dirname/type/{{type}}
// --------------------------------------------
app.get('/type/:type', function(request, response, next) {

	getClientIP(request);

	var type = request.params.type;

	unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/types/" + type)
	.header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
	.end(function (result) {

		var obj = new Object();
		obj.typeName = type;
		obj.type = result.body;

		console.log('Type:', type);
		response.render('type.hbs', obj);

	});
});

// Route para __dirname/rarity/{{quality}}
// --------------------------------------------
app.get('/rarity/:quality', function(request, response, next) {

	getClientIP(request);

	var quality = request.params.quality;

	unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/qualities/" + quality)
	.header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
	.end(function (result) {

		var obj = new Object();
		obj.rarityName = quality;
		obj.rarity = result.body;

		console.log('Rarity:', quality);
		response.render('rarity.hbs', obj);

	});
});

// Route para __dirname/all-cards
// --------------------------------------------
app.get('/all-cards', function(request, response, next) {

	getClientIP(request);

	unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards")
	.header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
	.end(function (result) {

		console.log('All Cards');
		response.render('all-cards.hbs', result.body);

	});
});

// Route para __dirname/cardbacks
// --------------------------------------------
app.get('/cardbacks', function (request, response, next) {

	getClientIP(request);

	var query = request.query;
	var locale = query.locale;

	unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cardbacks?locale=" + locale)
	.header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
	.header("Accept", "application/json")
	.end(function (result) {

		console.log('Card Backs');
		response.render('cardbacks.hbs', result);

	});
});

// Route para __dirname/search/{{name}}
// --------------------------------------------
app.get('/search/:name', function(request, response, next) {

	getClientIP(request);

	var name = request.params.name;

	unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/" + name)
	.header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
	.end(function (result) {

		var obj = new Object();
		obj.searchName = name;
		obj.search = result.body;

		console.log('Pesquisa:', name);
		response.render('search.hbs', obj);

	});
});

// Funções
// --------------------------------------------
function getClientIP(request) {
	var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
	console.log('Client IP Address:', ip);
}

// Iniciar o server
// --------------------------------------------
var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('The server is now running.');
});

console.log('Loading server...');