var express = require('express');
var router = express();
var fs = require('fs');
var creaturesData = fs.readFileSync('./prehistoric_creatures.json');
creaturesData = JSON.parse(creaturesData);


// middleware
router.use(express.urlencoded({extended: false}));

// prehistoric creatures route
router.get('/', function(req, res){
	res.render('creatures/index', {myCreatures: creaturesData});
});


//tell node to export router object
module.exports = router;