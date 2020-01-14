var url = require('url')
var fs = require('fs')
function renderHTML(path, resoponse){
    fs.readFile(path, null, function(err,data) {
        if(err){
            resoponse.writeHead(404);
            resoponse.write('File not found!');
        }else{
            resoponse.write(data)
        }
        resoponse.end()
    });
}
module.exports ={
    handleRequest: function(request, response) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        var path = url.parse(request.url).pathname;
        switch(path) {
            case '/' :
                renderHTML('./client/html/utilities/login.html',response)
                break;
            case '/login':
                renderHTML('./client/html/utilities/login.html',response)
                break;
            default:
                response.writeHead(404)
                response.write('Route not defind')
                response.end()
        }
    }
}