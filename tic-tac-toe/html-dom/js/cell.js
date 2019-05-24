const STATE_EMPTY = 0;
const STATE_CROSS = 1;
const STATE_ZERO = 2;

class Cell {

    constructor( element ) {

        this.element = element;
        this.state = STATE_EMPTY;

    }

    update( player ) {

        this.element.innerHTML = ( player == PLAYER_CROSS ? 'X' : '0' );
        this.element.style.color = ( player == PLAYER_CROSS ? 'red' : 'blue' );
        
        this.state = ( player == PLAYER_CROSS ? STATE_CROSS : STATE_ZERO );

    }

}