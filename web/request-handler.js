var path = require('path');
var helpers = require('../helpers/archive-helpers');
// require more modules/folders here!
var actions = {
  'GET': function(res,code,resp){
    sendResponse(res,code,resp);
  },
  'POST': function(request, code, response){
    // code = 302;
    var inSite = false;
    // check sites.txt for the url that was sent
    helpers.isUrlInList(request.url, function(found){
      if(found){// if it is there
        // Check to see if it is archived
        helpers.isUrlArchived(request.url, function(archived){
        // if it is archived
        if(archived){
            // serve the archive file
          helpers.sendRedirect(response, request.url, code);
        } else{
          // if it is not there send it to loading.html
          helpers.sendRedirect(response, '/loading.html', code);
        }
      });

      }else{// if not in sites.txt add it to sites.txt
        helpers.addUrlToList(request.url, function(){
          console.log("Added to list, hooray!");
        });
        // redirect to loading.html
        helpers.sendRedirect(response, '/loading.html', code);
      }
    });
  }
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




