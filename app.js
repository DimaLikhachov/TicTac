let main = document.querySelector("#main");
let myBtn = document.querySelector("#myBtn");
let gameValue = "X";
let N;
let allValue = [];
myBtn.addEventListener("click", createGameField);

function createGameField() {
  gameValue = "X";
  main.innerHTML = "";
  let myInpValue = document.querySelector("#myInp").value;
  if (myInpValue < 5) {
    myInpValue = 5;
  } else if (myInpValue > 10) {
    myInpValue = 10;
  }

  N = parseInt(myInpValue);

  allValue = new Array(N).fill(0).map(() => new Array(N).fill(""));
  console.log(allValue);

  let table = document.createElement("table");
  table.classList.add("gameField");
  for (let x = 0; x < N; x++) {
    let tr = document.createElement("tr");

    for (let y = 0; y < N; y++) {
      let td = document.createElement("td");
      td.classList.add("box");
      td.dataset.x = x;
      td.dataset.y = y;
      tr.appendChild(td);
    }

    table.appendChild(tr);
  }

  main.appendChild(table);

  table.addEventListener("click", function(event) {
    const x = event.target.dataset.x;
    const y = event.target.dataset.y;

    makeTurn(x, y);

    const winner = findWinner();
    if (winner) {
      renderWinner(winner);
    }
  });
}

function getBoxByXY(x, y) {
  console.log(document.querySelector(`[data-x="${x}"][data-y="${y}"]`));
  return document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
}

function changeGameValue() {
  switch (gameValue) {
    case "X":
      gameValue = "O";
      return gameValue;
    case "O":
      gameValue = "X";
      return gameValue;
  }
}

function renderWinner(winner) {
  console.log("Win" + winner);

  main.innerHTML = "Победил" + " " + winner;
}

function makeTurn(x, y) {
  allValue[x][y] = gameValue;
  if (getBoxByXY(x, y).innerHTML !== "") {
  } else {
    getBoxByXY(x, y).innerHTML = gameValue;
    changeGameValue();
  }
}

function findWinner() {
  const blockSize = 5;
  for (let offsetX = 0; offsetX < N - blockSize + 1; offsetX++) {
    for (let offsetY = 0; offsetY < N - blockSize + 1; offsetY++) {
      if (checkWinner(allValue, "X", offsetX, offsetY)) {
        return "X";
      }

      if (checkWinner(allValue, "O", offsetX, offsetY)) {
        return "O";
      }
    }
  }

  return null;
}

function checkWinner(map, symb, offsetX, offsetY) {
  return (
    checkDiagonal(map, symb, offsetX, offsetY) ||
    checkLanes(map, symb, offsetX, offsetY)
  );
}

function checkDiagonal(map, symb, offsetX, offsetY) {
  let toright = true;
  let toleft = true;
  const blockSize = 5;

  for (let i = 0; i < blockSize; i++) {
    toright &= map[i + offsetX][i + offsetY] == symb;
    toleft &= map[blockSize - i - 1 + offsetX][i + offsetY] == symb;
  }

  return toright || toleft;
}

function checkLanes(map, symb, offsetX, offsetY) {
  const blockSize = 5;
  let cols, rows;
  for (let col = offsetX; col < blockSize + offsetX; col++) {
    cols = true;
    rows = true;
    for (let row = offsetY; row < blockSize + offsetY; row++) {
      cols &= map[col][row] == symb;
      rows &= map[row][col] == symb;
    }

    if (cols || rows) return true;
  }

  return false;
}
