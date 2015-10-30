// What about chaining the results?

var ourResult = true;

var promise = new Promise(function (resolve, reject){
  if ( ourResult ) { resolve(10) }
  else { reject(':(') }
});

var successFn = function (message) { console.log('Success:', message); return message; };
var errorFn = function (message) { console.log('Error:', message) };

promise.then(successFn, errorFn).
        then(function(result) {
          var product = result * 10;
          console.log('Multiply by 10:', product);
          return product;
        });
