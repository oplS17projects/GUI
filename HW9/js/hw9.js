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
    })
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
                
                // combine to get te new td tag
                var newTD = '<td class="' + $(this)[0].className + '" id="' + match[2] + '">' + img + '</td>';
                // console.log("check", newTD);
                // replace td tab to new td tab
                $(this)[0].outerHTML = newTD;

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
        console.log($(this));
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

// This function use for check the word is valid or not
function SubmitWord () {
    var Word_Obj = [];  // create an empty object for store Word
    var rid = $("#game_board").find('td');
    rid.each(function() {
        // check if ther eis <img>
        if($(this)[0].childElementCount > 0 && $(this)[0].id == "dropped") {
            var strClass = String($(this).attr('class'));
            var match = strClass.match(/([a-zA-Z]+)(.+)(\d+)(.+)/);     // regex for make groups
            $temp = $(this);
            var letterObj = getLetter($temp);
            // console.log(letterObj);
            Word_Obj.push({
                "Letter" : letterObj.Letter,
                "Value" : letterObj.value,
                "pos" : match[3],
                "xValue" : match[1],
                "id" : letterObj.id,
                "score" : 0
            })
        }
    });
    // check for word is valid or not
    var checkcorrect = CheckWordValid(Word_Obj);
    
    // if the word is valid, then calculate the score
    if(checkcorrect) {
        var Score = GetScore(Word_Obj); // get score return from the word
        AddToTable(Word_Obj);   // add the valid word to the game board so it wont be able to move
        Exchange();
        var word = WordCheck + " is a valid word";
        $(".error").html(word);     // display the message 
        word_score += Score;    // update the score
    } else {
        var word = WordCheck + " is not a valid word";
        $(".error").html(word); // display the message 
        returntorack(); // return all the Letter that is invalid back to rack
    }
    $('#score').html(word_score);   // display the score
    Word_Obj = [];  // empty the object
}


// add the valid word to the game board so it wont be able to move
function AddToTable($word) {
    var  rid = $("#game_board").find('td');
    rid.each(function() {
        if($(this)[0].id == "dropped") {
            // console.log($(this));
            // Get index for LetterOnRack
            var index = String($(this)[0].firstChild.id).replace("tile_drag_", "");
            // Pop that Letter from the LetterOnRack
            RemoveLetterFromRack(index);
            $(this)[0].firstChild.id = "imgAccepted";
            $(this)[0].firstChild.className = "";
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

// Check if the word valid for the first time check
// when the board game is empty
function CheckWordValid($temp) {
    for (var i = 0; i < $temp.length - 1 ; i++){
        if(parseInt($temp[i].pos) + Number(1) != parseInt($temp[i+1].pos))
            return false
    }
    var word = "";
    for (var i = 0; i < $temp.length; i ++){
        word += $temp[i].Letter;
    }
    WordCheck = word;
    // check if the word is in dictionary
    if (CheckDictionary(word))
        return true

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
    location.reload();
}

var LetterOnRack = [
    // Object { Letter: "A", id: "tile_drag_0", value: 1, "link": 0};
]; // holds the letter's value

// This function use to generate 7 random letters from ScrabblesTiles array
function GenerateTiles() {
    var tiles = "";
    var sLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
    tiles += '<table id="RackWord"><tr>';
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
                
        LetterOnRack.push({"Letter": sLetter[index], "id" : "tile_drag_" + i, "value" : ScrabbleTiles[sLetter[index]].value, "Link" : "<img id='tile_drag_" + i + "' class='board_piece_" + sLetter[index] + "' src='" + letter_url + "' /></img>"})
        // console.log(i, LetterOnRack[i]);

    }
    tiles += '</tr></table>';
    $("#score").html(word_score);   // display the score
    $("#tiles-rack").html(tiles);   // display the Letter on rack
    UpdateRemainWord();
}
