let cell = null;
let grid = null;

/**
 * Represents a board.
 * @constructor
 * @param {int} height - The height of the grid.
 * @param {int} width - The width of the grid.
 * @param {int} bombsLeft - The amount of bombs to be placed in the grid.
 * @returns - nothing
 */
function drawBoard(height, width, bombsLeft){
	cell = [];
 	let lastClicked;
 	let field = new mineField(height, width, bombsLeft);

    let tab = clickableGrid(height, width,function(element,row,col){
 		element.field.Click(cell,row,col);
 	});

	document.body.appendChild(grid);

	/**
	 * creates a table to place the elements in.
	 * @function
	 * @param {int} rows - The height of the grid.
	 * @param {int} cols - The width of the grid.
	 * @param {@function} @callback
	 * @returns - returns the finished grid
	 */
 	function clickableGrid( rows, cols, callback ){
        grid = document.createElement('table');
        grid.className = 'grid';

        for (let r=0; r<rows; r++){
        	let tr = grid.appendChild(document.createElement('tr')); //creates a new row for each r value
 			cell.push([0]);

            for (let c=0; c<cols; c++){
             	cell[r][c] = tr.appendChild(document.createElement('td')); //creates a new table data cell in the current row for each column
                cell[r][c].field = field;
                cell[r][c].addEventListener('click',(function(element,r,c){ //on a click it creates a function scope for all of the local variables for a cell
                 	return function(){
                    	callback(element,r,c); //function that allows refernce to specific instance by creating closure
                    }
                })(cell[r][c],r,c),false);
 				field.arr[r][c].cell = cell[r][c];
         	}
        }
        return grid;
	}
}
/**
 * deletes the table and the elements inside of it
 * @function
 * @returns - nothing
 */
function deleteBoard(){
	if(grid != null){
 		document.body.removeChild(grid);
 	}
}
