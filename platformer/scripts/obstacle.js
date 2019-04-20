class Obstacle {

    constructor( level, positionX, positionY, width, height ) {

        this.level = level;
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;

        // this.isMoving = false;

    }

    draw() {

        let positionX = this.positionX - this.level.renderer.camera.positionX; 
        let positionY = this.positionY - this.level.renderer.camera.positionY; 

        this.level.renderer.ctx.fillStyle = '#ffc72f';
        this.level.renderer.ctx.fillRect( 
            positionX, 
            this.level.renderer.canvasHeight - this.height - positionY, 
            this.width, 
            this.height 
        );

    }

}