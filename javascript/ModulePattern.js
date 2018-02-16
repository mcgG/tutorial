var testModule = (function () {

    var counter = 0;

    return {
        incrementCounter: function() {
            return counter++;
        },
        resetCounter: function() {
            console.log('counter value prior to reset: ' + counter);
            counter = 0;
        }
    }

});

tm = new testModule();
tm.incrementCounter();
tm.resetCounter();


var myNamespace = (function (){
    var myPrivateVar, myPrivateMethod;

    myPrivateVar = 0;
    myPrivateMethod = function(foo) {
        console.log(foo);
    }

    return {
        myPublicVar: 'foo',
        myPublicFunction: function(bar) {
            myPrivateVar++;
            myPrivateMethod(bar);
        }
    }
})();

myNamespace.myPublicFunction('Hello World')
console.log(myNamespace.myPublicVar);
