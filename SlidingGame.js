var i,x,r;
r = 0;
var cond = false;
var curr = [];
var alp = ["ሀ", "ሁ", "ሂ", "ሃ", "ሄ", "ህ", "ሆ", "ለ", "ሉ", "ሊ", "ላ", "ሌ", "ል", "ሎ", "መ", "ሙ", "ሚ", "ማ", "ሜ", "ም", "ሞ"];
						
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
function switchLvl(n){
    r=n;
    solve();
}
function restart(){
    r = 0;
    document.getElementsByTagName('body')[0].style.backgroundColor = "#AAAAAA";
    document.getElementById("uwin").style.display = "none";
    //document.getElementsByTagName('h1')[0].style.display = "hidden";
    document.getElementById("all").style.display = "block";
    document.getElementById("restart").style.visibility = "hidden";
    solve();
}
function next(){
    r = r + 7;
    cond = true;
    if(alp[r] != undefined){
        solve();
        //document.getElementById("cell24").innerHTML = "";
        //console.log(">>>> ", r, i, x)
    }else{
        //alert("You Win");
        document.getElementsByTagName('body')[0].style.backgroundColor = "skyblue";
        //document.getElementsByTagName('h1')[0].style.display = "block";
        document.getElementById("uwin").style.display = "block";
        document.getElementById("all").style.display = "none";
        document.getElementById("restart").style.visibility = "visible";
    }
}
function scramble(){
    document.getElementById("victoryTxt").style.visibility = "hidden";     
    document.getElementById("next").style.visibility = "hidden";     
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
function solve(){
    document.getElementById("victoryTxt").style.visibility = "hidden";      
    document.getElementById("next").style.visibility = "hidden";    
    i = r;
    for(var row1 = 1; row1 <= 2; row1++){
        for(var col1=1;  col1<=4; col1++){
            if(document.getElementById("cell"+row1+col1).innerHTML == "" || document.getElementById("cell"+row1+col1).innerHTML == "✅"){
                swapTiles("cell"+row1+col1, "cell23");  
                document.getElementById("cell23").innerHTML = "";
            }
            if(document.getElementById("cell"+row1+col1).innerHTML != ""){
                if(i <= 6+r){
                    //console.log(r, i, alp[i], alp[x]);
                    document.getElementById("cell"+row1+col1).innerHTML = alp[i]; 
                    i++;
                }
            }
        }
    }
}
function checkWin(){
    document.getElementById("victoryTxt").style.visibility = "hidden";  
    document.getElementById("next").style.visibility = "hidden";   
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
    x = r;
    for(var row1 = 1; row1 <= 2; row1++){
        for(var col1=1; col1<=4; col1++){
            if(document.getElementById("cell"+row1+col1).innerHTML == alp[x]){
                //console.log("-------", r, i, alp[i], alp[x]);
                cond = true;
                x++;
            }else if(x<= 6+r){
                cond = false;
                break;
            }
        }
    }
    if(cond == true){
        document.getElementById("victoryTxt").style.visibility = "visible";  
        document.getElementById("next").style.visibility = "visible"; 
        //console.log(x, r, alp[x], cond);
        document.getElementById("cell24").innerHTML = "✅";
    }
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
}