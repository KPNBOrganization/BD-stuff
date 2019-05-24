class Field {

    constructor( game, size ) {
        
        this.game = game;

        this.size = size;
        this.cells = [];

        this.init();

    }

    init() {

        let field = document.getElementById( 'field' );

        let rows = field.getElementsByTagName( 'tr' );

        for( let i = 0; i < this.size; i++ ) {

            let cells = rows[ i ].getElementsByTagName( 'td' );

            this.cells[ i ] = [];

            for( let j = 0; j < this.size; j++ ) {

                cells[ j ].setAttribute( 'id', 'cell_' + i + '_' + j );
                cells[ j ].addEventListener( 'click', ( event ) => this.turnEventHandler( event.currentTarget ) );

                this.cells[ i ][ j ] = new Cell( cells[ j ] );

            }

        }

    }

    turnEventHandler( element ) {

        let elementid = element.id.split( '_' );
        let cell = this.cells[ elementid[ 1 ] ][ elementid[ 2 ] ];

        if( cell.state == STATE_EMPTY ) {

            cell.update( this.game.currentPlayer );

            this.game.update();

        }

    }

}