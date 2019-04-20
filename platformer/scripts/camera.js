class Camera {

    constructor( renderer ) {

        this.renderer = renderer;

        this.positionX = 0.00;
        this.positionY = 0.00;

    }

    update( player ) {

        // Offsets

        let offsetX = ( this.renderer.canvasWidth ) / 2;
        let offsetY = ( this.renderer.canvasHeight ) / 2;

        this.positionX = player.positionX - offsetX;
        this.positionY = player.positionY - offsetY;

    }

}