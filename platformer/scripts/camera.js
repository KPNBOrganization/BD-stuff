class Camera {

    constructor( renderer ) {

        this.renderer = renderer;

        this.positionX = 0.00;
        this.positionY = 0.00;

    }

    update( player ) {

        // Offsets

        let offsetX = ( this.renderer.canvasWidth + player.width ) / 2;
        let offsetY = ( this.renderer.canvasHeight + player.height ) / 2;

        this.positionX = player.positionX - offsetX;
        this.positionY = player.positionY - offsetY;

    }

}