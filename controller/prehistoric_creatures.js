var express = require('express');
var router = express();
var fs = require('fs');
var creaturesData = fs.readFileSync('./prehistoric_creatures.json');
creaturesData = JSON.parse(creaturesData);


//middleware
// router.use(express.urlencoded({extended: false}));

// prehistoric creatures route
router.get('/prehistoric_creatures', function(req, res){
	res.render('prehistoric_creatures/prehistoric_creatures', {myCreatures: creaturesData});
});
