var express = require('express');
var router = express.Router();
var fs = require('fs');
var dinoData = fs.readFileSync('./dinosaurs.json');
dinoData = JSON.parse(dinoData);


// dino index route
router.get('/', function(req, res){
	var nameFilter = req.query.nameFilter;
	if(nameFilter){
		var filteredData = dinoData.filter(function(dino){
			return dino.name.toLowerCase() === nameFilter.toLowerCase();
		});
		res.render('dino/index', {myDinos: filteredData});
	} else {
		res.render('dino/index', {myDinos: dinoData});
	}
	
});

// dino new route
router.get('/dinosaurs/new', function(req, res){
	res.render('dino/new');
});

// dino show route
router.get('/dinosaurs/:idx', function(req, res){
	if(dinoData[req.params.idx-1]){
		res.render('dino/show', {dino: dinoData[req.params.idx-1]});
	} else {
		res.send('We only have '+dinoData.length+' dinos at this time');
	}
});

// new dino post route
router.post('/dinosaurs', function(req, res){
	// add new dino to our array
	dinoData.push(req.body);
	
	//save new dino to our json file
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
	// redirect to the GET /dinosaurs route (index)
	res.redirect('/dinosaurs');
});

module.exports = router;



