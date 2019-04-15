class Renderer {
    
    constructor( ctx, canvas ) {

        this.ctx = ctx;

        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;

        this.lastFrameTime = Date.now();
        this.currentFrameTime = Date.now();
        this.deltaTime = ( this.currentFrameTime - this.lastFrameTime ) / 1000;

        this.camera = new Camera( this );
        this.level = new Level( this );

    }

    clearScreen() {

        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect( 0, 0, this.canvasWidth, this.canvasHeight );

    }

    update() {

        this.currentFrameTime = Date.now();
        this.deltaTime = ( this.currentFrameTime - this.lastFrameTime ) / 1000;
        this.lastFrameTime = this.currentFrameTime;

        this.level.update();

    }

    draw() {

        this.clearScreen();
        this.level.draw();

    }

    loop() {

        this.update();
        this.draw();

        window.requestAnimationFrame( () => this.loop() );
        
    }

}