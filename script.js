const board = document.getElementById("flexBoard");
const grid = 10;
let mineCount = 0;
let mineCount2 = 0;
var name1 = [];
var squares = [[]];
let zeroposx = [];
let zeroposy = [];
let winLength = [];
let notFlagged = [];

//stop right click thing from popping up
window.addEventListener(
  "contextmenu",
  function (disable) {
    disable.preventDefault();
  },
  false
);

//use js to make all boxes and assign ids, add click logic, detect wins
{
  for (let i = 1; i <= grid; i++) {
    let col = document.createElement("div");
    col.className = "column";
    col.id = "col" + i.toString();
    board.appendChild(col);

    for (let j = 1; j <= grid; j++) {
      let dev = document.createElement("div");
      let text = document.createElement("div");
      text.classList.add("invisible");
      dev.append(text);

      dev.className = "tile";
      dev.id = i.toString() + j.toString();

      //click stuff
      {
        dev.addEventListener("mousedown", (test) => {
          let regSquareCount = 100 - mineCount2;

          if (test.button == 0) {
            if (text.classList.contains("invisible")) {
              notFlagged.push(null);
              console.log(notFlagged.length);

              text.classList.remove("invisible");
              text.classList.add("visible");

              //checks if amount in notFlagged is equal to total square amount
              if (notFlagged.length == regSquareCount) {
                alert("victory");
              }
            }
          } else {
            if (dev.classList.contains("flagged")) {
              dev.classList.remove("flagged");
            } else {
              dev.classList.add("flagged");
            }
          }
        });
      }
      document.getElementById("col" + i).appendChild(dev);
    }
  }
}

//select all tiles, put in array squares
for (let i = 1; i <= grid; i++) {
  let col = i.toString();
  let rows = [];
  let test = [null];

  for (let j = 1; j <= grid; j++) {
    let row = j.toString();
    rows.push(col + row);
    test.push(document.getElementById(col + row));
  }

  name1.push(rows);
  squares.push(test);
}

//randomly make tiles become mines, add event listener
while (mineCount < grid * 1.5) {
  for (let i = 1; i <= grid; i++) {
    for (let j = 1; j <= grid; j++) {
      let randomness = Math.random() * 10;

      if (
        randomness < 1 &&
        !squares[i][j].firstChild.classList.contains("mine")
      ) {
        squares[i][j].firstChild.classList.add("mine");
        squares[i][j].firstChild.addEventListener("click", (mine) => {
          alert("kaboom");
        });

        mineCount += 1;
      }

      if (mineCount >= grid * 2) {
        break;
      }
      console.log(squares[i][j].className);
    }
  }
  console.log("ran again");
  //doesn't always print right mine #, off a bit
  console.log(mineCount);
}

//loop through all tiles, display correct mine #
for (let i = 1; i <= grid; i++) {
  for (let j = 1; j <= grid; j++) {
    if (squares[i][j].firstChild.classList.contains("mine")) {
      mineCount2++;
    }
  }
}
console.log(mineCount2);

//loop through all surrounding squares, display mines touching it, ignore errors
for (let i = 1; i <= grid; i++) {
  for (let j = 1; j <= grid; j++) {
    let square = [i, j];

    let mTouch = 0;
    for (let ii = -1; ii <= 1; ii++) {
      for (let jj = -1; jj <= 1; jj++) {
        let before = (square[0] + ii).toString();
        let after = (square[1] + jj).toString();

        //magic
        try {
          let sTouch = document.getElementById(before + after);
          if (sTouch.firstChild.classList.contains("mine")) {
            mTouch++;
          }
        } catch (err) {
          console.log(err);
        }
      }
    }

    //if not a mine display mines touching it
    if (
      document
        .getElementById(i.toString() + j.toString())
        .firstChild.classList.contains("mine")
    ) {
    } else {
      document.getElementById(
        square[0].toString() + square[1].toString()
      ).firstChild.innerHTML = mTouch;
    }
  }
}

//idea is to make a 0 square that's revealed reveal all other squares
//first get positions of all squares with 0, except top right
for (let i = 1; i <= grid; i++) {
  for (let j = 1; j <= grid; j++) {
    if (
      squares[i][j].firstChild.innerHTML == "0" &&
      !(squares[i][j].id == "101")
    ) {
      zeroposx.push(i);
      zeroposy.push(j);
    } else if (
      squares[i][j].firstChild.innerHTML == "0" &&
      squares[i][j].id == "101"
    ) {
      document.getElementById("101").addEventListener("click", () => {
        for (let ii = -1; ii <= 0; ii++) {
          for (let jj = 1; jj >= 0; jj--) {
            if (
              document
                .getElementById((10 + ii).toString() + (1 + jj).toString())
                .firstChild.classList.contains("invisible")
            ) {
              document
                .getElementById((10 + ii).toString() + (1 + jj).toString())
                .firstChild.classList.add("visible");
              document
                .getElementById((10 + ii).toString() + (1 + jj).toString())
                .firstChild.classList.remove("invisible");

              notFlagged.push(null);
            }

            console.log("clicked");
            console.log(10 + ii);
            console.log(1 + jj);
          }
        }
      });
    }
  }
}

for (let i = 0; i < zeroposx.length; i++) {
  let pos = zeroposx[i].toString() + zeroposy[i].toString();
  console.log(pos);
  console.log(document.getElementById(zeroposx[i]));

  document.getElementById(pos).addEventListener("click", () => {
    console.log("clicked");

    for (let ii = -1; ii <= 1; ii++) {
      for (let jj = -1; jj <= 1; jj++) {
        try {
          if (
            document
              .getElementById(
                (zeroposx[i] + ii).toString() + (zeroposy[i] + jj)
              )
              .firstChild.classList.contains("invisible")
          ) {
            document
              .getElementById(
                (zeroposx[i] + ii).toString() + (zeroposy[i] + jj)
              )
              .firstChild.classList.add("visible");
            document
              .getElementById(
                (zeroposx[i] + ii).toString() + (zeroposy[i] + jj)
              )
              .firstChild.classList.remove("invisible");

            notFlagged.push(null);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}
