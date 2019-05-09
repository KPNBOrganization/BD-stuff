class Field {

    constructor( game, size ) {
        
        this.game = game;

        this.size = size;
        this.cells = [];

        this.init();

    }

    init() {

        var board = document.getElementById( 'board' );
        var topBar = document.getElementById( 'top-bar' );
        var grid = document.getElementById( 'grid' );

        var gridWidth = 10;

        var gridoffsetX = board.getBBox().width / this.size;

        for( let i = 1; i < this.size; i++ ) {

            let rect = this.createRect( 
                gridoffsetX * i - gridWidth / 2,
                topBar.getBBox().height,
                gridWidth,
                board.getBBox().height - topBar.getBBox().height,
                '#000000'
            );

            grid.appendChild( rect );

        }

        var gridoffsetY = ( board.getBBox().height - topBar.getBBox().height ) / this.size;

        for( let i = 1; i < this.size; i++ ) {

            let rect = this.createRect( 
                0,
                topBar.getBBox().height + gridoffsetY * i - gridWidth / 2,
                board.getBBox().width,
                gridWidth,
                '#000000'
            );

            grid.appendChild( rect );

        }

        for( let i = 0; i < this.size; i++ ) {

            this.cells[ i ] = [];

            for( let j = 0; j < this.size; j++ ) {

                var box = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );

                box.setAttribute( 'id', 'cell_' + i + '_' + j );
                box.setAttribute( 'class', 'playing-simbol' );
                box.setAttribute( 'x', gridoffsetX * i );
                box.setAttribute( 'y', topBar.getBBox().height + gridoffsetY * j );
                box.setAttribute( 'width', gridoffsetX );
                box.setAttribute( 'height', gridoffsetY );

                box.addEventListener( 'click', ( event ) => this.turnEventHandler( event.currentTarget ) );
                
                let text = document.createElementNS( 'http://www.w3.org/2000/svg', 'text' );

                text.setAttribute( 'x', '50%' );
                text.setAttribute( 'y', '50%' );
                text.setAttribute( 'text-anchor', 'middle' );
                text.setAttribute( 'dominant-baseline', 'central' );

                text.textContent = '';

                // To keep the svg size stable
                let rect = this.createRect(
                    0, 0, '100%', '100%', 'transparent'
                );

                box.appendChild( rect );
                box.appendChild( text );

                this.cells[ i ][ j ] = new Cell( box );

                grid.appendChild( box );

            }

        }

    }

    createRect( x, y, width, height, color ) {

        let rect = document.createElementNS( 'http://www.w3.org/2000/svg', 'rect' );

        rect.setAttribute( 'x', x );
        rect.setAttribute( 'y', y );
        rect.setAttribute( 'width', width );
        rect.setAttribute( 'height', height );
        rect.setAttribute( 'fill', color );

        return rect;

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