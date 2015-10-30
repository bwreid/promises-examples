// An initial example

var ourResult = true;

var promise = new Promise(function (resolve, reject){
  if ( ourResult ) { resolve('It Worked!') }
  else { reject(':(') }
});

promise.then(function (result) {
  console.log('Result:', result);
});

// Why doesn't anything return when ourResult is false?