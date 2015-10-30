// A Request Example...

var request = require('request');
var hackerNewsPromise = new Promise(function (resolve, reject) {
  request('http://news.ycombinator.com', function (error, response, body) {
    if ( error ) { reject('Blew up.'); }
    if ( response && response.statusCode == 200 ) {
      resolve('It Worked!');
    } else {
      reject('Something happened...');
    }
  });
});

hackerNewsPromise.then(function (success) {
  console.log('Success:', success);
}, function (error) {
  console.log('Error:', error);
});
