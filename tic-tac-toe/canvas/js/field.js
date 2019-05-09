class Field {

    constructor( game, size ) {
        
        this.game = game;

        this.size = size;
        this.cells = [];

        this.init();

    }

    init() {

        for( let i = 0; i < this.size; i++ ) {

            this.cells[ i ] = [];

            for( let j = 0; j < this.size; j++ ) {
                
                this.cells[ i ][ j ] = new Cell();

            }

        }

    }

    draw( ctx ) {

        let gridWidth = 10;

        let gridoffsetX = ctx.canvas.width / this.size;

        ctx.fillStyle = "black";

        for( let i = 1; i < this.size; i++ ) {

            ctx.fillRect(
                gridoffsetX * i - gridWidth / 2,
                this.game.topBarHeight,
                gridWidth,
                ctx.canvas.height - this.game.topBarHeight,
            );

        }

        let gridoffsetY = ( ctx.canvas.height - this.game.topBarHeight ) / this.size;

        for( let i = 1; i < this.size; i++ ) {

            ctx.fillRect(
                0,
                this.game.topBarHeight + gridoffsetY * i - gridWidth / 2,
                ctx.canvas.width,
                gridWidth,
            );

        }

        for( let i = 0; i < this.size; i++ )  {

            for( let j = 0; j < this.size; j++ ) {

                let x = gridoffsetX * i + gridoffsetX / 2;
                let y = this.game.topBarHeight + gridoffsetY * j + gridoffsetY / 4 * 3;

                this.cells[ i ][ j ].draw( ctx, x, y );

            }

        }

    }

}