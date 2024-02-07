'use strict'
const MINE = '💣'
var MINE_IMG = '<img src="img/mine.png">'


var gBoard

var gLevel = {
SIZE: 4,
MINES: 2


}


function onInit(){
    gBoard = buildBoard()
    renderboard(gBoard)

console.log(gBoard)
console.table(gBoard)
}


function buildBoard() {
    const board = []

    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            const cell = {
                // minesAroundCount:
                isShown: false,
                isMine: false
            
            }
            board[i][j] = cell
        }
    }
    board[0][1].isMine = true
    board[2][2].isMine = true
    board[1][1] = MINE
    
    return board
}



function renderboard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            var cellClass = getClassName({ i, j }) + ' '
             cellClass += (currCell.isMine) ? 'mine' : ''
             cellClass += (currCell.isShown) ? 'Shown' : ''
             cellClass += (currCell.isMarked) ? 'Marked' : 

            strHTML += `<td class="cell ${cellClass}" onclick="onCellClicked(this, ${i},${j})" >`

            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }

    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}



function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}

























// function renderboard() {
//     var strHTML = ''
    
//     for (var i = 0; i < gBoard.length; i++) {
//         strHTML += `<tr>\n`
//         for (var j = 0; j < gBoard[0].length; j++) {
//             var cell = gBoard[i][j]
//             // if (cell.isMine) cell = MINE

//             //  className += (cell.isShown) ? 'Shown' : ''
//             //  className += (cell.isMarked) ? '' : 'Marked'
           
//             strHTML += `\t<td class="cell ${'dfs'}" 
//                             onclick="onCellClicked(this, ${i}, ${j})" >
//                          </td>\n`
//         }
//         strHTML += `</tr>\n`
//     }

//     const elBoard = document.querySelector('.board')
//     elBoard.innerHTML = strHTML
// }


function onCellClicked(){



}




// function setMinesNegsCount(board)() {
//     var negsCount = 0;
//     for (var i = gGamerPos.i - 1; i <= gGamerPos.i + 1; i++) {
//         if (i < 0 || i >= gBoard.length) continue;
//         for (var j = gGamerPos.j - 1; j <= gGamerPos.j + 1; j++) {
//             if (j < 0 || j >= gBoard[i].length) continue;
//             if (i === gGamerPos.i && j === gGamerPos.j) continue;
//             const currCell = gBoard[i][j]
//             if (currCell.gameElement === BALL) negsCount++;
//         }
//     }
//     // const elNgsCount = document.querySelector('.negs-count span')
//     // elNgsCount.innerText = negsCount
// }