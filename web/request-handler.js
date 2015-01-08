var path = require('path');
var helpers = require('../helpers/archive-helpers');
// require more modules/folders here!
var actions = {
  'GET': function(res,code,resp){
    sendResponse(res,code,resp);
  },
  'POST': function(){},
  'OPTIONS': function(){}
};

var sendResponse = function(response,statusCode,resp){
    response.writeHead(statusCode, headers);
    //console.log("this is response",response);
    response.end(resp);
};

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type":"application/json"
};


exports.handleRequest = function (req, res) {
  // note:  helpers.paths.list give the TEST url to sites.txt!!!!!
  // note:  req.url gives the path after the url
  var action = actions[req.method];
  var statusCode;
  var resp = "<input>";
  if(req.url === "/"){
    statusCode = 200;
    action(res,statusCode,resp);

  } else{
    statusCode = 200;
    var data;
    helpers.goIntoFileAndReadIt(req.url,function(d){
      console.log("we want the D!");
      if(d){
        console.log("we got the D!",d);
        data = d;
      }
      resp = data;
      action(res,statusCode,resp);

    });
  }


  //res.end(helpers.paths.list);
};




