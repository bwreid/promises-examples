// What about breaking the chain?

var ourResult = true;

var promise = new Promise(function (resolve, reject){
  if ( ourResult ) { resolve(10) }
  else { reject(':(') }
});

var successFn = function (message) {
  console.log('Success:', message);
  return message;
};
var errorFn = function (message) {
  console.log('Error:', message)
};
var multiplyBy10 = function (result) {
  var product = result * 10;
  console.log('multiplying...', product);
  return product;
}
var badMultiplyBy10 = function (result) {
  console.log('This fn is on fire.');
  throw 'Boom!';
}

promise.then(successFn).
        then(multiplyBy10).
        then(badMultiplyBy10).
        then(multiplyBy10).
        catch(errorFn). // What do we expect this to return?
        then(multiplyBy10).
        then(successFn). // What about this?
        catch(errorFn);