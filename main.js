// Super Real, Chained Promise Example...

var request = require('request');
var cheerio = require('cheerio');
var badRequest = 'thiswillnotwork';
var badUrl = 'http://news.ycombinator.com/astupidpage';
var goodUrl = 'http://news.ycombinator.com';

var requestPromise = function (url, keyword, result) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, response, body) {
      if ( error ) { reject('Blew up.'); }

      if ( response ) {
        $ = cheerio.load(body);
        var title = $('td.title a').first().text();
        var hasJavascript = title.match(keyword);        
      }

      if ( response && hasJavascript ) {
        res = ( result ) ? result + '!' : 'It Worked!';
        resolve(res);
      } else {
        reject('Something happened...');
      }
    });
  });
}

var keyword = 'Show';
var goodHackerNewsPromise = function (str) { return requestPromise(goodUrl, keyword, str) };
var badHackerNewsPromise = function (str) { return requestPromise(badRequest, keyword, str) };

goodHackerNewsPromise(). 
then(function (successStr) {
  console.log('1. Good Promise:', successStr);
  return goodHackerNewsPromise(successStr);
}).then(function (successStr) {
  console.log('2. Good Promise:', successStr);
  return goodHackerNewsPromise(successStr);
}).then(function (successStr) {
  console.log('3. Good Promise:', successStr);
  return badHackerNewsPromise(successStr); // bad one!
}).then(function (successStr) {
  console.log('4. Good Promise:', successStr);
}).catch(function (error) {
  console.log('Some problem:', error);
});