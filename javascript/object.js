'use strict'

/**
 * Object.assign(target, ...sources)
 *
 * Parameters
 *  target: The target object
 *  sources: This source object(s)
 * Return value
 *  The return object
 *
 * Description
 *  Properties in the target object will be overwritten by properties in the sources if they have the same key.
 *  Later sources' properties will similarly overwrite earlier ones
 *
 *  The Object.assign() method only copies enumerable and own properties from a source object to a
 *  target object. It uses [[Get]] on the source and [[Set]] on the target, so it will invoke getters
 *  and setters. Therefore it assigns properties versus just copying or defining new properties. This
 *  may make it unsuitable for merging new properties into a prototype if the merge sources contain getters.
 *  For copying property definitions, including their enumerability, into prototypes Object.getOwnPropertyDescriptor()
 *  and Object.defineProperty() should be used instead.
 *
 *  Both String and Symbol properties are copied.
 *
 *  In case of an error, for example if a property is non-writable, a TypeError will be raised, and the target object can be changed if any properties are added before error is raised.
 *
 *  Note that Object.assign() does not throw on null or undefined source values.
 *
 */

// Cloning an object
function foo() {
    var obj = {a: 1};
    var obj2 = {b: 2};
    console.log(Object.assign({}, obj, obj2)); // { a: 1, b: 2 }
    console.log(Object.assign({}, [obj, obj2])); // { '0': { a: 1 }, '1': { b: 2 } }
    console.log(Object.assign([], obj)); // [ a: 1 ]
    console.log(Object.assign([], obj, obj2)); // [ a: 1, b: 2 ]
    console.log(Object.assign(String, obj)); // { [Function: String] a: 1 }
}

// Warning for Deep Clone
function test() {
    let obj1 = {a: 0, b: {c: 0}};
    let obj2 = Object.assign({}, obj1);
    console.log(obj2); // { a: 0, b: { c: 0 } }

    obj1.a = 1;
    console.log(obj1); // { a: 1, b: { c: 0 } }
    console.log(obj2); // { a: 0, b: { c: 0 } }

    obj2.a = 2;
    console.log(obj1); // { a: 1, b: { c: 0 } }
    console.log(obj2); // { a: 2, b: { c: 0 } }

    // Deep Clone
    obj1 = {a: 0, b: {c: 0}};
    let obj3 = JSON.parse(JSON.stringify(obj1));
    obj1.a = 4;
    obj1.b.c = 4;
    console.log(obj1); // { a: 4, b: { c: 4 } }
    console.log(obj3); // { a: 0, b: { c: 0 } }
}
//test();

// Merging objects
function merge() {
    var o1 = {a: 1};
    var o2 = {b: 2};
    var o3 = {c: 3};
    var obj = Object.assign(o1, o2, o3);
    console.log(o1); // { a: 1, b: 2, c: 3 }
    console.log(o2); // { b: 2 }
    console.log(obj); // { a: 1, b: 2, c: 3 }
}
//merge();

// Copying symbol-typed properties
function symb() {
    var o1 = {a: 1};
    var o2 = {[Symbol('foo')]: 2};
    var obj = Object.assign({}, o1, o2);
    console.log(obj); // { a: 1, [Symbol(foo)]: 2 } (cf. bug 1207182 on Firefox)
    console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(foo) ]
}
//symb();

// Properties on the prototype chain and non-enumerate properties cannot be copied
function chain() {
    var obj = Object.create(
        {
            foo: 1 // foo is an obj's prototype chain
        },
        {
            bar: {
                value: 2 // bar is a non-enumerable property
            },
            baz: {
                value: 3,
                enumerable: true // baz is an own enumerate property
            }
        }
    );
    var copy = Object.assign({}, obj);
    console.log(copy); // { baz: 3 }
}
//chain();

// Primitives will be wrapped to objects
function primi() {
    var v1 = 'abc';
    var v2 = true;
    var v3 = 10;
    var v4 = Symbol('foo');
    var obj = Object.assign({}, v1, null, v2, undefined, v3, v4);
    // Primitives will be warpped, null and undefined wil be ignored
    // Note, only string wrappers can have own enumerable properties
    console.log(obj); // { '0': 'a', '1': 'b', '2': 'c' }
}
//primi();

// Exceptions will interrupt the ongoing copying task
function inter() {
    var target = Object.defineProperty({}, 'foo', {
        value: 1,
        writable: false
    }); // target.foo is a read-only property

    try {
        Object.assign(target, { bar: 2 }, { foo2: 3, foo: 3, foo3: 3 }, { baz: 4 });
    } catch (err){
        console.error(err);
    }
    // TypeError: "foo" is read-only
    // The Exception is thrown when assigning target.foo

    console.log(target.bar);  // 2, the first source was copied successfully.
    console.log(target.foo2); // 3, the first property of the second source was copied successfully.
    console.log(target.foo);  // 1, exception is thrown here.
    console.log(target.foo3); // undefined, assign method has finished, foo3 will not be copied.
    console.log(target.baz);  // undefined, the third source will not be copied either.
}
//inter();

// Copying accessors
function accessors() {
    var obj = {
        foo: 1,
        get bar() {
            return 2;
        }
    };

    var copy = Object.assign({}, obj);
    //console.log(copy); // { foo: 1, bar: 2 }, the value of  copy.bar is obj.bar's getter's return value

    // This is an assign function that copies full descriptors
    function completeAssign(target, ...sources) {
        sources.forEach(source => {
            let descriptors = Object.keys(source).reduce((descriptors, key) => {
                descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
                return descriptors;
            }, {});
            console.log(descriptors);
            /**
             *{ foo: { value: 1, writable: true, enumerable: true, configurable: true },
             *  bar:
             *   { get: [Function: get bar],
             *     set: undefined,
             *     enumerable: true,
             *     configurable: true } }
             *
             */

            // by default, Object.assign copies enumerable Symbols too
            console.log(Object.getOwnPropertySymbols(source)); //
            Object.getOwnPropertySymbols(source).forEach(sym => {
                let descriptor = Object.getOwnPropertyDescriptor(source, sym);
                if (descriptor.enumerable) {
                    descriptors[sym] = descriptor;
                }
            });

            Object.defineProperties(target, descriptors);
        });
        return target;
    }

    var copy = completeAssign({}, obj);
    console.log(copy); // { foo: 1, bar: [Getter] }
}
//accessors();

// Polyfill
// This polyfill doesn't support symbol properties, since ES5 doesn't have symbols anyway:
function polyfill() {
    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) { // .length of function is 2
                'use strict';
                if (target == null) { // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }
                var to = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];
                    if (nextSource != null) { // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
                return to;
            },
            writable: true,
            configurable: true
        });
    }
}
