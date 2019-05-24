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

        this.field = new Field( this, FIELD_SIZE );

        let reloadButtons = document.getElementsByClassName( 'reload' );

        for( let button of reloadButtons ) {

            button.addEventListener( 'click', () => this.reloadClickHandler() );

        }

    }

    updateScore() {

        let scoreBoard = document.getElementById( 'score' );

        scoreBoard.textContent = this.crossScore + ' : ' + this.zeroScore;

    }

    update() {

        this.turnsNum++;

        this.currentPlayer = ( this.currentPlayer == PLAYER_CROSS ? PLAYER_ZERO : PLAYER_CROSS );
            
        var winner = this.checkGameCondition();

        if( winner ) {

            if( winner == GAME_CONDITION_CROSS ) {

                this.crossScore++;

            } else if( winner == GAME_CONDITION_ZERO ) {

                this.zeroScore++;

            }

            this.updateScore();
            this.showGameFinishModal( winner );

        }

    }

    reload() {

        let field = document.getElementById( 'field' );

        let cells = field.getElementsByTagName( 'td' );

        for( let cell of cells ) {

            cell.innerHTML = '';

        }

        this.turnsNum = 0;
        this.field = new Field( this, FIELD_SIZE );

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

            if( ( nColumn + dColumn <= FIELD_SIZE ) && ( this.field.cells[nRow][nColumn].state == cell.state ) ) {

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

    showGameFinishModal( winner ) {

        let modalId = 'draw';

        if( winner == GAME_CONDITION_CROSS ) {

            modalId = 'cross_won';

        } else if( winner == GAME_CONDITION_ZERO ) {

            modalId = 'circle_won';

        }

        let modal = document.getElementById( modalId );

        modal.style.visibility = 'visible';

    }

    reloadClickHandler() {

        let modals = document.getElementsByClassName( 'winner_notification' );

        for( let modal of modals ) {
            
            modal.style.visibility = 'hidden';

        }

        this.reload();

    }

}