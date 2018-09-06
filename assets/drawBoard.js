function drawBoard(dimension, bombsLeft){
	let lastClicked;
	let field = new mineField(dimension, dimension, bombsLeft);

    let cellsLeft = dimension * dimension;

    let grid = clickableGrid(dimension,dimension,function(element,row,col,i){
		element.field.Click(element,row,col,i,dimension);
	});

    document.body.appendChild(grid);

    function clickableGrid( rows, cols, callback ){
    	let i=0;
        let grid = document.createElement('table');
        grid.className = 'grid';
        for (let r=0; r<rows; r++){
        	let tr = grid.appendChild(document.createElement('tr')); //creates a new row for each r value
            for (let c=0; c<cols; c++){
            	let cell = tr.appendChild(document.createElement('td')); //creates a new table data cell in the current row for each column
                cell.field = field;
                cell.addEventListener('click',(function(element,r,c,i){ //on a click it creates a function scope for all of the local variables for a cell
                	return function(){
                    	callback(element,r,c,i); //function that allows refernce to specific instance by creating closure
                    }
                })(cell,r,c,i),false);
				field.arr[r][c].cell = cell;
        	}
        }
        return grid;
	}
}
