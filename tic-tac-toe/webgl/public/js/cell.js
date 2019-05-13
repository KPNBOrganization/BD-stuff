const STATE_EMPTY = 0;
const STATE_CROSS = 1;
const STATE_ZERO = 2;

class Cell {

    constructor( field ) {

        this.field = field;
        this.state = STATE_EMPTY;

    }

    update( player ) {
        
        this.state = ( player == PLAYER_CROSS ? STATE_CROSS : STATE_ZERO );

    }
    
    draw( ctx, x, y ) {

        if( this.state == STATE_CROSS ) {

            if( this.field.game.crossImage ) {

                this.field.game.renderer.drawImage(
                    x - 120 / 2, 
                    y,
                    120,
                    120,
                    this.field.game.crossImage
                );

            }

        } else if( this.state == STATE_ZERO ) {

            if( this.field.game.zeroImage ) {

                this.field.game.renderer.drawImage(
                    x - 120 / 2, 
                    y,
                    120,
                    120,
                    this.field.game.zeroImage
                );

            }

        }

    }

}