

var path = require('path');
var helpers = require('../helpers/archive-helpers');
// require more modules/folders here!
var actions = {
  'GET': function(request, code, response){
    // check sites.txt for the url that was sent

    var pathToSites = request.url.split('').slice(1).join('');
    helpers.isUrlArchived(pathToSites, function(found){
      if(found){// if it is there serve asset
        serveAssets(response,pathToSites,function(){
        });
        helpers.isUrlArchived(pathToSites, function(archived){
          // if it is archived
          if(archived){
              // serve the archive file
              //helpers.sendRedirect(response, request.url, code);
          }else{
            // if it is not there send it to loading.html
            helpers.sendRedirect(response, '/loading.html', code);
          }
        });

      }else{// if not in sites.txt add it to sites.txt

        send404(response);
        // redirect to loading.html
      }
    });
  },
  'POST': function(request, code, response){
      console.log('in post!!!!!!!!');
      code = 302;
      var url;
      collectData(request,function(data){
        url = data;
      });
      url = url.split('').slice(4).join('');
      helpers.isUrlInList(url,function(f){

          console.log("this is f",f);

        if(f){
          helpers.sendRedirect(response,'/loading.html',code);
        }else{
          console.log("request.url",request.url);
          helpers.addUrlToList(url, function(){
            console.log("it worked");
            helpers.sendRedirect(response,'loading.html',code);
          });

        }

      });
    // check sites.txt for the url that was sent
    // console.log("Here is request: ",request);
    // var pathToSites = helpers.paths.archivedSites + request.url;
    // console.log("here is path to sites.txt: " , pathToSites);
    // helpers.isUrlInList(pathToSites, function(found){
    //   console.log("here is the request.url ", request.url);
    //   if(found){// if found, serve the site
    //     // Check to see if it is archived
    //     helpers.isUrlArchived(request.url, function(archived){
    //     // if it is archived
    //     if(archived){
    //         // serve the archive file
    //       helpers.sendRedirect(response, request.url, code);
    //     } else{
    //       // if it is not there send it to loading.html
    //       helpers.sendRedirect(response, '/loading.html', code);
    //     }
    //   });

    //   }else{// if not in sites.txt add it to sites.txt
    //     helpers.addUrlToList(request.url, function(){
    //       console.log("Added to list, hooray!");
    //     });
    //     // redirect to loading.html
    //     helpers.sendRedirect(response, '/loading.html', code);
    //   }
    // });
  }
};

var collectData = function(request, callback){
  var data = "";
  request.on("data", function(chunk){
    data += chunk;
  });
  request.on("end", function(){
    callback(data);
  });
};

var serveAssets = function(res, asset, callback) {
  var p= helpers.paths.archivedSites + "/" + asset;
  helpers.goIntoFileAndReadIt(p,function(data){
    sendResponse(res,200,data);
  });

  // fs.readFile(helpers.paths.archivedSites +"/"+ asset, 'utf-8',function(err,data){
  //   console.log("inside fs.readFile");
  //   sendResponse(res,200,data);
  // });

};

var send404 = function(response){
  console.log("inside send404");
  sendResponse(response, 404,'404: Page not found');
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
  if(req.url === "/" && req.method==='GET'){
    statusCode = 200;
    sendResponse(res,statusCode,resp);

  } else{
    statusCode = 200;
    // helpers.goIntoFileAndReadIt(req.url,function(d){
    //   if(d){
    //     data = d;
    //   }
    //   resp = data;
    action(req,statusCode,res);

    // });
  }


  //res.end(helpers.paths.list);
};




