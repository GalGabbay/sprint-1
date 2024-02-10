'use strict'
const FLAG = '🚩'
const MINE = '💥'

var gLevel = {
    SIZE: 4,
    MINES: 2,

}

var gGame
var gBoard


function onInIt() {
    hideModal()
    gGame = {
        isOn: true,
        showCount: 0,
        markedCount: 0,
        secsPassed: 0,
    }
    gBoard = createBoard()
    setMines()
    setMinesNegs()
    renderBoard()
}

function createBoard() {
    var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }

        }

    } return board
}


function setMines() {
    for (var i = 0; i < gLevel.MINES; i++) {
        var mineRandomIdx = minesRandomIdx()
        gBoard[mineRandomIdx.i][mineRandomIdx.j].isMine = true
    }

}

function setMinesNegs() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            gBoard[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j)

        }
    }
}

function setMinesNegsCount(mat, rowIdx, colIdx) {
    var minesAroundCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= mat[0].length) continue
            if (i === rowIdx && j === colIdx) continue
            const cell = mat[i][j]
            if (cell.isMine) minesAroundCount++
        }
    }
    return minesAroundCount
}

function renderBoard() {
    var strHtml = ''

    for (var i = 0; i < gLevel.SIZE; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < gLevel.SIZE; j++) {
            var className =
                strHtml += `<td class="cell cell-${i}-${j}" onclick="onCellClick(this, ${i}, ${j})" oncontextmenu="onRightClick(event, this, ${i}, ${j})"></td>`
        }
        strHtml += '</tr >'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHtml

}

function onCellClick(elCell, i, j) {
    if (gGame.isOn === false) return

    var cell = gBoard[i][j]

    // if (cell.isMine && gGame.showCount === 0) onInIt()

    if (cell.isMine) {
        elCell.classList.add('mine')
        elCell.innerHTML = MINE
        checkGameOver()
    }

    // if (cell.isMarked) return



    if (cell.minesAroundCount) {
        elCell.innerHTML = cell.minesAroundCount
        cell.isShown = true
        elCell.classList.add('shown')
        // checkVictory()
    }

    if (cell.minesAroundCount === 0) {

        expand(elCell, i, j)
    }

    // checkVictory()
}

function expand(elCell, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === rowIdx && j === colIdx) continue
            var currCell = gBoard[i][j]

            if (currCell.minesAroundCount && !currCell.isMine) {
                currCell.isShown = true
                gGame.showCount++

                var elExpCell = document.querySelector(`.cell-${i}-${j}`)
                elExpCell.classList.add('shown')
                elExpCell.innerHTML = currCell.minesAroundCount
            }

            if (currCell.isShown === false && currCell.isMarked === false) {
                currCell.isShown = true
                // gGame.showCount++ 

                var elExpCell = document.querySelector(`.cell-${i}-${j}`)
                elExpCell.classList.add('shown')
                expand(currCell, i, j)

            }

        }
    }
}

function onRightClick(ev, elRcell, i, j) {
    ev.preventDefault()
    var cell = gBoard[i][j]
    if (!cell.isShown && !cell.isMarked) {
        gGame.markedCount++
        cell.isMarked = true
        elRcell.innerHTML = FLAG
        return
    }
    if (cell.isMarked) {
        gGame.markedCount--
        cell.isMarked = false
        elRcell.innerHTML = ''

    }

}

function gameLevel(size, mines) {

    gLevel.SIZE = size
    gLevel.MINES = mines
    onInIt()

}

function checkGameOver() {
    showAllMines()

    showModal('Game Over')
    gGame.isOn = false

}

function showAllMines() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++)
            if (gBoard[i][j].isMine) {

                var elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.classList.add('mine')
                elCell.innerHTML = MINE
            }
    }
}

function checkVictory() {
    if (gGame.showCount === gLevel.SIZE ** 2 - gLevel.MINES &&
        gGame.markedCount === gLevel.MINES) {
        showModal('you won!')
    }

}

function hideModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hide')

}

function showModal(msg) {

    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hide')
    const elH2Modal = document.querySelector('.modal h2')

    elH2Modal.innerHTML = msg
    const elModalBtn = document.querySelector('.modal .btn')
    elModalBtn.innerHTML = 'restart'

}

function restart() {

    onInIt()
}
