var fs = require('fs');
var path = require('path');
var _ = require('underscore');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

 // var collectData = function(err,data){
 //    var chunk = "";
 //    this.on('data',function(){
 //      chunk += data;
 //    });
 //    return chunk;

 // };
 //

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
<<<<<<< HEAD

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, function(err, sites) {
    sites = sites.toString().split('\n');
    if( callback ){
      callback(sites);
    }
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(sites) {
    console.log("reading list of URLs");
    var found = _.any(sites, function(site, i) {
      return site.match(url)
    });
    callback(found);
  });
};

exports.addUrlToList = function(url, callback){
  // We will append submitted sites here
  fs.appendFile(exports.paths.list, url+'\n', function(err, file){
    callback();
  });
};

exports.isUrlArchived = function(url, callback){
  var sitePath =  path.join(exports.paths.archivedSites, url);

  fs.exists(sitePath, function(exists) {
    callback(exists);
  });
=======
var content = {};
exports.readListOfUrls = function(){
  //read data into a variable called content
  //send data to request-handler
  //process content into an array with each element being a web address

  fs.readFile(paths.archivedSites, "utf-8",function (err, data) {
    if (err) throw err;
    var temp = data.split("\n");
    for(var i = 0; i < temp.length; i++){
      content[temp[i]] = true;
    }

    //console.log("here is content: ",content);
  });
  return data;

};

exports.isUrlInList = function(target){
  //search our content array to find the target
  readListOfUrls();
  if(content.hasOwnProperty(target)){
    return true;
  }else{
    return false;
  }
};

exports.addUrlToList = function(textToAdd){
  //write to our text file a new line with the target
  fs.appendFile(paths.archivedSites, "\n"+textToAdd, function (err) {
    if (err) throw err;
    //console.log('It\'s saved!');
  });

};

exports.isURLArchived = function(){
  //checks if content website data is saved in file
  //
>>>>>>> master
};

exports.downloadUrls = function(){
  //scraping url and adding to archive
};

exports.goIntoFileAndReadIt = function(p, callback){
  //var p = exports.paths.archivedSites + fileName;
  // Open the file

  fs.open(p,'r+', function(){
    fs.readFile(p, "utf-8",function (err, data) {

      if (err) throw err;
      if(data){
        console.log("this is data");
        callback(data);

      }
    });
  });
};

exports.sendRedirect = function(response, location, status){
  status = status || 302;
  response.writeHead(status, {Location: location});
  response.end();
};




