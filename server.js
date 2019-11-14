var exec = require('exec');
var request=require('request');
var htmlEncode = require('js-htmlencode');

var express = require('express'),
    iliRouter = express.Router(),
    app = express();

function describe_resource(q, callback){
        var endpoint = 'http://localhost:8890/sparql?format=text%2Fntriples&query=';
        var query = "DESCRIBE <http://globalwordnet.org/ili/" + q + ">";
        request(endpoint + encodeURIComponent(query), function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                        callback(body); // Show the HTML for the Google homepage.
                  }
        })
                //callback(results["results"]["bindings"]);
}


iliRouter.get('/:id', function(req, res){
        var data="";
        describe_resource(req.params.id, function(results){
//              res.send("<pre style=\"word-wrap: break-word; white-space: pre-wrap;\">" + htmlEncode(results) + "</pre>");
                res.header("Content-Type", "text/plain");
//              res.send(htmlEncode(results));
                res.send(results);
        });
});

iliRouter.post('/webhook', function(req, res){
        exec('/scratch/fii800/gwn/reload.sh',
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

app.listen(3333);

