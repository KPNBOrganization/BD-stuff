var app = require( 'express' )();
var http = require( 'http' ).Server( app );
var io = require('socket.io')( http );

app.get( '/', function( req, res ) {
    res.sendFile( __dirname + '/index.html' );
} );

io.on( 'connection', function( socket ) {

    console.log( 'Connection established' );

    socket.on( 'disconnect', function() {
        console.log( 'Connection closed' );
    } );

    socket.on( 'resource', function( msg ) {
        io.emit( 'resource', 'Hello, World!' );
    } );

} );

http.listen( 3000, function() {
    console.log( 'App is listening on post 3000!' );
} );