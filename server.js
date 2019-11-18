var exec = require('exec');
var request=require('request');

var express = require('express'),
    app = express();


var iliRouter = express.Router();
var dfnRouter = express.Router();
var dwnRouter = express.Router();

var PORT=3333;

function describe_resource(base_uri, q, callback){
	var endpoint = 'http://localhost:8890/sparql?format=text%2Fntriples&query=';
        var query = "DESCRIBE <" + base_uri + q + ">";
        request(endpoint + encodeURIComponent(query), function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                        callback(body); // Show the HTML for the Google homepage.
                  }
        })
}

iliRouter.get('/:id', function(req, res){
	var base_uri="http://globalwordnet.org/ili/";
	console.log("DFN uri " + base_uri + ',' + req.params.id);
        describe_resource(base_uri, req.params.id, function(results){
                res.header("Content-Type", "text/plain");
                res.send(results);
        });
});

dfnRouter.get('/:id', function(req, res){
        var base_uri="http://rdf.cltl.nl/dfn/";
	console.log("DFN uri " + base_uri + ',' + req.params.id);
        describe_resource(base_uri, req.params.id, function(results){
                res.header("Content-Type", "text/plain");
                res.send(results);
        });
});

dwnRouter.get('/:id', function(req, res){
        var base_uri="http://rdf.cltl.nl/dwn/";
        describe_resource(base_uri, req.params.id, function(results){
                res.header("Content-Type", "text/plain");
                res.send(results);
        });
});

iliRouter.post('/webhook', function(req, res){
        exec('/import/cltl/tmp/semweb/rdf-server/reload.sh',
        function (error, stdout, stderr) {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                        console.log('exec error: ' + error);
                }
        });
          res.send("Called");

})

app.use('/ili', iliRouter);
app.use('/dfn', dfnRouter);
app.use('/dwn', dwnRouter);

app.listen(PORT);
console.log('Server started on port ' + PORT);
