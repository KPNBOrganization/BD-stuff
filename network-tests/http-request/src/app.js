var express = require( 'express' );
var app = express();

app.get( '/resource', function( req, res ) {
    res.send( 'Hello, World' );
} );

app.use( express.static( 'public' ) );

app.listen( 3000, function() {
    console.log( 'App is listening on post 3000!' );
} );