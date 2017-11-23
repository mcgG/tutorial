var self = this
var m = {
    foo: function foo() {
        console.log(self === global)
        console.log(typeof this)
        console.log(typeof global)
        console.log(this === global)
        var fooThis = this
        function sub() {
            console.log(this === fooThis)
        }
        sub()
    },

    name: 'm'
}

var objs = Object.getOwnPropertyNames(m)
objs.forEach(function(obj) {
    //console.log(typeof m[obj]);
});

function test(o) {
    m['output'] = '123';
}


test(m)

console.log(m.output)
