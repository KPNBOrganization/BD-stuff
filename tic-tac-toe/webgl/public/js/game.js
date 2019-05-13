const FIELD_SIZE = 3;

const PLAYER_CROSS = 1;
const PLAYER_ZERO = 2;

const GAME_CONDITION_DRAW = 1;
const GAME_CONDITION_CROSS = 2;
const GAME_CONDITION_ZERO = 3;

class Game {

    constructor() {    

        this.currentPlayer = PLAYER_CROSS;

        this.crossScore = 0;
        this.zeroScore = 0;

        this.turnsNum = 0;

        this.boardImage = null;
        
        this.loadBoardImage();

        this.zeroImage = null;
        this.loadZeroImage();

        this.crossImage = null;
        this.loadCrossImage();

        this.topBarHeight = 100;

        this.winner = false;
        this.winnerModalVisible = false;

        let canvas = document.getElementById( 'canvas' );

        canvas.addEventListener( 'click', ( event ) => this.mainClickHandler( event ) );

        this.ctx = canvas.getContext( 'webgl', { premultipliedAlpha: false } );

        this.ctx.clearColor( 0.0, 0.0, 0.0, 1.0 );
        // this.ctx.enable( this.ctx.DEPTH_TEST );
        // this.ctx.depthFunc( this.ctx.LEQUAL );
        this.ctx.enable( this.ctx.BLEND );
        this.ctx.blendFunc( this.ctx.SRC_ALPHA, this.ctx.ONE_MINUS_SRC_ALPHA );
        this.ctx.clear( this.ctx.COLOR_BUFFER_BIT | this.ctx.DEPTH_BUFFER_BIT );

        this.renderer = new Renderer( this.ctx, canvas );

        this.field = new Field( this, FIELD_SIZE );

    }

    loop() {

        this.draw();

        window.requestAnimationFrame( () => this.loop() );

    }

    draw() {

        if( this.boardImage ) {

            this.renderer.drawImage( 
                -this.ctx.canvas.width / 2, 
                -this.ctx.canvas.height / 2, 
                this.ctx.canvas.width, 
                this.ctx.canvas.height, 
                this.boardImage
            );

        }

        this.drawScore();

        this.field.draw( this.ctx );

        if( this.winnerModalVisible ) {

            this.drawWinnerModal();

        }

    }

    loadBoardImage() {

        let image = new Image();

        image.onload = () => { this.boardImage = image; };
        image.src = 'images/paper.png'; 

    }

    loadZeroImage() {

        let image = new Image();

        image.onload = () => { this.zeroImage = image };
        image.src = 'images/zero.png';

    }

    loadCrossImage() {

        let image = new Image();

        image.onload = () => { this.crossImage = image };
        image.src = 'images/cross.png';

    }

    drawScore() {

        if( this.crossImage ) {

            this.renderer.drawImage(
                -this.ctx.canvas.width / 2 + 20, 
                this.ctx.canvas.height / 2 - 75, 
                60, 
                60, 
                this.crossImage
            );

        }

        if( this.zeroImage ) {

            this.renderer.drawImage(
                this.ctx.canvas.width / 2 - 80, 
                this.ctx.canvas.height / 2 - 75, 
                60, 
                60, 
                this.zeroImage
            );

        }

        this.renderer.drawText(
            -60.0,
            this.ctx.canvas.height / 2 - 85,
            120, 
            60, 
            this.crossScore + ' : ' + this.zeroScore
        );

    }

    reload() {

        this.field = new Field( this, FIELD_SIZE );

        this.winner = false;
        this.winnerModalVisible = false;

        this.turnsNum = 0;

    }

    drawWinnerModal() {

        this.renderer.drawRect(
            -this.ctx.canvas.width / 2,
            -this.ctx.canvas.height / 2,
            this.ctx.canvas.width,
            this.ctx.canvas.height,
            [ 255, 255, 255, 255 / 100 * 90 ]
        );

        let text = "";
        let color = [ 0, 0, 0, 255 ];

        switch( this.winner ) {

            case GAME_CONDITION_CROSS:
                color = [ 255, 0, 0, 255 ];
                text = 'CROSS WON';
                break;

            case GAME_CONDITION_ZERO:
                color = [ 0, 0, 255, 255 ];
                text = 'ZERO WON';
                break;

            case GAME_CONDITION_DRAW:
                color = [ 0, 128, 0, 255 ];
                text = 'DRAW';
                break;

        }

        this.renderer.drawText(
            -150.0,
            150.0,
            300, 
            100, 
            text,
            color
        );

        let width = 300;
        let height = 100;

        this.renderer.drawRect(
            -width / 2,
            -height / 2,
            width,
            height,
            [ 221, 221, 221, 255 ]
        );

        this.renderer.drawText(
            - ( width - 50 ) / 2,
            - ( height + 10 ) / 2,
            width - 50,
            height,
            'CONTINUE',
            [ 255, 255, 255, 255 ]
        );

    }

    checkGameCondition() {

        let result = false;

        for( let i = 0; i < FIELD_SIZE; i++ ) {

            for( let j = 0; j < FIELD_SIZE; j++ ) {
                
                if ( this.field.cells[ i ][ j ].state != STATE_EMPTY ) {
                    
                    result = this.findWinner( this.field.cells[ i ][ j ], i, j );

                    if( result ) {

                        return result;

                    }

                }  

            }

        }

        result = ( this.turnsNum == 9 ? GAME_CONDITION_DRAW : false );

        return result;

    }

    findWinner( cell, row, column ) {
        
        let dColumn; 
        let dRow;

        let nRow;
        let nColumn;	

        dRow = 1;
        dColumn = -1;

        nRow = row;
        nColumn = column;

        for( let i = 0; i < FIELD_SIZE; i++ ) {

            if( ( nRow + dRow <= FIELD_SIZE ) && ( nColumn + dColumn >= -1 ) && ( this.field.cells[ nRow ][ nColumn ].state == cell.state ) ) { 
                
                nRow += dRow;
                nColumn += dColumn;

            } else {

                break;

            }

            if( i == FIELD_SIZE - 1 ) {
                return ( cell.state == STATE_CROSS ? GAME_CONDITION_CROSS : GAME_CONDITION_ZERO );
            }

        }

        dRow = 1;
        dColumn = 0;

        nRow = row;
        nColumn = column;

        for( let i = 0; i < FIELD_SIZE; i++ ) {

            if( ( nRow + dRow <= FIELD_SIZE ) && ( this.field.cells[ nRow ][ nColumn ].state == cell.state ) ) { 

                nRow += dRow;
                nColumn += dColumn;

            } else { 

                break;

            }

            if( i == FIELD_SIZE - 1 ) {
                return ( cell.state == STATE_CROSS ? GAME_CONDITION_CROSS : GAME_CONDITION_ZERO );
            }

        }

        dRow = 1;
        dColumn = 1;	

        nRow = row;
        nColumn = column;

        for( let i = 0; i < FIELD_SIZE; i++ ) {

            if( ( nRow + dRow <= FIELD_SIZE ) && ( nColumn + dColumn <= FIELD_SIZE ) && ( this.field.cells[ nRow ][ nColumn ].state == cell.state ) ) { 

                nRow += dRow;
                nColumn += dColumn;

            } else {

                break;

            }

            if( i == FIELD_SIZE - 1 ) {
                return ( cell.state == STATE_CROSS ? GAME_CONDITION_CROSS : GAME_CONDITION_ZERO );
            }

        }

        dRow = 0;
        dColumn = 1;

        nRow = row;
        nColumn = column;

        for( let i = 0; i <= FIELD_SIZE; i++ ) {

            if( ( nColumn + dColumn <= FIELD_SIZE ) && ( this.field.cells[ nRow ][ nColumn ].state == cell.state ) ) {

                nRow += dRow;
                nColumn += dColumn;

            } else {

                 break;

            }

            if( i == FIELD_SIZE - 1 ) {
                return ( cell.state == STATE_CROSS ? GAME_CONDITION_CROSS : GAME_CONDITION_ZERO );
            }

        }

        return false;

    }

    mainClickHandler( event ) {

        let clickX = event.offsetX;
        let clickY = event.offsetY;

        let gridWidth = this.ctx.canvas.width / FIELD_SIZE;
        let gridHeight = ( this.ctx.canvas.height - this.topBarHeight ) / FIELD_SIZE;

        if( clickY > this.topBarHeight && this.winnerModalVisible == false ) {

            let cellCol = Math.floor( ( clickY - this.topBarHeight ) / gridHeight );
            let cellRow = Math.floor( clickX / gridWidth );

            let cell = this.field.cells[ cellRow ][ cellCol ];

            if( cell.state == STATE_EMPTY ) {

                cell.update( this.currentPlayer );

                this.turnsNum++;
            
                this.currentPlayer = ( this.currentPlayer == PLAYER_CROSS ? PLAYER_ZERO : PLAYER_CROSS );

                this.winner = this.checkGameCondition();

                if( this.winner ) {

                    if( this.winner == GAME_CONDITION_CROSS ) {

                        this.crossScore++;

                    } else if( this.winner == GAME_CONDITION_ZERO ) {

                        this.zeroScore++;

                    }

                    this.winnerModalVisible = true;

                }

            }

        } else {

            this.reload();

        }

    }

}