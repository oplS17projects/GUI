// This function use to Generate and Update remaining word from the ScrabbleTiles array

function UpdateRemainWord() {
	var remain = "";
	$("#bagtiles").html(remain);
	remain += '<table class="remainword">';
	// first row
	remain += '<tr><td class="RWord" colspan="9">REMAINING LETTER</td></td>';
	// second row
	remain += '<tr><td class="RWord">' + "A: " + ScrabbleTiles["A"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "B: " + ScrabbleTiles["B"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "C: " + ScrabbleTiles["C"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "D: " + ScrabbleTiles["D"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "E: " + ScrabbleTiles["E"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "F: " + ScrabbleTiles["F"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "G: " + ScrabbleTiles["G"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "H: " + ScrabbleTiles["H"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "I: " + ScrabbleTiles["I"].number_remaining + '</td></td>';

	// third row
	remain += '<tr><td class="RWord">' + "J: " + ScrabbleTiles["J"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "K: " + ScrabbleTiles["K"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "L: " + ScrabbleTiles["L"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "M: " + ScrabbleTiles["M"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "N: " + ScrabbleTiles["N"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "O: " + ScrabbleTiles["O"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "P: " + ScrabbleTiles["P"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "Q: " + ScrabbleTiles["Q"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "R: " + ScrabbleTiles["R"].number_remaining + '</td></td>';
	// forth row
	remain += '<tr><td class="RWord">' + "S: " + ScrabbleTiles["S"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "T: " + ScrabbleTiles["T"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "U: " + ScrabbleTiles["U"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "V: " + ScrabbleTiles["V"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "W: " + ScrabbleTiles["W"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "X: " + ScrabbleTiles["X"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "Y: " + ScrabbleTiles["Y"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "Z: " + ScrabbleTiles["Z"].number_remaining + '</td>';
	remain += '<td class="RWord">' + "_: " + ScrabbleTiles["_"].number_remaining + '</td></td>';

	remain += '</table>';
	
	$("#bagtiles").html(remain);

}