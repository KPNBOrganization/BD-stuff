class Obstacle {

    constructor( level, positionX, positionY, width, height ) {

        this.level = level;
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;

    }

    draw() {

        let positionX = this.positionX - this.level.renderer.camera.positionX; 
        let positionY = this.positionY - this.level.renderer.camera.positionY; 

        this.level.renderer.ctx.fillStyle = '#ff0000';
        this.level.renderer.ctx.fillRect( 
            positionX, 
            this.level.renderer.canvasHeight - this.height - positionY, 
            this.width, 
            this.height 
        );

    }

}