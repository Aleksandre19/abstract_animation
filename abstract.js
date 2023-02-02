const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

// Convert dgree to radian
// Formula is: PI * r = 180 degrees
const randomRange = (min, max) => {
    return Math.random() * (max - min) + min;
}


// Shape type
class Point{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Calculate the hypotenuse by Pythagorean theorem
    getDistance(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}


class Shape{
    constructor(x, y) {
        this.cordinate = new Point(x, y);

        // Speed by which the points moves.
        this.velocity = new Point(randomRange(-1, 1), randomRange(-1, 1))
        this.radius = randomRange(1, 6);
    }

    // Move the point.
    update() {
        this.cordinate.x += this.velocity.x;
        this.cordinate.y += this.velocity.y;
    }

    // When the points reaches to the edges so
    // bouncing them back.
    bounce() {
        if (this.cordinate.x <= 0 || this.cordinate.x >= width) this.velocity.x *= -1;
        if (this.cordinate.y <= 0 || this.cordinate.y >= height) this.velocity.y *= -1;
    }


    draw(context) {
        context.save();
        context.translate(this.cordinate.x, this.cordinate.y);

        context.fillStyle = '#e2d3fa';
            
        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2);
        context.fill();
        
        context.restore();
    }
}


const skatch = (width, height) => {

    const shapes = [];
    const shapeQuantity = 40;

    // Create shapes.
    for (let i = 0; i < shapeQuantity; i++) {
        const x = randomRange(0, width);
        const y = randomRange(0, height);
        
        shapes.push(new Shape(x, y))
    }

    const animate = () => {

        // Clear canvas after each frame.
        context.clearRect(0, 0, width, height)
        
        // Get a one point.
        for (let i = 0; i < shapes.length; i++) {
            point1 = shapes[i];

            // Get another point.
            for (let j = i + 1; j < shapes.length; j++){
                point2 = shapes[j];

                // Get the distance of the hypotenuse.
                const dist = point1.cordinate.getDistance(point2.cordinate);
                if (dist > 200) continue;

                context.lineWidth = 0.6;
                context.strokeStyle = '#c49ae1';

                context.beginPath();
                context.moveTo(point1.cordinate.x, point1.cordinate.y);
                context.lineTo(point2.cordinate.x, point2.cordinate.y);
                context.stroke();
            }
        }

        // Call the necessary methods for each point.
        shapes.forEach(shape => {
            shape.update();
            shape.draw(context); 
            shape.bounce()
        });

        requestAnimationFrame(animate);
    }
    
   animate();
    
}

skatch(width, height);

