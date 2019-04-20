var renderer = null;

window.onload = function() {

    var canvas = document.getElementById( 'canvas' );
    var ctx = canvas.getContext( '2d' );

    renderer = new Renderer( ctx, canvas );
    
    renderer.loop();

};