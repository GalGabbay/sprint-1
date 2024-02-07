'use strict'


const MINE_IMG = '<img src="img/mine.png">'

var gBoard
var gLevel = {
    SIZE: 12,
    MINES: 2
}

function onInit() {
    gBoard = buildBoard()
    console.log(gBoard)

    renderBoard(gBoard)

}

function buildBoard() {
    const board = []

    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            var currcell = board[i][j] = {
                minesAroundCount: 4,
                isShown: false,
                isMine: !minesNumber(),
                isMarked: true
            }


        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < gBoard[0].length; j++) {
            const currcell = gBoard[i][j]

            var className = (currcell.isMine) ? 'mine' : ''

            strHTML += `\t<td class="cell ${className}" 
                            onclick="onCellClicked(this, ${i}, ${j})" >`
                            if (currcell.isMine) 
                                strHTML += MINE_IMG
                        
                            strHTML +=         `</td>\n`
        }

        strHTML += `</tr>\n`
    }

    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}



function onSetLevel(level) {
    gLevel.SIZE = level
    onInit()
}

function onCellClicked(elCell, i, j) {

    elCell.classList.add('selected')

    var pos = { i, j }

    document.querySelector('h4 span').innerText = setMinesNegsCount(gBoard, pos.i, pos.j)
    elCell.innerText = setMinesNegsCount(gBoard, pos.i, pos.j)

}

function setMinesNegsCount(board, rowIdx, colIdx) {
    var count = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isMine)
                count++


        }
    }
    gBoard.minesAroundCount = count
    return count
}

function minesNumber() {
    var num
    if (gLevel.SIZE === 4) num = 0.5
    if (gLevel.SIZE === 8) num = 8/14
    if (gLevel.SIZE === 12) num = 12/32
    
     return Math.random() > num
  
}


