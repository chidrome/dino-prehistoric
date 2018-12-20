var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var methodOverride = require('method-override');



// >>>>>>>>> MIDDLEWARE <<<<<<<<<<<
app.set('view engine', 'ejs');
app.use(ejsLayouts);
// tells our app to look for a _mthod query string in the request URL
app.use(methodOverride('_method'));
// body parser middleware
app.use(express.urlencoded({extended: false}));

// home route
app.get('/', function(req, res){
	res.send('This is my home route!');
});	


// >>>>>> CONTROLLERS MIDDLEWARE <<<<<<<
app.use('/dinosaurs', require('./controller/dinosaurs'));
app.use('/prehistoric_creatures', require('./controller/prehistoric_creatures'));


app.listen(8000);




