'use strict';

var express = require('express')
var app = express()
var initTracer = require('../../lib/tracing').initTracer;

app.get('/', function (req, res) {
    var helloStr = sayHello(helloTo);
    res.send(helloStr)
})

function sayHello(helloTo) {
    var span = tracer.startSpan('say-hello');
    
    var helloStr = 'Hello, ' + helloTo + '!';
    span.log({
        'event': 'format-string',
        'value': helloStr
    });
    
    console.log(helloStr);
    span.log({'event': 'print-string'})
    
    span.finish();

    return helloStr;
}  
  
if (process.argv.length != 3) {
    throw new Error('expecting one argument')
}

var helloTo = process.argv[2];

var tracer = initTracer('hello-world');

app.listen(8080, function () {
    console.log('Hello app listening on port 8080')
})
