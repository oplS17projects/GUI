// Copyright @ Chuong Vu
// Email: Chuong_Vu@student.uml.edus
// Function call from Submit button to create Dynamic Table
// it will get input from the html and passes the value
// to the checkvalidform function and then if the
// checkvalidform return true, the dynamic table will be created
// else the error Message will be display to direct user what need to be fixed
// 
// Assignment 8: Using the jQuery UI Slider and Tab Widgets
// Based on Assignment 7, this time I need to create a slider so that the Dynamic Table
// can automatic created when the user roll the slide to change the value
// Also, the save table and remove all table is also provided so that users
// can see what they did and they can remove the saved table also.

// Check to make sure the page ready
$().ready(function () {
	GenerateBoard();
	GenerateTiles();
	DragAndDrop();
	
    // source for key up http://jsfiddle.net/sd88wucL/1/
    $("#shuffle").click (function() {
		RackShuffle();
		DragAndDrop();
	});
	
	// source for key up http://jsfiddle.net/sd88wucL/1/
    $("#ok").click (function() {
		checkword();
		DragAndDrop();
	});	
	
	$("#exchange").click (function() {
		Exchange();
		DragAndDrop();
	})
});


var On_Board = [];

function DragAndDrop() {
	
	for (var i = 0; i < 7; i++) {
		// // Credit to Jason for draggable and back to original position
		// // https://github.com/JasonD94/GUI/blob/gh-pages/js/scrabble/draggable.js
		
		$("#tile_drag_" + i).draggable ({
			revert: "invalid",            // This is key. Only the rack and game board are considered valid!
			start: function(ev, ui) {
				// Save original position. (used for swapping tiles)
				startPos = ui.helper.position();  // startPos is a global variable found in variables.js
			},
			stop: function() {
				// If an invalid event is found, this will return the draggable object to its
				// default "invalid" option. From this Stackoverflow post (also used in the droppable part.)
				$(this).draggable('option', 'revert', 'invalid');
			}

		}); // end draggable
	} // end for loop

	// droppable to game_board
	// http://jsfiddle.net/awsFU/
	
	$("#game_board td").droppable ({
		accept: ".ui-draggable", // accept class ui-draggable after generate by draggable function
		tolerance: 'intersect',
		revert: "invalid",
		drop: function (event, ui) {
			if ($(this).attr('id') == undefined) {
				// console.log("true");
				var drop_p = $(this).offset();
				var drag_p = ui.draggable.offset();
				var left_end = drop_p.left - drag_p.left + 1;
				var top_end = drop_p.top - drag_p.top + 1;
				ui.draggable.animate({
					top: '+=' + top_end,
					left: '+=' + left_end
				});
				var draggableID = ui.draggable.attr("id");
				$(this).attr('id', draggableID + " dropped");
				// console.log(this);
			} else {
				// console.log("false");
				// check if the td already have letter, if true then letter will auto return back to the rack
				ui.draggable.draggable('option', 'revert', true);
				return;
			}
		},
		// remove id if the letter is dragged to other place from the table cell
		out: function (event, ui) {
			$(this).removeAttr('id');
		}

	});
	
	// Allow to drag back to the Rack
	$("#tiles-rack").droppable ({
		accept: ".ui-draggable",	// accept class ui-draggable after generate by draggable function
	});
}




var first_check = true;
var Completed_Word = [];

var check_word = [];

function checkword() {
	
	// This use to check if the first word check is not at the start point (Smiling face)
	check_word = [];
		
	console.log("Check ID", $('.Smile').attr('id'));
	
	if ($('.Smile').attr('id') != undefined){
		var rid = $("#game_board").find('td');
		var col = [];
		var row = [];
		rid.each(function () {
			var strID = String($(this).attr('id'));
			if (strID.indexOf("dropped") > -1) {
				// check_word.push(String($(this).attr('class')));
				strID = strID.replace(" dropped", "");
				for (i = 0; i < LetterOnRack.length; i++) {
					if(String(LetterOnRack[i].id) === String(strID)) {
						var strClass = String($(this).attr('class'));
						var match = strClass.match(/([a-zA-Z]+)(.*)/);
						// console.log(LetterOnRack[i].id, strID);
						check_word.push({
							"Letter": LetterOnRack[i].Letter,
							"id": LetterOnRack[i].id,
							"value": LetterOnRack[i].value,
							"xValue": match[1],
							"ScLetter": 0
						});
					}
				}
			}
			if ($(this).attr('id') != undefined) {
				var strClass = String($(this).attr('class'));
				// var regex = new RegExp("(\d+)(-)(\d+)");
				var re = /(\d+)(-)(\d+)/;
				var match = strClass.match(re);
				col.push(match[3]);
				row.push(match[1]);
				// console.log("row", match[1], "col", match[3]);
			}
		});
		// console.log(check_word);
		// This one check if all the letter is in the same Col
		var checkcol = col.allValuesSame();
		var checkrow = row.allValuesSame();
		
		
		if (checkcol){
			// row.sort();
			 // console.log(row);
			var inorder = row.OrderCorrect();
			// This check if all the order is next to each order
			var word = "";
			if (inorder) {
				for (i = 0; i < check_word.length; i++) {
					word += check_word[i].Letter;
				}
			}
			if( CheckDictionary(word)){
				GetScore(check_word);
			}
			
		// check if the letter is same on row
		} else if (checkrow) {
			
			var word = "";
			var inorder = col.OrderCorrect();
			if (inorder) {
				for (i = 0; i < check_word.length; i++) {
					word += check_word[i].Letter;
				}
			}
			if( CheckDictionary(word)){
				GetScore(check_word);
			}
		} else {
			RackShuffle();
			DragAndDrop();
		}
		
		row.splice(0, row.length);
		col.splice(0, col.length);
		
	} else {
		RackShuffle();
		DragAndDrop();
	}
	
	
}

var word_score = 0;
function GetScore(word) {
	console.log(check_word);
	
	for (i = 0; i < check_word.length; i++) {

		word_score += check_word[i].value * check_word[i].class;
	}
	console.log(word_score);
}



// http://ejohn.org/blog/dictionary-lookups-in-javascript/
// The dictionary lookup object
var dict = {};
// Do a jQuery Ajax request for the text dictionary
$.get( "files/dictionary.txt", function( txt ) {
    // Get an array of all the words
    var words = txt.split( "\n" );
    // And add them as properties to the dictionary lookup
    // This will allow for fast lookups later
    for ( var i = 0; i < words.length; i++ ) {
        dict[words[i]] = true;
    }

});



// Modified to only pass in one word, which can then be verified.
function CheckDictionary(word) {
    // See if it's in the dictionary
    if (dict[word]) {
        // If it is, return that word
        return true;
    }

    // Otherwise, it isn't in the dictionary.
    return false;
}

// checking array equal
// http://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal
Array.prototype.allValuesSame = function() {
    for(var i = 1; i < this.length; i++){
        if(this[i] !== this[0])
            return false;
    }
    return true;
}

Array.prototype.OrderCorrect = function() {
    for(var i = 0; i < this.length - 1; i++){
		var x = parseInt(this[i]) + Number(1);
		var y = parseInt(this[i + 1]);
		if(x !== y)
			return false;
    }
    return true;
}















// This function use to exchange all Letters
function Exchange() {
	// LetterOnRack, ScrabbleTiles
	for (var i = 0; i < LetterOnRack.length; i++){
		var letter = LetterOnRack[i].Letter;

		ScrabbleTiles[letter].number_remaining += 1;
	}
	LetterOnRack = [];
	UpdateRemainWord();
	GenerateTiles();
	DragAndDrop();
}

// this function use to reset the id of the td
// if the letter is no locked to board
function removeid() {
	var rid = $("#game_board").find('td');
	rid.each(function () {
		// if ($(this).attr('id') != undefined) {
			// var StrID = String($(this).attr('id'));
			// var match = StrID.match(/(.+)(dropped)/);
			// if(match[2] === 'dropped'){
				// $(this).removeAttr('id');
			// }
		// }
		var strID = String($(this).attr('id'));
		if (strID.indexOf("dropped") > -1) {
			$(this).removeAttr('id');
		}
	});
}


// Function use to Shuffle Letter in Rack
function RackShuffle() {
	removeid();
	
	// empty the rack first
	$("#tiles-rack").html("");
	
	// Create a temp array
	//var tempArray = [];
	
	// Define variable with empty string
	var tiles = "";
	
	for (var i = 0; i < 7; i ++) {
		// get random index number from LetterOnRack
		//var index = Math.floor(Math.random() * LetterOnRack.length);	
		
		// Push the random Object from LetterOnRack to tempArray
		//tempArray.push(LetterOnRack[index]);
		// console.log(tempArray[i]);
		// remove the Object from the LetterOnRack
		//LetterOnRack.splice(index, 1);
		
		// Combine string to make new img 
		var letter_url = "img/scrabble/Letter_" + LetterOnRack[i].Letter + ".png";
		tiles += "<img id='tile_drag_" + i + "' class='board_piece_" + LetterOnRack[i].Letter + "' src='" + letter_url + "' /></img>";
	}
	$("#tiles-rack").html(tiles);
	//LetterOnRack.splice(0, LetterOnRack.length);
	// Copy all Object from tempArray back to LetterOnRack
	//LetterOnRack = tempArray;
	// console.log(LetterOnRack);
	// tempArray.splice(0, tempArray.length);
}




var score = 0;
var LetterOnRack = [
	// Object { Letter: "A", id: "tile_drag_0", value: 1};
]; // holds the letter's value

// This function use to generate 7 random letters from ScrabblesTiles array
function GenerateTiles() {
	var tiles = "";
	var sLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
	
	for (var i = 0; i < 7; i++)	{
		// http://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
		
		var index = Math.floor(Math.random() * sLetter.length);	// get random index in from sLetter

		// Check if the letter from Array is still have letter left
		// If not then get new one until the remain is not 0
		while (ScrabbleTiles[sLetter[index]].number_remaining === 0) {
			index = Math.floor(Math.random() * sLetter.length);
		}
		// Get letter link
		var letter_url = "img/scrabble/Letter_" + sLetter[index] + ".png";
		tiles += "<img id='tile_drag_" + i + "' class='board_piece_" + sLetter[index] + "' src='" + letter_url + "' /></img>";
		
		// var NumRreamin = ScrabbleTiles[sLetter[index]].number_remaining;
		// NumRreamin = NumRreamin - 1;
		// console.log(ScrabbleTiles[sLetter[index]].number_remaining);
		ScrabbleTiles[sLetter[index]].number_remaining = ScrabbleTiles[sLetter[index]].number_remaining - 1;
				
		// console.log("Remain: ", ScrabbleTiles[sLetter[index]].number_remaining);
		
		LetterOnRack.push({"Letter": sLetter[index], "id" : "tile_drag_" + i, "value" : ScrabbleTiles[sLetter[index]].value})
		// console.log(i, LetterOnRack[i]);

	}
	$("#score").html(score);
	$("#tiles-rack").html(tiles);
	UpdateRemainWord();
}




