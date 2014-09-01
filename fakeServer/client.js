
var net = require('net');

var HOST = '127.0.0.1';
var PORT = 2222;

var mm=8;
var nn=5;

var client = new net.Socket();

function sendRequest() {
    for(var m=1; m < mm; m++){
        for(var n=1; n < nn; n++){
            var str = '' + m +',' + n + ';';
            client.write(str);
        }
    }
}

function sendRequest1() {
    var str = '1,2;3,4;5,';
    client.write(str);
    setTimeout( function() {
        var str = '6;7,8;';
        client.write(str);
    }, 1000);
}

client.connect(PORT, HOST, function() {
        console.log('Connect to ' + HOST + ':' + PORT);
        sendRequest1();
});


function parseResult(data){
    var str = '' + data;
    var results = str.split(';');
    console.log(results);
}

client.on('data', function(data) {
        console.log('Recv data from server = ' + data);
        parseResult(data);
});

setTimeout( function() { client.destroy(); } , 20000);
