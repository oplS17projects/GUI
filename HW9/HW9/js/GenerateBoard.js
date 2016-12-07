
// Function to generate the scrabble board
var table = "";
function GenerateBoard() {
	$("#game_board").html(table);
    table += '<table>';
	var i = 1;
	while(i <=8){
		boardRow(i);
		i++;
	}
	i = 7;
	while (i > 0) {
		boardRow(i);
		i--;
	}
	
    table += '</table>';
    $("#game_board").html(table);
	table = "";
	
	var rid = $("#game_board").find('td');
	var size = rid.length;
	var row = 1;
	var col = 1;
	rid.each(function () {
		var chr = row.toString() + "-" + col.toString();
		$(this).addClass(chr);
		if(col == 15){
			row++;
			col = 0;
		}
		col++;
	});
	
	
}

function boardRow(num){
	switch(num) {
		case 1: 
		    table += '<tr><td class="TxWord NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxLetter NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="TxWord NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxLetter NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="TxWord NWord"></td>';
			break;
		
		case 2: 
		    table += '<tr><td class="NWord"></td>';
			table += '<td class="DxWord NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="TxLetter NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="TxLetter NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxWord NWord"></td>';
			table += '<td class="NWord"></td>';
			break;
			
		case 3: 
		    table += '<tr><td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxWord NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxLetter NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxLetter NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxWord NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			break;
	
		case 4: 
		    table += '<tr><td class="DxLetter NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxWord NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxLetter NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxWord NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxLetter NWord"></td>';
			break;

		case 5: 
		    table += '<tr><td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxWord NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxWord NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			break;
		
		case 6: 
		    table += '<tr><td class="NWord"></td>';
			table += '<td class="TxLetter NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="TxLetter NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="TxLetter NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="TxLetter NWord"></td>';
			table += '<td class="NWord"></td>';
			break;		
			
		case 7: 
		    table += '<tr><td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxLetter NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxLetter NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxLetter NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxLetter NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			break;	
			
		case 8: 
		    table += '<tr><td class="TxWord NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxLetter NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="Smile NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="DxLetter NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="NWord"></td>';
			table += '<td class="TxWord NWord"></td>';
			break;		
	}

}