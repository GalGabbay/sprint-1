'use strict'

const MINE = '💣'
const MINE_IMG = '<img class="mine-img" src="img/mine.png">'

var gTimerInterval
var gBoard
var gLevel = {
    SIZE: 12,
    MINES: 32
}

var gGame = {
    isOn: false,
    showCount: 0,
    markedCount: 0,
    secPassed: 0,

}

var isOnFirstClick = false
var isOnFirstMines = false
var countMines

function onInit() {
    gBoard = buildBoard()
    renderBoard(gBoard)
}

function buildBoard() {
    const board = []

    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: 0,
                isMarked: true
            }
        }
    }

    return board
}

function renderBoard(board) {
    if (isOnFirstClick && isOnFirstMines) return

    var strHTML = ''

    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < gBoard[0].length; j++) {
            const currcell = gBoard[i][j]
         
            var className = getClassName({ i, j }) + ' '

            className += (currcell.isMarked) ? ' mark' : ''

            className += (currcell.isMine) ? ' mine' : ''

            strHTML += `\t<td class="cell ${className}" 
                            onclick="onCellClicked(this, ${i}, ${j})" >`

            strHTML += `</td>\n`
        }

        strHTML += `</tr>\n`
    }

    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
    isOnFirstClick = true
    
    document.querySelector('h4 span').innerText = countMines
}

function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}

function onSetLevel(level) {
    gGame.isOn = false
    isOnFirstClick = false
    isOnFirstMines = false
    clearInterval(gTimerInterval)
    gLevel.SIZE = level
    onInit()
}

function onCellClicked(elCell, i, j) {
    gGame.isOn = true
    clearInterval(gTimerInterval)
    startTimer()
     var pos = { i, j }

    elCell.classList.add('selected')

    if (elCell.classList.contains('selected')) {
        gBoard[i][j].isShown = true
        gGame.showCount++
    }

    if (elCell.classList.contains('mine.selected')) {
        elCell.classList.add('boom')
    }

    elCell.innerText = findMineNegs(gBoard, pos.i, pos.j)

    minesSetup()
    renderBoard()
    isOnFirstMines = true
}

function setMineNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            const count = findMineNegs(board, i, j)
            board[i][j].minesAroundCount = count
        }
    }
}

function findMineNegs(board, rowIdx, colIdx) {
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
    return count
}

function minesSetup() {
    countMines = 0
    var num
    if (gLevel.SIZE === 4) num = 2 / (16)
    if (gLevel.SIZE === 8) num = 14 / (64)
    if (gLevel.SIZE === 12) num = 32 / (144)

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            gBoard[i][j].isMine = Math.random() > num ? false : true
            
        } countMines++
    }  
    gGame.isOnFirstMines = false


}

function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location) // cell-i-j
    const elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value
}


function startTimer() {

    if (gTimerInterval) clearInterval(gTimerInterval)
    var startTime = Date.now()
    gTimerInterval = setInterval(() => {
        const timeDiff = Date.now() - startTime

        const seconds = getFormatSeconds(timeDiff)
        const milliSeconds = getFormatMilliSeconds(timeDiff)
        gGame.secPassed = seconds
        document.querySelector('span.seconds').innerText = seconds
        document.querySelector('span.milli-seconds').innerText = milliSeconds

    }, 10)
}

function getFormatSeconds(timeDiff) {
    const seconds = Math.floor(timeDiff / 1000)
    return (seconds + '').padStart(2, '0')
}

function getFormatMilliSeconds(timeDiff) {
    const milliSeconds = new Date(timeDiff).getMilliseconds()
    return (milliSeconds + '').padStart(3, '0')
}

function gameOver() {

    clearInterval(gTimerInterval)

}

function victory (){


}

document.addEventListener("contextmenu", e => e.preventDefault());
