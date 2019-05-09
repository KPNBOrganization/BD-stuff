const STATE_EMPTY = 0;
const STATE_CROSS = 1;
const STATE_ZERO = 2;

class Cell {

    constructor( element ) {

        this.element = element;
        this.state = STATE_EMPTY;

    }

    update( player ) {
        
        var textElement = this.element.querySelector( 'text' );

        textElement.setAttribute( 'fill', ( player == PLAYER_CROSS ? 'red' : 'blue' ) );
        textElement.textContent = ( player == PLAYER_CROSS ? 'X' : '0' );
        
        this.state = ( player == PLAYER_CROSS ? STATE_CROSS : STATE_ZERO );

    }

}