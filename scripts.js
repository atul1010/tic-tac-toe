class Player{
    constructor(name, color, parity){
        this.name = name;
        this.color = color;
        this.winParity = parity;
    }
}

let boxes = [], isClicked=new Map();
let step = 0;

let neutralCol = "rgb(18, 105, 185)";
let players = [];
players[0] = new Player("black", "black", 0);
players[1] = new Player("white", "white", 1);

let startBtn = document.getElementById("start");
let playAgain = document.getElementById("playAgain");
let currentPlayer = document.getElementById("currentPlayer");
let currPlayerName = document.getElementById("name");
let currPlayerColor = document.getElementById("color");
let inputDiv = document.getElementsByClassName("players")[0];
let gameDiv = document.getElementsByClassName("all")[0];
let resultDiv = document.getElementsByClassName("resMain")[0];


playAgain.addEventListener("click", restart);
startBtn.addEventListener("click", startGame);



for (let i=0;i<3;i++){
    for (let j=0;j<3;j++){
        let box = document.getElementById("cell"+(i+1)+""+(j+1));
        boxes.push(box);
        boxes[3*i+j].addEventListener('click', onBtnClicked)
        isClicked[box.id]=-1;
    }
}

function onBtnClicked(){
    if (step&1){
        let box = isClicked[this.id];

        if (box===-1){
            isClicked[this.id]=step;
            this.style.background = players[1].color;
            checkWinner(players[1]);
            step++;
        }
        else if (box+1===step){
            isClicked[this.id]=-1;
            this.style.background = neutralCol;
            step--;
        }
    }
    else {
        let box = isClicked[this.id];
        
        if (box===-1){
            isClicked[this.id]=step;
            this.style.background = players[0].color;
            checkWinner(players[0]);
            step++;
        }
        else if (box+1===step){
            isClicked[this.id]=-1;
            this.style.background = neutralCol;
            step--;
        }
    }

    updateCurrentPlayer();
}

function checkWinner(player){
    let sum = 0;
    for (let i=0;i<3;i++){

        // checks row
        sum = 0;
        for (let j=0;j<3;j++){
            if (isClicked[boxes[3*i+j].id]===-1) {
                sum = -1;
                break;
            }
            sum+=isClicked[boxes[3*i+j].id]%2;
        }
        if (sum===3 || sum===0) {
            announceWinner(player);
            return;
        }
        
        // checks column
        sum = 0;
        for (let j=0;j<3;j++){
            if (isClicked[boxes[i+3*j].id]===-1) {
                sum = -1;
                break;
            }
            sum+=isClicked[boxes[i+3*j].id]%2;
        }
        if (sum===3 || sum===0) {
            announceWinner(player);
            return;
        }
    }
    
    // checks main diagonal
    sum = 0;
    for (let j=0;j<3;j++){
        if (isClicked[boxes[4*j].id]===-1) {
            sum = -1;
            break;
        }
        sum+=isClicked[boxes[4*j].id]%2;
    }
    if (sum===3 || sum===0) {
        announceWinner(player);
        return;
    }

    // checks other diagonal
    sum = 0;
    for (let j=0;j<3;j++){
        if (isClicked[boxes[2*j+2].id]===-1) {
            sum = -1;
            break;
        }
        sum+=isClicked[boxes[2*j+2].id]%2;
    }
    if (sum===3 || sum===0) {
        announceWinner(player);
        return;
    }
        
    if (step===8){
        showDraw();
        return;
    }
    
}

// TODO: CREATE SHORT FUNCTION TO CHECK 
// function checkWinner(){
//     // for ()
// }

// // checks for ind^th row or col 
// function checkWin(fun, ind){
    //     let sum = 0;
//     for (let i=0;i<3;i++){
    //         sum+=isClicked[fun(ind)]
//     }
// }

// function getRow(i, j){
    //     return 3*i+j;
// }

// function getCol(i, j){
//     return i+3*j;
// }

// function getDiag(i, j){
//     return 
// }


function announceWinner(player){
    // alert(player.name+" is winner.");
    setTimeout(() => {
        resultDiv.style.visibility = "visible";
        document.getElementById("winnerName").innerHTML=player.name+" is Winner.";
    }, 300);
    
}

function showDraw(){
    resultDiv.style.visibility = "visible";
    document.getElementById("winnerName").innerHTML="<b>Draw</b>";    
}

function restart(){
    resultDiv.style.visibility = "hidden";
    for (let i = 0;i<=8;i++){
        boxes[i].style.background = neutralCol;
        isClicked[boxes[i].id]=-1;
        step = 0;
    }
    updateCurrentPlayer();
}

function startGame(){
    let p1 = document.getElementById('player1').value;
    let p2 = document.getElementById('player2').value;
    
    p1.trim();
    p2.trim();
    if (p1==='' || p2==='') return;
    else {
        players[0].name = p1;
        players[1].name = p2;
        inputDiv.style.visibility = "hidden";
        currentPlayer.style.visibility = "visible";
        updateCurrentPlayer();
    }
    
}

function updateCurrentPlayer(){
    currPlayerName.innerHTML = players[step%2].name+"'s move";
    currPlayerColor.style.background = players[step%2].color;
}