// An initial example

// var ourResult = true;

// var promise = new Promise(function (resolve, reject){
//   if ( ourResult ) { resolve('It Worked!') }
//   else { reject(':(') }
// });

// promise.then(function (result) {
//   console.log('Result:', result);
// });

// Why doesn't anything return when ourResult is false?

// var ourResult = false;

// var promise = new Promise(function (resolve, reject){
//   if ( ourResult ) { resolve('It Worked!') }
//   else { reject(':(') }
// })

// promise.then(function (result) {
//   console.log('Result:', result);
// }, function (error) {
//   console.log('Error:', error);
// });

// Another way to write that would be...

// var ourResult = true;

// var promise = new Promise(function (resolve, reject){
//   if ( ourResult ) { resolve('It Worked!') }
//   else { reject(':(') }
// });

// var successFn = function (message) { console.log('Success:', message); };
// var errorFn = function (message) { console.log('Error:', message); };

// promise.then(successFn, errorFn);

// What about chaining the results?

// var ourResult = true;

// var promise = new Promise(function (resolve, reject){
//   if ( ourResult ) { resolve(10) }
//   else { reject(':(') }
// });

// var successFn = function (message) { console.log('Success:', message); return message; };
// var errorFn = function (message) { console.log('Error:', message) };

// promise.then(successFn, errorFn).
//         then(function(result) {
//           var product = result * 10;
//           console.log('Multiply by 10:', product);
//           return product;
//         });

// What about breaking the chain?

// var ourResult = true;

// var promise = new Promise(function (resolve, reject){
//   if ( ourResult ) { resolve(10) }
//   else { reject(':(') }
// });

// var successFn = function (message) {
//   console.log('Success:', message);
//   return message;
// };
// var errorFn = function (message) {
//   console.log('Error:', message)
// };
// var multiplyBy10 = function (result) {
//   var product = result * 10;
//   console.log('multiplying...', product);
//   return product;
// }
// var badMultiplyBy10 = function (result) {
//   console.log('This fn is on fire.');
//   throw 'Boom!';
// }

// promise.then(successFn).
//         then(multiplyBy10).
//         then(badMultiplyBy10).
//         then(multiplyBy10).
//         catch(errorFn). // What do we expect this to return?
//         then(multiplyBy10).
//         then(successFn). // What about this?
//         catch(errorFn);

// A Request Example...

// var request = require('request');
// var hackerNewsPromise = new Promise(function (resolve, reject) {
//   request('http://news.ycombinator.com', function (error, response, body) {
//     if ( error ) { reject('Blew up.'); }
//     if ( response && response.statusCode == 200 ) {
//       resolve('It Worked!');
//     } else {
//       reject('Something happened...');
//     }
//   });
// });

// hackerNewsPromise.then(function (success) {
//   console.log('Success:', success);
// }, function (error) {
//   console.log('Error:', error);
// });

// Even Realer Example...

// var request = require('request');
// var cheerio = require('cheerio');
// var myKeyword = 'Twitch';
// var url = 'http://news.ycombinator.com';

// var hackerNewsPromise = new Promise(function (resolve, reject) {
//   console.log(url);
//   var keyword = myKeyword;
  
//   request(url, function (error, response, body) {
//     if ( error ) { reject('Blew up.'); }
    
//     console.log('looking for the word', keyword);
    
//     if ( response ) {
//       $ = cheerio.load(body);
//       var title = $('td.title a').first().text();
//       var hasJavascript = title.match(keyword);      
//     }

//     if ( hasJavascript ) {
//       resolve('It Worked!');
//     } else {
//       reject('Could not find keyword '+keyword +'. :(');
//     }
//   });
// });

// hackerNewsPromise.then(function (success) {
//   console.log('Success:', success);
// }, function (error) {
//   console.log('Error:', error);
// });

// Super Real, Chained Promise Example...

// var request = require('request');
// var cheerio = require('cheerio');
// var badRequest = 'thiswillnotwork';
// var badUrl = 'http://news.ycombinator.com/astupidpage';
// var goodUrl = 'http://news.ycombinator.com';

// var requestPromise = function (url, keyword, result) {
//   return new Promise(function (resolve, reject) {
//     request(url, function (error, response, body) {
//       if ( error ) { reject('Blew up.'); }

//       if ( response ) {
//         $ = cheerio.load(body);
//         var title = $('td.title a').first().text();
//         var hasJavascript = title.match(keyword);        
//       }

//       if ( response && hasJavascript ) {
//         res = ( result ) ? result + '!' : 'It Worked!';
//         resolve(res);
//       } else {
//         reject('Something happened...');
//       }
//     });
//   });
// }

// var keyword = 'Show';
// var goodHackerNewsPromise = function (str) { return requestPromise(goodUrl, keyword, str) };
// var badHackerNewsPromise = function (str) { return requestPromise(badRequest, keyword, str) };

// goodHackerNewsPromise(). 
// then(function (successStr) {
//   console.log('1. Good Promise:', successStr);
//   return goodHackerNewsPromise(successStr);
// }).then(function (successStr) {
//   console.log('2. Good Promise:', successStr);
//   return goodHackerNewsPromise(successStr);
// }).then(function (successStr) {
//   console.log('3. Good Promise:', successStr);
//   return badHackerNewsPromise(successStr); // bad one!
// }).then(function (successStr) {
//   console.log('4. Good Promise:', successStr);
// }).catch(function (error) {
//   console.log('Some problem:', error);
// });