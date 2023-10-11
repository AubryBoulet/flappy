class sprite{
    constructor({position, color, size, velocity}) {
        this.position = position,
        this.color = color,
        this.size = size,
        this.velocity = velocity
    }
    draw(type){
        c.fillStyle = this.color;
        switch (type){
            case 'circle':
                c.beginPath();
                c.arc(this.position.x, this.position.y, this.size.width, this.size.height,Math.PI*2, false);
                c.fill();
                c.closePath();
                break
            case 'rect':
                c.beginPath();
                c.rect(this.position.x, this.position.y, this.size.width, this.size.height);
                c.fill();
                c.closePath();
                break
        }
    }
    update(type) {
        this.draw(type);
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

const player = new sprite({
    position:{
        x: canvas.width/4,
        y: canvas.height/2
    },
    color:'yellow',
    size:{
        width: 50,
        height: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const ground = new sprite({
    position:{
        x:0,
        y:canvas.height - 60
    },
    color:'brown',
    size:{
        width: canvas.width,
        height:60
    },
    velocity: {
        x:0,
        y:0
    }
    
})
const grass = new sprite({
    position:{
        x:0,
        y:canvas.height - 70
    },
    color:'green',
    size:{
        width: canvas.width,
        height:10
    },
    velocity: {
        x:0,
        y:0
    }
    
})