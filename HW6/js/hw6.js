function myFunction() {
    var fCol, lCol, fRow, lRow; //Define variable for First/Last Column, First/Last Row
    //use parseInt to get value as number from html input
    fCol = document.getElementById("inputNum1").value;  //First Column
    lCol = document.getElementById("inputNum2").value;  //Last Column
    fRow = document.getElementById("inputNum3").value;  //First Row
    lRow = document.getElementById("inputNum4").value;  //Last Row

    if (checkvalidform(fCol, lCol, fRow, lRow)) {
        tableCreate(fCol, lCol, fRow, lRow);
    } else {
        document.getElementById('table').innerHTML = "";
    }
}

function checkvalidform(fCol, lCol, fRow, lRow){
    //make error id be empty first
    document.getElementById('errorMessage').innerHTML = "";
    
    //Define variables for checking errors
    var colError1, colError2, rowError1, rowError2, valError1, valError2;
    
    //define and declare variable for errorMessage tag and set it is empty
    var errorMess = "";
    
    //Check minimum column input
    //check if it is empty string
    if (fCol == "") {
        colError1 = true;
        errorMess += "'Min Column' value can't be empty<br>";
    // check if it is integer
    } else if (Number(fCol) % 1 == 0 ) {    
        colError1 = false;
    // else need to be integer
    } else {
        colError1 = true;
        errorMess += "'Min Column' value must be an integer<br>";
    }

    //console.log(errorMess);

    //Check maximum column input
    //check if it is empty string
    if (lCol == "") {
        colError2 = true;
        errorMess += "'Max Column' value can't be empty<br>";
    // check if it is integer
    } else if (Number(lCol) % 1 == 0 ) {    
        colError2 = false;
    // else need to be integer
    } else {
        colError2 = true;
        errorMess += "'Max Column' value must be an integer<br>";
    }
    
    //Check minimum row input
    //check if it is empty string
    if (fRow == "") {
        rowError1 = true;
        errorMess += "'Min Row' value can't be empty<br>";
    // check if it is integer
    } else if (Number(fRow) % 1 == 0 ) {    
        rowError1 = false;
    // else need to be integer
    } else {
        rowError1 = true;
        errorMess += "'Min Row' value must be an integer<br>";
    }

    //console.log(errorMess);

    //Check maximum row input
    //check if it is empty string
    if (lRow == "") {
        rowError2 = true;
        errorMess += "'Max Row' value can't be empty<br>";
    // check if it is integer
    } else if (Number(lRow) % 1 == 0 ) {    
        rowError2 = false;
    // else need to be integer
    } else {
        rowError2 = true;
        errorMess += "'Max Row' value must be an integer<br>";
    }
    
    //Check the max value bigger than min value for Column
    if (Number(fCol) % 1 == 0 && Number(lCol) % 1 == 0){
        //console.log("%O,  %O" ,fCol, lCol);
        if(Number(fCol) > Number(lCol)) {
            valError1 =  true;
            errorMess += "'Max Row' value can't smaller than 'Min Row' value <br>";
        } else {
            valError1 = false;
        }
    }
    
    //Check the max value bigger than min value for Row
    if (Number(fRow) % 1 == 0 && Number(lRow) % 1 == 0){
        //console.log("%O,  %O" ,fCol, lCol);
        if(Number(fRow) > Number(lRow)) {
            valError2 =  true;
            errorMess += "'Max Row' value can't smaller than 'Min Row' value <br>";
        } else {
            valError2 = false;
        }
    }
    
    // or logical to return true or false
    if (colError1 || colError2 || rowError1 || rowError2 || valError1 || valError2 == true){
        //print out the Error Message
        document.getElementById('errorMessage').innerHTML = "<br>" + errorMess;
        return false;
    } else {
        return true;
    }
}   

function tableCreate(fCol, lCol, fRow, lRow) {  
    //cast all variable to Number for calculation to print out the dynamic table
    fCol = Number(fCol);
    lCol = Number(lCol);    
    fRow = Number(fRow);    
    lRow = Number(lRow);    
    
    //define and declare variable for CreateTable tag and set it is empty
    var CreateTable = "";
    
    CreateTable += "<table id='style-table'>";
    //console.log('fRow: %O', fRow);        //For debug in Console
    for (var row = 0; row <= (lRow - fRow + 1); row++){
        CreateTable += "<tr>";
        for (var col = 0; col <= (lCol - fCol + 1); col++){
            //console.log('Column: %O', col);   //For debug in Console
            //console.log('Row: %O', row);      //For debug in Console
            if(row == 0){
                CreateTable += "<td class='first'>" + ((col == 0) ? "" : (col + fCol - 1)) + "</td>";
            } else if (col == 0){
                CreateTable += "<td class='first'>" + (row + fRow - 1) + "</td>";
            } else {
                CreateTable += "<td class='rest'>" + ((row + fRow - 1) * (col + fCol - 1)) + "</td>";
            }
        }
        CreateTable += "</tr>";
    }
    CreateTable += "</table>";

    //Print out the Dynamic table
    document.getElementById('table').innerHTML = CreateTable;
}