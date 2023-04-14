const gameBoard = document.querySelector("#gameboard")
// this selects the div with the id 'gameboard' and stores in a variable called 'gameBoard'

const information = document.querySelector('#info')
// this selects the div with the id 'info' and stores in a variable called 'information'

let boardCells = [ "", "", "", "", "", "", "", "", "" ]
// this creates the "cells" which make up the board game i.e the rows & columns

let go = "cross"
information.textContent = '❌ Cross goes first'
//display information

function createBoard (){
    // function takes the array of "cells" and for each "cell" takes the index and creates an div element, gives it the name square then appends it to the gameboard (there should be 9 divs called square created)
    boardCells.forEach((cells, index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click', play)
        gameBoard.append(cellElement)
    })
}
createBoard()

function play(e){
    // function creates an element and adds a class name and appends that to the target div
    // you click on a square(div) and that creates and appends a new div with the class name or either 'cross' or 'circle'(whatever the go variable is set to)
    const goPlay = document.createElement('div') 
    goPlay.classList.add(go) 
    e.target.append(goPlay)  
    go = go === 'cross' ? 'circle' : 'cross' // if go is set to 'circle' then set it to 'cross' else set it to 'circle'
    information.textContent = go + " to go" // sets the display information
    e.target.removeEventListener('click', play) // removes the eventlistener from the targeted div so we cant click on the same div twice 
    checkScore()
}


function checkScore(){
const allSquares = document.querySelectorAll('.square')
const winCombo = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // winning columns
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // winning rows
    [0 ,4, 8], [2, 4, 6] // winning diagonals 
]
// loops thru the winning combo's array then loops thru the cells of the array and checks if it has a child element that contains the class name 'cross' 
 winCombo.forEach(array => {
    const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'))
        if(crossWins === true){
            // if all the winning combo's cells have the div with the class name 'cross' change the display information 
        information.textContent = 'Cross Wins!'
        return
    }
})

winCombo.forEach(array => {
    const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'))
        if(circleWins === true){
        information.textContent = 'Circle Wins!'
        return
    }
})

}

function reset() {
    // function to reset the game back to the orginal settings
    boardCells = ["", "", "", "", "", "", "", "", ""]
    gameBoard.innerHTML = "" 
    createBoard()
    go = "cross"
    information.textContent = '❌ Cross goes first'
  }