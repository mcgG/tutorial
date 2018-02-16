var newObject = {};

var newObject = Object.create(Object.prototype);

var newObejct = new Object();


newObject.someKey = 'Hello World';
var value = newObject.someKey;

newObject['someKey'] = 'Hello World';
var value = newObject['someKey'];

Object.defineProperty(newObject, 'someKey', {
    value: "for more control of the propertu's behavior",
    writable: true,
    enumerable: true,
    configurable: true
});




var defineProp = function (obj, key, value) {
    var config = {
        value: value,
        writable: true,
        enumerable: true,
        configurable: true
    }
    Object.defineProperty(obj, key, config);
}
var person = Object.create(Object.prototype);
defineProp(person, 'car', 'Delorean');
defineProp(person, 'dateOfBirth', '1993');
defineProp(person, 'hasBeard', false);
console.log(person);



Object.defineProperties(newObject, {
    'someKey': {
        value: 'Hello World',
        writable: true
    },
    'anotherKey': {
        value: 'Foo Bar',
        writable: false
    }
});

// Create a race car driver that inherits from the person object

var driver = Object.create(person);
defineProp(driver, 'topSpeed', '100mph');
console.log(driver);
console.log(driver.dateOfBirth);
console.log(person.prototype)
console.log(person.__proto__)
console.log(Object.getOwnPropertyNames(driver));
console.log(driver.prototype);
console.log(driver.__proto__);





// Declaring methods via the prototype makes all objects share this method
// Some knowledge about using this vs prototype can refer to https://stackoverflow.com/questions/12180790/defining-methods-via-prototype-vs-using-this-in-the-constructor-really-a-perfo
function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
}
Car.prototype.toString = function() {
    return this.model + ' has done ' + this.miles + ' miles';
}
var civic = new Car('Honda', 2009, 20000);
var mondeo = new Car('Ford', 2010, 5000);
console.log(civic.toString());
console.log(mondeo.toString());


function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;

    this.toString = function() {
        return this.model + ' has done ' + this.miles + ' miles';
    }
}

var civic = new Car('Honda', 2009, 20000);
var mondeo = new Car('Ford', 2010, 5000);
console.log(civic.toString());
console.log(mondeo.toString());
