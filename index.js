var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');


app.set('view engine', 'ejs');
app.use(ejsLayouts);
// body parser middleware
app.use(express.urlencoded({extended: false}));

// home route
app.get('/', function(req, res){
	res.send('This is my home route!');
});


app.use('/dinosaurs', require('./controller/dinosaurs'));
// app.use('/prehistoric_creatures', require('./controller/prehistoric_creatures'));



app.listen(8000);




