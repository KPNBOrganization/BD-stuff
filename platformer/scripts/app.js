window.onload = function() {

    var canvas = document.getElementById( 'canvas' );
    var ctx = canvas.getContext( '2d' );

    var renderer = new Renderer( ctx, canvas );
    
    renderer.loop();

    // const CANVAS_WIDTH = canvas.width;
    // const CANVAS_HEIGHT = canvas.height; 

    // const BOX_WIDTH = 20;
    // const BOX_HEIGHT = 20;

    // const KEY_W = 87;
    // const KEY_D = 68;
    // const KEY_S = 83;
    // const KEY_A = 65;
    // const KEY_SPACE = 32;

    // var boxPosX = 0.0;
    // var boxPosY = 0.0;
    // var boxVelocityX = 0.0;
    // var boxVelocityY = 0.0;
    // var boxOnGround = true;
    // var gravity = 20;

    // var lastFrameTime = Date.now();
    // var currentFrameTime;
    // var deltaTime;

    // Cleaning screen
    // function cleanScreen() {

    //     ctx.fillStyle = '#000000';
    //     ctx.fillRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );

    // }

    // function draw() {

    //     ctx.fillStyle = '#00ff00';
    //     ctx.fillRect( boxPosX, CANVAS_HEIGHT - BOX_HEIGHT - boxPosY, BOX_WIDTH, BOX_HEIGHT );

    // }

    // function update() {

    //     currentFrameTime = Date.now();
    //     deltaTime = ( currentFrameTime - lastFrameTime ) / 1000;
    //     lastFrameTime = currentFrameTime;

    //     boxVelocityY -= gravity;
    //     boxPosX += boxVelocityX * deltaTime;
    //     boxPosY += boxVelocityY * deltaTime;

    //     if( boxPosY < 0 ) {

    //         boxPosY = 0.0;
    //         boxVelocityY = 0.0;
    //         boxOnGround = true;

    //     }

    // }

    // function jump() {

    //     if( boxOnGround ) {

    //         boxVelocityY = 500.0;
    //         boxOnGround = false;

    //     }

    // }

    // function startMove( direction ) {

    //     boxVelocityX = direction * 500;

    // }

    // function endMove() {

    //     boxVelocityX = 0;

    // }

    // function render() {

    //     update();
    //     cleanScreen();
    //     draw();

    //     window.requestAnimationFrame( render );

    // }

    // window.addEventListener( 'keydown', ( event ) => {

    //     if( event.defaultPrevented ) {
    //         return;
    //     }
        
    //     switch( event.keyCode ) {

    //         case KEY_SPACE:
    //         case KEY_W:
    //             jump();
    //         break;

    //         case KEY_D:
    //             startMove( 1.0 );
    //         break;

    //         case KEY_S:
            
    //         break;

    //         case KEY_A:
    //             startMove( -1.0 );
    //         break;

    //     }

    // } );

    // window.addEventListener( 'keyup', ( event ) => {

    //     if( event.defaultPrevented ) {
    //         return;
    //     }

    //     switch( event.keyCode ) {

    //         case KEY_D:
    //         case KEY_A:
    //             endMove();
    //         break;

    //     }

    // } );

    // window.requestAnimationFrame( render );

};