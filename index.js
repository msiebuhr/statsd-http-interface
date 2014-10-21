var http  = require('http');

function rinfo(tcpstream, data) {
    this.address = tcpstream.remoteAddress;
    this.port = tcpstream.remotePort;
    this.family = tcpstream.address().family;
    this.size = data.length;
}

exports.start = function(config, callback){
    var token = config.http_token;

    var server = http.createServer(function (request, response) {
        // Check username/password
        if (token && !(request.headers.token === token)) {
            response.statusCode = 401;
            response.end('Invalid token');
            return;
        }

        request.setEncoding('ascii');

        var buffer = '';
        request.on('data', function (data) {
            buffer += data;
        });
        request.on('end', function (data) {
            if (data) { buffer += data; }
            callback(buffer, new rinfo(request.socket, buffer));
            response.end('');
        });
    });

    server.listen(config.port || 8080, config.address || undefined);
    return true;
};
