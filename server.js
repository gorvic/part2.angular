var express = require('express');
var path = require('path');
var port = process.env.PORT || 8080;
var app = express();

app.use(express.static(__dirname + '/app'));
app.use('/app/styles', express.static(path.join(__dirname + '/app/styles')));
//app.use(express.static(__dirname + '/bower_components'));
//http://stackoverflow.com/questions/9756567/do-you-need-to-use-path-join-in-node-js
//http://www.unknownerror.org/opensource/jlong/serve/q/stackoverflow/21821773/configure-node-express-to-serve-static-bower-components
//ответ Abhijit Mazumder
app.use('/bower_components', express.static(path.join(__dirname + '/bower_components')));

app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});
