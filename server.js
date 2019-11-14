var exec = require('exec');
var request=require('request');
var htmlEncode = require('js-htmlencode');

var express = require('express'),
    iliRouter = express.Router(),
    app = express();

var PORT=3333;

function describe_resource(q, callback){
        var endpoint = 'http://localhost:8890/sparql?format=text%2Fntriples&query=';
        var query = "DESCRIBE <http://globalwordnet.org/ili/" + q + ">";
        request(endpoint + encodeURIComponent(query), function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                        callback(body); // Show the HTML for the Google homepage.
                  }
        })
}

iliRouter.get('/:id', function(req, res){
        var data="";
        describe_resource(req.params.id, function(results){
                res.header("Content-Type", "text/plain");
                res.send(results);
        });
});

iliRouter.post('/webhook', function(req, res){
        exec('/import/cltl/tmp/semweb/ili-server/reload.sh',
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

app.listen(PORT);
console.log('Server started on port ' + PORT);
