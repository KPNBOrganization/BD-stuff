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

        this.topBarHeight = 100;

        this.winner = false;
        this.winnerModalVisible = false;

        var canvas = document.getElementById( 'canvas' );

        canvas.addEventListener( 'click', ( event ) => this.mainClickHandler( event ) );

        this.ctx = canvas.getContext( 'webgl' );

        this.field = new Field( this, FIELD_SIZE );

    }

    loop() {

        this.draw();

        window.requestAnimationFrame( () => this.loop() );

    }

    draw() {

        if( this.boardImage ) {

            // this.ctx.drawImage( this.boardImage, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height );

        }

        this.drawScore();

        this.field.draw( this.ctx );

        if( this.winnerModalVisible ) {

            this.drawWinnerModal();

        }

    }

    loadBoardImage() {

        var image = new Image();

        image.onload = () => this.boardImage = image;
        image.src = 'images/paper.png'; 

    }

    drawScore() {

        // this.ctx.font = "bold 60px 'Comic Sans MS'";
        // this.ctx.textAlign = "center";

        // this.ctx.fillStyle = "red";
        // this.ctx.fillText( "X", 45, 75 );

        // this.ctx.fillStyle = "blue";
        // this.ctx.fillText( "0", this.ctx.canvas.width - 45, 75 );

        // this.ctx.fillStyle = "black";
        // this.ctx.fillText( this.crossScore + ' : ' + this.zeroScore, this.ctx.canvas.width / 2, 75 );

    }

    reload() {

        this.field = new Field( this, FIELD_SIZE );

        this.winner = false;
        this.winnerModalVisible = false;

        this.turnsNum = 0;

    }

    drawWinnerModal() {

        // this.ctx.fillStyle = "rgba( 255, 255, 255, 0.9 )";
        // this.ctx.fillRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height );

        // this.ctx.font = "bold 60px 'Comic Sans MS'";
        // this.ctx.textAlign = "center";

        let text = "";

        switch( this.winner ) {

            case GAME_CONDITION_CROSS:
                // this.ctx.fillStyle = "red";
                text = 'CROSS WON';
                break;

            case GAME_CONDITION_ZERO:
                // this.ctx.fillStyle = "blue";
                text = 'ZERO WON';
                break;

            case GAME_CONDITION_DRAW:
                // this.ctx.fillStyle = "green";
                text = 'DRAW';
                break;

        }

        // this.ctx.fillText( text, this.ctx.canvas.width / 2, 150 );

        let width = 300;
        let height = 100;

        // this.ctx.fillStyle = "#dddddd";
        // this.ctx.fillRect( this.ctx.canvas.width / 2 - width / 2, 250, width, height );

        // this.ctx.font = "bold 45px 'Comic Sans MS'";
        // this.ctx.textAlign = "center";
        // this.ctx.fillStyle = "#ffffff";
        // this.ctx.fillText( 'CONTINUE', this.ctx.canvas.width / 2, 250 + 65 );

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
        
        var dColumn; 
        var dRow;

        var nRow;
        var nColumn;	

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