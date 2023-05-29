var i,x;
var cond = false;
var curr = [];
var ha = ["ሀ", "ሁ", "ሂ", "ሃ", "ሄ", "ህ", "ሆ"];
var le = ["ለ", "ሉ", "ሊ", "ላ", "ሌ", "ል", "ሎ"];
/*eslint-env browser*/

// Function to Swap the two tiles classes and therefore changing their positions
function swapTiles(cell1,cell2) {
  var temp = document.getElementById(cell1).className;
  var temp2 = document.getElementById(cell1).innerHTML;
  document.getElementById(cell1).className = document.getElementById(cell2).className;
  document.getElementById(cell1).innerHTML = document.getElementById(cell2).innerHTML;
  document.getElementById(cell2).className = temp;
  document.getElementById(cell2).innerHTML = temp2;
}

function scramble(){
    document.getElementById("victoryTxt").style.visibility = "hidden";     
    for(var row1 = 1; row1 <= 2; row1++){
        for(var col1=1; col1<=4; col1++){
            if(document.getElementById("cell"+row1+col1).innerHTML == "✅"){
                document.getElementById("cell"+row1+col1).innerHTML = "";
            }
        }
    }
    
    //Use nested loops to access each cell of the 2x4 grid
    for (var row=1;row<=2;row++) { //For each row of the 2x4 grid
       for (var column=1;column<=4;column++) { //For each column in this row

        var row2=Math.floor(Math.random()*2 + 1); //Pick a random row from 1 to 2
        var column2=Math.floor(Math.random()*4 + 1); //Pick a random column from 1 to 4

        swapTiles("cell"+row+column,"cell"+row2+column2); //Swap the look & feel of both cells
      } 
    } 
}
/*
function solve(){
    document.getElementById("victoryTxt").style.visibility = "hidden";     
    for(var row1 = 1; row1 <= 2; row1++){
        for(var col1=1; col1<=4; col1++){
            if(document.getElementById("cell"+row1+col1).innerHTML == "✅"){
                document.getElementById("cell"+row1+col1).innerHTML = "";
            }
        }
    }
    for(var row1 = 1; row1 <= 2; row1++){
        for(var col1=1; col1<=4; col1++){
            if(document.getElementById("cell"+row1+col1).innerHTML == ""){
                swapTiles("cell"+row1+col1, "cell23")
            }
        }
    }
    var i = 0;
    for(var row1 = 1; row1 <= 2; row1++){
        for(var col1=1; col1<=4; col1++){
            //console.log(i);
            if(document.getElementById("cell"+row1+col1).innerHTML != ""){
                document.getElementById("cell"+row1+col1).innerHTML = ha[i]; 
                i++;
            }
        }
    }   
}
*/
function solve(){
    document.getElementById("victoryTxt").style.visibility = "hidden";     
    i = 0;
    for(var row1 = 1; row1 <= 2; row1++){
        for(var col1=1; col1<=4; col1++){
            if(document.getElementById("cell"+row1+col1).innerHTML == ""){
                swapTiles("cell"+row1+col1, "cell23")
            }
            //console.log(i,row1,col1, ha[i]);
            if(document.getElementById("cell"+row1+col1).innerHTML != ""){
                if(i <= 6){
                    document.getElementById("cell"+row1+col1).innerHTML = ha[i]; 
                    i++;
                }
            }
        }
    }
}

/*
    document.getElementById("cell11").innerHTML = "ሀ"; document.getElementById("cell12").innerHTML = "ሁ";
    document.getElementById("cell13").innerHTML = "ሂ"; document.getElementById("cell14").innerHTML = "ሃ";
    document.getElementById("cell21").innerHTML = "ሄ"; document.getElementById("cell22").innerHTML = "ህ";
    document.getElementById("cell24").innerHTML = "ሆ";
    */
function checkWin(){
    document.getElementById("victoryTxt").style.visibility = "hidden";
    if(cond === true){ 
        for(var row1 = 1; row1 <= 2; row1++){
            for(var col1=1; col1<=4; col1++){
                if(document.getElementById("cell"+row1+col1).innerHTML == "✅"){
                    document.getElementById("cell"+row1+col1).innerHTML = "";
                }
            }
        }
        cond = false;
    }
    x = 0;
    for(var row1 = 1; row1 <= 2; row1++){
        for(var col1=1; col1<=4; col1++){
            if(document.getElementById("cell"+row1+col1).innerHTML == ha[x]){
                cond = true;
                //console.log(x,row1,col1, ha[x], cond);
                x++;
            }else if(x < 7){
                cond = false;
                //console.log("HERE: " + cond, x, row1, col1, ha[x])
                break;
            }
        }
    }
    //console.log("-----")
    if(cond == true){
        //console.log("YAY");
        document.getElementById("victoryTxt").style.visibility = "visible";
        document.getElementById("cell24").innerHTML = "✅";
    }
/*
    if(
        document.getElementById("cell11").innerHTML === "ሀ" && document.getElementById("cell12").innerHTML === "ሁ" &&
        document.getElementById("cell13").innerHTML === "ሂ" && document.getElementById("cell14").innerHTML === "ሃ" &&
        document.getElementById("cell21").innerHTML === "ሄ" && document.getElementById("cell22").innerHTML === "ህ" &&
        document.getElementById("cell23").innerHTML === "ሆ"
    ){
        document.getElementById("victoryTxt").style.visibility = "visible";
        document.getElementById("cell24").innerHTML = "✅";
        cond = true;
    }*/
}

function clickTile(row,column) {
        
  var cell = document.getElementById("cell"+row+column);
  var tile = cell.className; 
  
  if (tile!="tile8") {  
       //Checking if white tile on the right
       if (column<4) {
         if ( document.getElementById("cell"+row+(column+1)).className=="tile8") {
           swapTiles("cell"+row+column,"cell"+row+(column+1));
         }
       }
       //Checking if white tile on the left
       if (column>1) {
         if ( document.getElementById("cell"+row+(column-1)).className=="tile8") {
           swapTiles("cell"+row+column,"cell"+row+(column-1));
         }
       } 
      
      // Checking if the white tile on top
      if(row > 1){
          if(document.getElementById("cell"+(row-1)+column).className == "tile8")
            swapTiles("cell"+row+column,"cell"+(row-1)+column);
        }
      // Checking if the white tile is on the bottom
      if(row < 2){
          if(document.getElementById("cell"+(row+1)+column).className == "tile8")
            swapTiles("cell"+row+column,"cell"+(row+1)+column);
        }
  }  
    checkWin();
    //console.log(cond);
}

/*
// Function to Swap the two tiles classes and therefore changing their positions
function swapTiles(cell1,cell2) {
  var temp = document.getElementById(cell1).className; // Storing the first cell classname in temp var
  document.getElementById(cell1).className = document.getElementById(cell2).className; // Changing the class name of the first cell to the second cell
  document.getElementById(cell2).className = temp; // Changing the class name of the second cell to the first cell but using the temp var since the cell 1 class name is now cell 2's
}


function clickTile(row,column) {
  var cell = document.getElementById("cell"+row+column);// asssign the variable cell to the id of the given parameter
  var tile = cell.className; // assign the className in the tile variable
  
  if (tile!="tile2") {  // tile! = tile2 so you can't click the white space
       //Checking if white tile on the right
       if (column<2) {
        // If the blank tile column position is less than two(since it can't be on the right if its all the way to the right) then check if the tile to the right is the blank tile, if it is use the swapTiles() function
         if ( document.getElementById("cell"+row+(column+1)).className=="tile2") {
           swapTiles("cell"+row+column,"cell"+row+(column+1));
           return;
         }
       }
       //Checking if white tile on the left
       if (column>1) {
        // If the blank tile column position is more than one(since it can't be on the left if its all the way to the left) then check if the tile to the left is the blank tile, if it is use the swapTiles() function
         if ( document.getElementById("cell"+row+(column-1)).className=="tile2") {
           swapTiles("cell"+row+column,"cell"+row+(column-1));
           return;
         }
       } 
  }
  
}
*/
