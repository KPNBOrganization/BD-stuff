const STATE_EMPTY = 0;
const STATE_CROSS = 1;
const STATE_ZERO = 2;

class Cell {

    constructor() {

        this.state = STATE_EMPTY;

    }

    update( player ) {
        
        this.state = ( player == PLAYER_CROSS ? STATE_CROSS : STATE_ZERO );

    }
    
    draw( ctx, x, y ) {

        ctx.font = "130px 'Comic Sans MS'";
        ctx.textAlign = "center";

        if( this.state == STATE_CROSS ) {

            ctx.fillStyle = "red";
            ctx.fillText( "X", x, y );

        } else if( this.state == STATE_ZERO ) {

            ctx.fillStyle = "blue";
            ctx.fillText( "0", x, y );

        }

    }

}