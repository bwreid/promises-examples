// Even Realer Example...

var request = require('request');
var cheerio = require('cheerio');
var myKeyword = 'Twitch';
var url = 'http://news.ycombinator.com';

var hackerNewsPromise = new Promise(function (resolve, reject) {
  console.log(url);
  var keyword = myKeyword;
  
  request(url, function (error, response, body) {
    if ( error ) { reject('Blew up.'); }
    
    console.log('looking for the word', keyword);
    
    if ( response ) {
      $ = cheerio.load(body);
      var title = $('td.title a').first().text();
      var hasJavascript = title.match(keyword);      
    }

    if ( hasJavascript ) {
      resolve('It Worked!');
    } else {
      reject('Could not find keyword '+keyword +'. :(');
    }
  });
});

hackerNewsPromise.then(function (success) {
  console.log('Success:', success);
}, function (error) {
  console.log('Error:', error);
});