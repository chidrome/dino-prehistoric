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

// dino edit route
router.get('/edit/:idx', function(req, res){
	res.render('dino/edit', {dinoToEdit: dinoData[req.params.idx], dinoId: req.params.idx});
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

// delete route
router.delete('/:idx', function(req, res){
	// remove the dinosaur from teh dinoData array
	dinoData.splice(req.params.idx, 1);

	// save the new dinosaurs array to the dinosaurs json file.
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));

	// after deleting the dinosaur redicrect back to the index page
	res.redirect('/dinosaurs');
});

// put route for the edits
router.put('/:idx', function(req, res){
	// edit the dino data 
	dinoData[req.params.idx].name = req.body.name;
	dinoData[req.params.idx].type = req.body.type;

	// save the new dinoData
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));

	// redirect back to the index page after editting
	res.redirect('/dinosaurs');
});



// tell node to export router object
module.exports = router;
















