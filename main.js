// Why doesn't anything return when ourResult is false?

var ourResult = false;

var promise = new Promise(function (resolve, reject){
  if ( ourResult ) { resolve('It Worked!') }
  else { reject(':(') }
})

promise.then(function (result) {
  console.log('Result:', result);
}, function (error) {
  console.log('Error:', error);
});