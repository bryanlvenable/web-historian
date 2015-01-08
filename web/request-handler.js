var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

var actions = {
  'GET': function(res,code,resp){
    sendResponse(res,code,resp);
  },
  'POST': function(){},
  'OPTIONS': function(){}
};
// var paths = { // Possibly rename this in the future for clarity
//   '/':200, //temporarily hardcoded.. eventually would need to search file
//   '/www.google.com':200
// };



var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type":"application/json"
};



var sendResponse = function(response,statusCode,resp){
    response.writeHead(statusCode, headers);
    //console.log("this is response",response);
    response.end(resp);
};

exports.handleRequest = function (req, res) {
  //res.end(archive.paths.list);
  // var p = archive.paths.list;
  // console.log(p);
  var action = actions[req.method];
  var resp = "<input type='input' name="+archive.paths.archiveSites+req.url+"></input>";
  //var resp = null;
  var statusCode;
  // archive.readListOfUrls();
  statusCode = archive.isUrlInList(req.url) ? 200 : 404;
  // archive.readListOfUrls(p);
  if(req.url === '/'){
    statusCode = 200;
  }
  action(res,statusCode,resp);


  //sendResponse(res,data,statusCode);


};
