// Copyright @ Chuong Vu
// Email: Chuong_Vu@student.uml.edus
// Function call from Submit button to create Dynamic Table
// it will get input from the html and passes the value
// to the checkvalidform function and then if the
// checkvalidform return true, the dynamic table will be created
// else the error Message will be display to direct user what need to be fixed
// 
// Assignment 9: Using the jQuery UI Slider and Tab Widgets
// This is the main file which contain all the function that need for run the game
// Although the game is still have some bugs because I did not have enough time to work 
// on this assignment.


// Check to make sure the page ready
$().ready(function () {
    GenerateBoard();    // call the function to generate game board
    GenerateTiles();    // call the function to generate tiles
    DragAndDrop();      //  call the drag and drop function
    
    // source for key up http://jsfiddle.net/sd88wucL/1/
    // waiting for reset button is click and call drag drop to re-enable drag drop
    $("#resetgame").click (function() {
        ResetGame();
        DragAndDrop();
    });
    
    
    // source for key up http://jsfiddle.net/sd88wucL/1/
    // waiting for OK button is click and call drag drop to re-enable drag drop
    $("#ok").click (function() {
        SubmitWord();
        DragAndDrop();
    }); 
    
    // waiting for exchange button is click and call drag drop to re-enable drag drop
    $("#exchange").click (function() {
        Exchange();
        DragAndDrop();
    });
    
    // waiting for exchange button is click and call drag drop to re-enable drag drop
    $("#clear_board").click (function() {
        ClearGameBoard();
        DragAndDrop();
    });
});


// This function call the DragAble and DropAble function
function DragAndDrop () {
    DragAble();
    DropAble();
}


// This function for enable td tab to make it droppable after drag
function DropAble() {
    
    // droppable to game_board
    // http://jsfiddle.net/awsFU/
    
    $("#game_board td").droppable ({    // select all td tab in game_board
        accept: ".ui-draggable", // accept class ui-draggable after generate by draggable function
        tolerance: 'intersect',     // Draggable overlaps the droppable at least 50% in both directions.
        revert: "invalid",  // this is to make sure that it can be drop, key for check valid
        drop: function (event, ui) {
            if ($(this).attr('id') == undefined) {
                $(this)[0].id = $(this)[0].id + " dropped"; // get the id of the td
                ui.draggable[0].style.cssText = "";     // chagne the css style of the img dragg
                var img = ui.draggable[0].outerHTML;    // get the dragged content
				
                var strID = String($(this)[0].id);      // get the id from the td
                var match = strID.match(/(.+)(dropped)/);   // using regex to make a groups of substrings

                // console.log("check", newTD);
                // replace td tab to new td tab
			
				if(CheckSpaceLetter(ui.draggable)){
					var newimg = SpaceSwap(ui.draggable);
					var new_TD = '<td class="' + $(this)[0].className + '" id="' + match[2] + '">' + newimg + '</td>';
					$(this)[0].outerHTML = new_TD;
				} else {
					                
					// combine to get te new td tag
					var newTD = '<td class="' + $(this)[0].className + '" id="' + match[2] + '">' + img + '</td>';
					$(this)[0].outerHTML = newTD;
				}
				
                // remove current dragging 
                ui.draggable[0].outerHTML = "";

                // call the drag and drop function
                DragAndDrop()
                
                // remove the id after drop 
                removeIDDrag();

            } else {
                // console.log("false");
                // check if the td already have letter, if true then letter will auto return back to the rack
                ui.draggable.draggable('option', 'revert', true);
                return;
            }
        },
        // remove id if the letter is dragged to other place from the table cell
        out: function (event, ui) {
            //$(this).removeAttr('id');
        }

    });
    
    // Allow to drag back to the Rack
    $("#tiles-rack td").droppable ({
        accept: ".ui-draggable",    // accept class ui-draggable after generate by draggable function
        drop: function (event, ui) {
            ReworkBoardGame();
        },
        out: function (event, ui) {
            $(this).removeAttr('id');
            //removeIDDrag();
        }
    });
}

// this function return true/false if SPACE is detect
function CheckSpaceLetter($Space) {
	var classID = $Space[0].className;
    var CurrentLetter = classID.match(/(board_piece_)(.)(.+)/);   
	if (CurrentLetter[2] == "_")
		return true;
	else
		return false;
}


// This function use to swap the space letter to other letter
function SpaceSwap ($Space) {
	// source http://www.w3schools.com/js/tryit.asp?filename=tryjs_prompt
	// prompt windows ask user to enter new letter 
	var newLetter = prompt("Please Enter alphabet from A-Z for SWAP the SPACE Letter","A");
	
	// check if the new input it mor than 1 character or not alphabet
	while (String(newLetter).length > 1 || CheckAlpha(newLetter)) {
		newLetter = prompt("Please Enter alphabet from A-Z for SWAP the SPACE Letter","A");
	}
	
	// make the letter be a Upper Case
	newLetter = newLetter.toUpperCase();
	
	// Get the outerHTML string
	var textHTML = $Space[0].outerHTML;
	
	// using regex to groups outerHTML string
	var regex = textHTML.match(/(.+)(board_piece_)(.)(.+)(Letter_)(.)(.+)/);
	
	// update outerHTML string with correct letter value
	textHTML = regex[1] + regex[2] + newLetter + regex[4] + regex[5] + newLetter + regex[7];

	// return the outerHTML
	return textHTML;
}
 // This function use to check the input is letter or not
function CheckAlpha(word) {
	var check = String(word);
	var result = check.match(/([a-zA-Z])+$/);
	if (result == null)
		return true;
	else
		return false;
	
}

// this is the dragable function use to enable <img> with id = tile_drag_x
function DragAble(str) {
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
    
}

// this is for re work the scrabble board after valid word
function ReworkBoardGame() {
    var  rid = $("#game_board").find('td');
    rid.each(function() {
        // console.log($(this));
        if (String($(this)[0].id) === "dropped")
            $(this).removeAttr('id');
    });
}

// This function use to remove  the id from <td> tab
// if there is no <img> tag in the cell
function removeIDDrag() {
    var  rid = $("#game_board").find('td');
    rid.each(function() {
        if($(this)[0].childElementCount == 0 && $(this)[0].id != "") {
            $(this).removeAttr('id');
        }
    });
    
}

// global variable for Word check
var WordCheck = "";
// Use to update the total score
var word_score = 0;
var word_length = 0;
// This function use for check the word is valid or not
function SubmitWord () {
    var Word_Obj = [];
        
    Word_Obj = GetWordFromBoard();
    // check for word is valid or not
    if (word_length != Word_Obj.length) {
        var checkcorrect = CheckWordValid(Word_Obj);
        
        // if the word is valid, then calculate the score
        if(checkcorrect) {
            var Score = GetScore(Word_Obj); // get score return from the word
            AddToTable(Word_Obj);   // add the valid word to the game board so it wont be able to move
            GetNewLetter();
            var word = WordCheck + " is a valid word";
            $(".error").html(word);     // display the message 
            word_score += Score;    // update the score
            word_length = Word_Obj.length;  // update flag for make sure not check the same word again
        } else {
            var word = WordCheck + " is not a valid word";
            $(".error").html(word); // display the message 
            returntorack(); // return all the Letter that is invalid back to rack
        }
        $('#score').html(word_score);   // display the score
        Word_Obj = [];  // empty the object

    } else {
        var word = "Error: There are either NO WORD or WORD THAT ALREADY VALID";
        $(".error").html(word); // display the message 
    }
}

// This function is use to clear game board if 
// player can't get any more word but the score will
// still remain
function ClearGameBoard(){
    GenerateBoard();    // just call the GenerateBoard function to re-draw the new board
    word_length = 0;    // reset the word_length for next check
}


// This function is called for the first time check the board gamel letter
function GetWordFromBoard(){
    var Word_Obj = [];
    var rid = $("#game_board").find('td');
    rid.each(function() {
		// console.log($(this));
        // check if there is <img> tab
        if($(this)[0].childElementCount > 0 && ($(this)[0].id == "dropped" || $(this)[0].id == "accepted")) {
            if($(this)[0].id == "dropped" ) {
                var strClass = String($(this).attr('class'));
				// console.log(strClass);
                var match = strClass.match(/([a-zA-Z]+)(.+)(\d+)(.+)/);     // regex for make groups
                // console.log(match);
                temp = $(this);
                var letterObj = getLetter(temp);
				
				// this is update the letter object if space is detect
                if (letterObj.Letter == "_"){
					var outText = $(this)[0].firstChild.className;
					var matchregex = outText.match(/(board_piece_)(.)(.+)/);
					letterObj.Letter = matchregex[2];
					letterObj.Value = ScrabbleTiles[matchregex[2]].value;
				}
				
                Word_Obj.push({
                    "Letter" : letterObj.Letter,
                    "Value" : letterObj.value,
                    "pos" : match[3],
                    "xValue" : match[1],
                    "score" : 0
                });
            } else {
                // console.log("value2", $(this));
                var strClass = String($(this).attr('class'));
                var match = strClass.match(/([a-zA-Z]+)(.+)(\d+)(.+)/);     // regex for make groups
                //console.log(match);
                $temp = $(this);
                //console.log("this", $temp);
                //var letterObj = getLetter($temp);
                //console.log(letterObj);
                Word_Obj.push({
                    "Letter" : $(this)[0].firstChild.className,
                    "Value" : ScrabbleTiles[$(this)[0].firstChild.className].value,
                    "pos" : match[3],
                    "xValue" : match[1],
                    "score" : 0
                });
            }
        }
    });
    return Word_Obj;
}

// Check if the word valid for the first time check
// when the board game is empty
function CheckWordValid($temp) {
    for (var i = 0; i < $temp.length - 1 ; i++){
        if(parseInt($temp[i].pos) + Number(1) != parseInt($temp[i+1].pos))
            return false;
    }
    var word = "";
    for (var i = 0; i < $temp.length; i ++){
        word += $temp[i].Letter;
    }
    // console.log(word);
    WordCheck = word;
    // check if the word is in dictionary
    if (CheckDictionary(word)) {
        firstchecktrue = true;
        return true;
    }
    return false;   
}

// get letter function from LetterOnRack
function getLetter($temp) {
    var imgid = $temp[0].firstChild.id;
    for (var i = 0; i < LetterOnRack.length; i++){
        if (LetterOnRack[i].id == imgid)
            return LetterOnRack[i];
    }
}


// This function use to get the new Letter to the rack
// after the board accept the valid letter
function GetNewLetter() {
    // console.log("letter on rack", LetterOnRack);
    
    tiles = "";
    var MissWord = 7 - LetterOnRack.length;
    // console.log(MissWord);

    // create an empty array with 0 value
    var tempObj = [0, 0, 0, 0, 0 , 0, 0];
    
    // This loop use to store all the letter in LetterOnRack
    // with the correct position to the tempObj array
    var j = 0;
    for (var i = 0; i < 7; i++){
        // check to make sure j is not out of range
        if (j < LetterOnRack.length){
            // if they are the same, then 
            if(LetterOnRack[j].pos == i) {
                tempObj[i] = LetterOnRack[j];           
                j++;
            }
        }
    }
    
    // This loop use for replace slot value 0 with it new letter
    // same with the generate new Letter
    for (var i = 0; i < tempObj.length; i++){
        if (tempObj[i] == 0) {
            var index = Math.floor(Math.random() * sLetter.length); // get random index in from sLetter
            while (ScrabbleTiles[sLetter[index]].number_remaining === 0) {
                index = Math.floor(Math.random() * sLetter.length);
            }
            // update the remainning value in ScrabbleTiles array
            ScrabbleTiles[sLetter[index]].number_remaining = ScrabbleTiles[sLetter[index]].number_remaining - 1;
            
            // Get letter link
            var letter_url = "img/scrabble/Letter_" + sLetter[index] + ".png";
            
            tempObj[i] = ({"Letter": sLetter[index], "id" : "tile_drag_" + i, "pos": i, "value" : ScrabbleTiles[sLetter[index]].value, "Link" : "<img id='tile_drag_" + i + "' class='board_piece_" + sLetter[index] + "' src='" + letter_url + "' /></img>"});
        }
    }
    
    // Empty the LeterOnrack
    LetterOnRack = [];
    // Copy back with the tempObj
    LetterOnRack = tempObj;
    // console.log("temp", LetterOnRack);
        
    // console.log(LetterOnRack);
    var tiles = "";
    tiles += '<table id="RackWord"><tr>';
    var j = 0;
    rid = $("#tiles-rack").find('td');
    for ( var i = 0; i < rid.length; i++){
        if (i < LetterOnRack.length) {
            tiles += "<td>" + LetterOnRack[j].Link + "</td>";
            j++;
        } else {
            tiles += "<td></td>";
        }
    }
    
    tiles += '</tr></table>';
    $("#tiles-rack").html(tiles); // Update to the tiles-rack
    UpdateRemainWord(); // Update the reamining word 
        
}


// add the valid word to the game board so it wont be able to move
function AddToTable($word) {
    var  rid = $("#game_board").find('td');
    rid.each(function() {
        if($(this)[0].id == "dropped") {
            var classID = $(this)[0].firstChild.className;
            var CurrentLetter = classID.match(/(board_piece_)(.)(.+)/);             
            // Get index for LetterOnRack
            var index = String($(this)[0].firstChild.id).replace("tile_drag_", "");
            // Pop that Letter from the LetterOnRack
            RemoveLetterFromRack(index);
            $(this)[0].firstChild.id = "imgAccepted";
            $(this)[0].firstChild.className = CurrentLetter[2];
            $(this)[0].id = "accepted";
        }
    });
}

// This function to return lette back to rack if the word is not valid after check
function returntorack() {
    var  rid = $("#game_board").find('td');
    rid.each(function() {
        if (String($(this)[0].id) === "dropped"){
            $(this).removeAttr('id');
            $(this)[0].firstChild.outerHTML = "";
        }
    });
        
    // console.log(LetterOnRack);
    var tiles = "";
    tiles += '<table id="RackWord"><tr>';
    var j = 0;
    rid = $("#tiles-rack").find('td');
    for ( var i = 0; i < rid.length; i++){
        if (i < LetterOnRack.length) {
            tiles += "<td>" + LetterOnRack[j].Link + "</td>";
            j++;
        } else {
            tiles += "<td></td>";
        }
    }
    
    tiles += '</tr></table>';
    $("#tiles-rack").html(tiles);
}


// This function use to Remove Elements from the
// array and push it back
function RemoveLetterFromRack(x) {
    //console.log(x);
    var temp = [];
    for (var i = 0; i < LetterOnRack.length; i ++) {
        if (i != x)
            temp.push(LetterOnRack[i]);
    }   
    LetterOnRack = [];
    LetterOnRack = temp;
    
    //console.log(LetterOnRack);

}

// calculate the score if the word is valid
function GetScore($word) {
    var TotalScore = 0;
    // Calculate the X Letter 
    // Loop throuh the object that contain "Letter", "Value", "pos", "xValue", "id", "score"
    for (var i = 0; i < $word.length; i++) {
        // x2 if DxLetter found
        if (String($word[i].xValue) === "DxLetter")
            $word[i].score = parseInt($word[i].Value) * Number(2);
        // x3 if TxLetter found
        else if (String($word[i].xValue) === "TxLetter")
            $word[i].score = parseInt($word[i].Value) * Number(3);
        // the score is current score
        else
            $word[i].score = parseInt($word[i].Value)
        
        // add the score together
        TotalScore += $word[i].score;
    }
    // Calcuate the X Word 
    // Loop throuh the object that contain "Letter", "Value", "pos", "xValue", "id", "score"
    for (var i = 0; i < $word.length; i++) {
        // x2 word if the DxWord is found
        if (String($word[i].xValue) === "DxWord")
            TotalScore = parseInt(TotalScore) * Number(2);
        // x3 word if the TxWord is found
        else if (String($word[i].xValue) === "TxWord")
            TotalScore = parseInt(TotalScore) * Number(3);
    }
    return TotalScore; // return the score
}



// http://ejohn.org/blog/dictionary-lookups-in-javascript/
// The dictionary lookup object
// Credit to John Resig
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


// This function use to exchange all Letters
function Exchange() {
    //console.log(LetterOnRack);
    var  rid = $("#game_board").find('td');
    rid.each(function() {
        if($(this)[0].id == "dropped") {
            $(this)[0].innerHTML = "";
            removeIDDrag();
        }
    });

    // LetterOnRack, ScrabbleTiles
    for (var i = 0; i < LetterOnRack.length; i++){
        var letter = LetterOnRack[i].Letter;
        ScrabbleTiles[letter].number_remaining += 1;
    }
    LetterOnRack = [];  // empty the object
    UpdateRemainWord(); // Recalculate the remainning word
    GenerateTiles();    // regenerate the titles
    DragAndDrop();      // make it can drag and drop

}

// this function use to reset the id of the td
// if the letter is no locked to board
function removeid() {
    var rid = $("#game_board").find('td');
    rid.each(function () {
        var strID = String($(this).attr('id'));
        if (strID.indexOf("dropped") > -1) {
            $(this).removeAttr('id');
        }
    });
}


// Function refresh the page for reload game
// Reset the game
function ResetGame() {
    // Return the number_remaining array back to the orignial_distribution
    var sLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
    console.log(sLetter.length);
    for (var i = 0; i < sLetter.length; i++) {
        // console.log("before", ScrabbleTiles[sLetter[i]].number_remaining, ScrabbleTiles[sLetter[i]].original_distribution);
        ScrabbleTiles[sLetter[i]].number_remaining = ScrabbleTiles[sLetter[i]].original_distribution;
        // console.log("after",ScrabbleTiles[sLetter[i]].number_remaining, ScrabbleTiles[sLetter[i]].original_distribution);
    }
    word_score = 0;
    GenerateBoard();
    GenerateTiles();
    UpdateRemainWord();
	$(".error").html("");
}

var LetterOnRack = [
    // Object { Letter: "A", id: "tile_drag_0", value: 1, "link": 0};
]; // holds the letter's value

var sLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
// This function use to generate 7 random letters from ScrabblesTiles array
function GenerateTiles() {
    var tiles = "";

    tiles += '<table id="RackWord"><tr>';
    LetterOnRack = [];
    for (var i = 0; i < 7; i++) {
        // http://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
        
        var index = Math.floor(Math.random() * sLetter.length); // get random index in from sLetter

        // Check if the letter from Array is still have letter left
        // If not then get new one until the remain is not 0
        while (ScrabbleTiles[sLetter[index]].number_remaining === 0) {
            index = Math.floor(Math.random() * sLetter.length);
        }
        // Get letter link
        var letter_url = "img/scrabble/Letter_" + sLetter[index] + ".png";
        tiles += "<td><img id='tile_drag_" + i + "' class='board_piece_" + sLetter[index] + "' src='" + letter_url + "' /></img></td>";
        
        // update the remainning value in ScrabbleTiles array
        ScrabbleTiles[sLetter[index]].number_remaining = ScrabbleTiles[sLetter[index]].number_remaining - 1;
                
        LetterOnRack.push({"Letter": sLetter[index], "id" : "tile_drag_" + i, "pos": i, "value" : ScrabbleTiles[sLetter[index]].value, "Link" : "<img id='tile_drag_" + i + "' class='board_piece_" + sLetter[index] + "' src='" + letter_url + "' /></img>"});
        // console.log(i, LetterOnRack[i]);

    }
    tiles += '</tr></table>';
    $("#score").html(word_score);   // display the score
    $("#tiles-rack").html(tiles);   // display the Letter on rack
    UpdateRemainWord();
}
