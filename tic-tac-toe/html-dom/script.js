// Field size
const FIELD_SIZE = 3;

// Cell status
const EMPTY = 0;
const CROSS = 1;
const CIRCLE = 2;
const DRAW = 3;
var Turn_number = 0;

var TURN = 'X';

var Arr = [];

function Run()
{
	// Add event on click

	var Cells = document.getElementsByTagName('td');

	for(var i = 0; i < Cells.length; i++)
	{
		Cells[i].addEventListener('click', function (event) {
			var Cell = event.target;

			if(Cell.innerHTML == '&nbsp;')
			{
				Cell.innerHTML = TURN;

				if(TURN == 'X')
				{
					Cell.className = 'cross';
					TURN = 'O';

					document.getElementById("cross").className = "";
					document.getElementById("circle").className = "active";
				}
				else
				{
					Cell.className = 'circle';
					TURN = 'X';

					document.getElementById("circle").className = "";
					document.getElementById("cross").className = "active";
				}
			}
			GetField();
			
			var Winner = WinCondition();

			if(Winner == CROSS)
			{
				document.getElementById("cross_score").innerHTML = parseInt(document.getElementById("cross_score").innerHTML) + 1;
				document.getElementById("cross_won").className = "winner_notification winner";
			}
			else if(Winner == CIRCLE)
			{
				document.getElementById("circle_score").innerHTML = parseInt(document.getElementById("circle_score").innerHTML) + 1;
				document.getElementById("circle_won").className = "winner_notification winner";
			}
			else if(Winner == DRAW)
				document.getElementById("draw").className = "winner_notification winner";
		});
	}
}

function WinCondition()
{	
	Turn_number++;
	for (var i=0; i<FIELD_SIZE; i++) {
		for(var j=0; j<FIELD_SIZE; j++){
			if (Arr[i][j]!=0) 
				if(Derevo(Arr[i][j], i, j) != 0)
					return Derevo(Arr[i][j], i, j);
		}
	}
	if (Turn_number == 9) return DRAW; 
	return 0;
}


function Derevo(key, Row, Column){
	var dColumn,dRow;
	var nRow, nColumn;	

	dRow=1;
	dColumn=-1;
	nRow=Row;
	nColumn=Column;
	for (var i =0; i<FIELD_SIZE; i++){
		if ((nRow+dRow<=FIELD_SIZE) && (nColumn+dColumn>=-1) && (Arr[nRow][nColumn]==key)) { 
			nRow+=dRow;
			nColumn+=dColumn;
		}
		else break;
		if(i==FIELD_SIZE-1) {
			return key;
		}
	}

	dRow=1;
	dColumn=0;
	nRow=Row;
	nColumn=Column;
	for (var i =0; i<FIELD_SIZE; i++){
		if ((nRow+dRow<=FIELD_SIZE) && (Arr[nRow][nColumn]==key)) { 
			nRow+=dRow;
			nColumn+=dColumn;
		}
		else break;
		if(i==FIELD_SIZE-1) {
			return key;
		}
	}

	dRow=1;
	dColumn=1;	
	nRow=Row;
	nColumn=Column;
	for (var i =0; i<FIELD_SIZE; i++){
		if ((nRow+dRow<=FIELD_SIZE) && (nColumn+dColumn<=FIELD_SIZE) && (Arr[nRow][nColumn]==key)) { 
			nRow+=dRow;
			nColumn+=dColumn;
		}
		else break;
		if(i==FIELD_SIZE-1) {
			return key;
		}
	}

	dRow=0;
	dColumn=1;
	nRow=Row;
	nColumn=Column;
	for (var i =0; i<=FIELD_SIZE; i++){
		if ((nColumn+dColumn<=FIELD_SIZE) && (Arr[nRow][nColumn]==key)) {

			nRow+=dRow;
			nColumn+=dColumn;
		}
		else break;

		if(i==FIELD_SIZE-1) {
			return key;
		}
	}
	 return 0;
}

function GetField()
{
	var Cells = document.getElementsByTagName("td");

	var k = 0;

	for(var i = 0; i < FIELD_SIZE; i++)
	{
		Arr[i] = [];

		for(var j = 0; j < FIELD_SIZE; j++)
		{
			switch(Cells[k].innerHTML)
			{
				case 'X' :
					Arr[i][j] = CROSS;
				break;

				case 'O' : 
					Arr[i][j] = CIRCLE;
				break;

				default:
					Arr[i][j] = EMPTY;
			}

			k++;
		}
	}
}

function WriteField()
{
	for(var i = 0; i < 3; i++)
	{
		var str = "";

		for(var j = 0; j < 3; j++)
		{
			str = str + " " + Arr[i][j];
		}

		console.log(str);
	}
}

function ClearField()
{
	var Cells = document.getElementsByTagName('td');

	for(var i = 0; i < Cells.length; i++)
	{
		Cells[i].innerHTML = '&nbsp;';
		Cells[i].className = '';
	}
}

function Reset()
{
	if(confirm('Do you really wabt to reset this game?'))
		window.location.reload(true);
}

function Continue()
{
	ClearField();
	GetField();

	Turn_number = 0;
	TURN        = 'X';

	document.getElementById("circle").className = "";
	document.getElementById("cross").className = "active";

	document.getElementsByClassName("winner")[0].className = "winner_notification";
}

// After our window wal loaded
window.onload = function () {
	//GetField();
	ClearField();

	Run();
}
