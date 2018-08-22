
function *foo() {
	var stop = yield 321;
	console.log(yield stop);
}

var G = foo();

console.log(G.next());
console.log(G.next('bar'));
console.log(G.next(123));
