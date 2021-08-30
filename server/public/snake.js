class Snake { 

    constructor(size) {
        this.size = size;

        this.thickness = 5;
        this.colour = '#000000';

        this.ropeLength = 918 / 40;

        this.points = [];
        
        for (let i = 0; i < 20; i++)
        {
            this.points.push(new PIXI.Point(i * this.ropeLength, 0));
        }

        this.body = new PIXI.SimpleRope(PIXI.Texture.from('/assets/snake.png'), this.points);

        this.snakeContainer = new PIXI.Container();
        this.snakeContainer.scale.set(0.3)
        this.snakeContainer.position.x = 250/8
        this.snakeContainer.position.y = 250
        this.snakeContainer.addChild(this.body)
        this.snakeContainer = this.body;
    }


    draw(){
        this.points[this.points.length-1].y += 0;
    }

    moveTowards(x, y, delta){
        let mousePos = {x: x, y: y}
        //console.log(mousePos);
        //console.log(this.points[this.points.length-1].x)
        // let distance = Math.sqrt(
        //     Math.pow(mousePos.x - this.points[this.points.length-1].x, 2) +
        //     Math.pow(mousePos.y - this.points[this.points.length-1].y, 2) 
        // )
        // let v = {
        //     x:  (mousePos.x - this.points[this.points.length-1].x)/distance,
        //     y: (mousePos.y - this.points[this.points.length-1].y)/distance
        // }
        let speed = 45
        let toMouse = this.nrm(
            mousePos, this.points[this.points.length-1],
            this.dst(mousePos, this.points[this.points.length-1])
        );
        this.points[this.points.length-1].x += toMouse.x;
        this.points[this.points.length-1].y += toMouse.y;
        
        for (let i = this.points.length-1; i >= 0; i--) {
            if(i < this.points.length - 1) {
                let dis = this.dst(this.points[i+1], this.points[i])
                if(dis > 50){
                    let toPoint = this.nrm(
                        this.points[i+1], this.points[i],
                       dis
                    );
                    this.points[i].x += toPoint.x * speed * delta          
                    this.points[i].y += toPoint.y * speed * delta
                }
     
            }
        }
        //console.log(distance);

    }


    dst(v1, v2){
        let distance = Math.sqrt(
            Math.pow(v1.x - v2.x, 2) +
            Math.pow(v1.y - v2.y, 2) 
        )
        return distance
    }

    nrm(v1, v2, d) {
        let v = {
            x:  (v1.x - v2.x)/d,
            y:  (v1.y - v2.y)/d
        }
        return v
    }
}

export { Snake }