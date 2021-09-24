 import "./index.html";
 import "./main.css";
 import _ from "lodash";

// Develop below this line
var theTile;
var gameOver = false;
var currentPlayer = "X";
var tileMatrix = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
document.addEventListener("click", clickTile);
document.querySelector(".restart").addEventListener("click", clearTiles);

// function declaration below
function clearTiles() {
  var arrayOfTD = document.querySelectorAll("td");
  let listStep = document.querySelector("ol")
  for (let i = 0; i < arrayOfTD.length; i++) {
    arrayOfTD[i].innerHTML = "";
  }
  listStep.innerHTML = "";
  document.querySelector(".winner-sign").style.visibility = "hidden";
  gameOver = false;
  currentPlayer = "X";
  tileMatrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
}

function clickTile(event) {
  if (
    event.target.nodeName === "TD" &&
    event.target.innerHTML.length === 0 &&
    !gameOver
  ){
    theTile = event.target;
    drawOnTile(theTile);
    displayStep(theTile);
  } else {
    return;
  }
}
function drawOnTile(tile) {
  tile.innerHTML = currentPlayer;
  var tileRow = tile.className[0];
  var tileCol = tile.className[1];
  tileMatrix[tileRow][tileCol] = currentPlayer;

  // here we will check who is the winner
  // checkWinner => boolean
  if (checkWinner(tileRow, tileCol)) {
    gameOver = true;
    document.querySelector(
      ".winner-sign"
    ).innerHTML = `The winner is ${currentPlayer}`;
    document.querySelector(".winner-sign").style.visibility = 'visible';
    return;
  }

  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
}
function checkWinner(tileRow, tileCol) {
  var rowWin = tileMatrix[tileRow].every(function (tile) {
    return tile === currentPlayer;
  });

  var colWin = tileMatrix.every(function (row) {
    return row[tileCol] === currentPlayer;
  });

  var leftToRightDiagWin = tileMatrix.every(function (row, index) {
    return row[index] === currentPlayer;
  });

  var rightToLeftDiagWin = tileMatrix.every(function (row, index) {
    return row[row.length - index - 1] === currentPlayer;
  });
  return rowWin || colWin || leftToRightDiagWin || rightToLeftDiagWin;
}
// showing displaySteps on right side
let turnList = [];
function displayStep(theTile){
  var tileRow = theTile.className[0];
  var tileCol = theTile.className[1];
  let olStep = document.createElement('ol');
  let list = document.createElement('li');
  list.className = 'list';
  let link = document.createElement("a");
  theTile = event.target;
  turnList.push(theTile);
  link.setAttribute('href', '#');
  let output = document.querySelector("#displayStep");
  output.appendChild(list);
  let outText = currentPlayer + " played at "+ " row "+ tileRow + " column " + tileCol;
  let text = document.createTextNode(outText);
  link.appendChild(text);
  list.appendChild(link);
  list.addEventListener("click", function(){
    reverseHistory(output, this)
  })
}
// showing reversHistory 
function reverseHistory(ol, li) {
  let history = document.querySelectorAll('.list');
  let cells = document.querySelectorAll('td');
  let targetIndex = Array.from(history).indexOf(li);
  //console.log(targetIndex, history.length, ol)
  for (let i = targetIndex + 1; i < history.length; i++) {
    document.querySelectorAll('td')[i].innerHTML = "";
    ol.removeChild(history[i]).innerText = "";
    document.getElementById('displayStep')[i].style.visibility = hidden;
  }
}
// removing list from displayStep
document.getElementById("displayStep").addEventListener("click", function(e) {
	if(e.target && e.target.nodeName === "LI") {
    let list = document.querySelectorAll('li');
		let index = Array.from(list).indexOf(e.target);
    let cells = document.querySelectorAll('td');
    for (let j = index + 1; j < turnList.length; j++) {
      let targetId = Array.from(document.querySelectorAll('td')).indexOf(turnList[j]);
      document.querySelectorAll('td')[targetId].innerText = "";
    }
    turnList.splice(index + 1);
    console.log(turnList);
	}
});

