'use strict'
var gGameInterval
var gCounter = 0


const WALL = 'WALL'
const FLOOR = 'FLOOR'
const BALL = 'BALL'
const GAMER = 'GAMER'

const GAMER_IMG = '<img src="img/gamer.png">'
const BALL_IMG = '<img src="img/ball.png">'

// Model:
var gBoard
var gGamerPos
function onInitGame() {
    gGamerPos = { i: 2, j: 9 }
    gBoard = buildBoard()
    renderBoard(gBoard)


    gGameInterval = setInterval(createRandomsBall, 3000)

}





function buildBoard() {
    // DONE: Create the Matrix 10 * 12 
    // DONE: Put FLOOR everywhere and WALL at edges

    const board = []
    const rowsCount = 10
    const colsCount = 12
    for (var i = 0; i < rowsCount; i++) {
        board.push([])
        for (var j = 0; j < colsCount; j++) {
            board[i][j] = { type: FLOOR, gameElement: null }
            if (i === 0 || i === rowsCount - 1 ||
                j === 0 || j === colsCount - 1) {
                board[i][j].type = WALL
            }
        }
    }

    // DONE: Place the gamer and two balls
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER
    board[5][5].gameElement = BALL
    board[7][2].gameElement = BALL

    return board
}




// Render the board to an HTML table
function renderBoard(board) {

    const elBoard = document.querySelector('.board')
    console.log(elBoard)
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            var cellClass = getClassName({ i, j })
            // console.log('cellClass:', cellClass)

            if (currCell.type === FLOOR) cellClass += ' floor'
            else if (currCell.type === WALL) cellClass += ' wall'

            strHTML += `\t<td class="cell ${cellClass}" onclick="moveTo(${i},${j})" >\n`

            if (currCell.gameElement === GAMER) {
                strHTML += GAMER_IMG
            } else if (currCell.gameElement === BALL) {
                strHTML += BALL_IMG
            }

            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'

    }
    // console.log(strHTML)
    elBoard.innerHTML = strHTML

}

// Move the player to a specific location
function moveTo(i, j) {
    const targetCell = gBoard[i][j]
    // console.log(targetCell)
    if (targetCell.type === WALL) return

    // Calculate distance to make sure we are moving to a neighbor cell
    const iAbsDiff = Math.abs(i - gGamerPos.i)
    const jAbsDiff = Math.abs(j - gGamerPos.j)
    // console.log(iAbsDiff, jAbsDiff)
    // If the clicked Cell is one of the four allowed (up, right, down, left)
    // if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {
    if (iAbsDiff + jAbsDiff === 1) {
        if (targetCell.gameElement === BALL) {
            gCounter++
            console.log('Collecting!')
            ballCollected()
        }

        // DONE: Move the gamer
        // REMOVE FROM
        // MODEL
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null
        console.log(gBoard[gGamerPos.i])
        // DOM
        renderCell(gGamerPos, '')

        // ADD TO
        // MODEL
        gGamerPos.i = i
        gGamerPos.j = j
        gBoard[i][j].gameElement = GAMER
        // DOM
        renderCell(gGamerPos, GAMER_IMG)

    } else {
        console.log('TOO FAR', iAbsDiff, jAbsDiff)
    }

    // endGame(gBoard)
    gamerNeigh(gGamerPos.i, gGamerPos.j, gBoard)

	

   


}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location)
    const elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value
}




// Move the player by keyboard arrows
function onHandleKey(event) {
    // console.log(event)
    const i = gGamerPos.i

    const j = gGamerPos.j

    switch (event.key) {
        case 'ArrowLeft':
            moveTo(i, j - 1)
            break
        case 'ArrowRight':
            moveTo(i, j + 1)
            break
        case 'ArrowUp':
            moveTo(i - 1, j)
            break
        case 'ArrowDown':
            moveTo(i + 1, j)
            break
    }
}

// Returns the class name for a specific cell
function getClassName(location) {
    return `cell-${location.i}-${location.j}`
}


function ballCollected() {
    const elDiv = document.querySelector('.ballcollected')
    elDiv.innerHTML = `<div class="ballcollected">  ${gCounter}</div>`


    playSound()
}

function playSound() {
    const sound = new Audio('sound/pop.mp3')
    sound.play()
}


function gamerNeigh(i, j, gBoard) {
    var numOfNeighbors = countNeighbors(i, j, gBoard)

    const elDiv11 = document.querySelector('.what')
    elDiv11.innerHTML = `<div class="what">number of neighbor: ${numOfNeighbors}</div>`

}



function countNeighbors(cellI, cellJ, mat) {
    var neighborsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
            if (mat[i][j].gameElement === BALL) neighborsCount++
        }
    }
    return neighborsCount
}



// function endGame(board) {

//     for (var i = 0; i < board.length; i++) {
//         for (var j = 0; j < board[0].length; j++) {
//             const currCell = board[i][j]
//             console.log(currCell.gameElement)
//             if (currCell.gameElement !== BALL) {

//                 console.log('dsf')
//                 clearInterval(gGameInterval)

//             }
//         }

//     }

// }




function createRandomsBall() {

    var emptyCells = emptyCellsObjects(gBoard)
    var emptyCell = (drawNum(emptyCells))

    // MODEL
    gBoard[emptyCell.i][emptyCell.j].gameElement = BALL

    // DOM
    renderCell(emptyCell, BALL_IMG)



}



function emptyCellsObjects(board) {

    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            if (currCell.type !== WALL && currCell.gameElement === null) {
                emptyCells.push(
                    { i, j }
                )

            }
        }

    }

    return emptyCells


}





function drawNum(emptyCells) {
    var randIdx = getRandomInt(0, emptyCells.length)
    var num = emptyCells[randIdx]
    emptyCells.splice(randIdx, 1)
    return num
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
