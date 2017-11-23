//

/**
 * Object.create()
 *
 *
 */

// Classical inheritance with Object.create()
function classicalInher() {
    // Shape - superclass
    function Shape() {
        this.x = 0;
        this.y = 0;
    }

    // superclass method
    Shape.prototype.move = (x, y) => {
        this.x += x;
        this.y += y;
        console.info('Shape moved to ' + x + ', ' + y);
    }

    // Rectangle - subclass
    function Rectangle() {
        console.log(this);
        Shape.call(this); // call super constructor
    }

    // subclass extends superclass
    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;

    var rect = new Rectangle();

    console.log('Is rect an instance of Rectangle?',
              rect instanceof Rectangle); // true
    console.log('Is rect an instance of Shape?',
              rect instanceof Shape); // true
    rect.move(1, 1); // Outputs, 'Shape moved.'
}
classicalInher();
