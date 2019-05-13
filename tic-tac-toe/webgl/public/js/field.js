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
                
                this.cells[ i ][ j ] = new Cell( this );

            }

        }

    }

    draw( ctx ) {

        let gridWidth = 10;

        let gridoffsetX = ctx.canvas.width / this.size;

        for( let i = 1; i < this.size; i++ ) {

            this.game.renderer.drawRect(
                -ctx.canvas.width / 2 + gridoffsetX * i - gridWidth / 2, 
                -ctx.canvas.height / 2 - 2 * this.game.topBarHeight, 
                gridWidth, 
                ctx.canvas.height + this.game.topBarHeight, 
                [ 0, 0, 0, 255 ] 
            );

        }

        let gridoffsetY = ( ctx.canvas.height - this.game.topBarHeight ) / this.size;

        for( let i = 1; i < this.size; i++ ) {

            this.game.renderer.drawRect(
                -ctx.canvas.width / 2,
                ctx.canvas.height / 2 - ( this.game.topBarHeight + gridoffsetY * i - gridWidth / 2 ),
                ctx.canvas.width,
                gridWidth,
                [ 0, 0, 0, 255 ] 
            );

        }

        for( let i = 0; i < this.size; i++ )  {

            for( let j = 0; j < this.size; j++ ) {

                let x = -ctx.canvas.width / 2 + gridoffsetX * i + gridoffsetX / 2;
                let y = ctx.canvas.height / 2 - ( this.game.topBarHeight + gridoffsetY * j + gridoffsetY / 4 * 3 );

                this.cells[ i ][ j ].draw( ctx, x, y );

            }

        }

    }

}