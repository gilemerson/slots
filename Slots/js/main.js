/// <reference path="jquery.js" />


//File Name: Slots
//Author: Gil Emerson
//Last Modified By: Gil Emerson
//Last Modified: October 29th 2014
//Due Date : October 31, 2014 - 11:59pm
//Revision: Version #3
//Description: Overview:   Use	your accumulated knowledge of the JavaScript and Web technologies and the slot
                           //machine code (provided on	GitHub as a	template) and the Web API of your choice to	create a HTML5
                           //Slot	Machine	game.

// Tally
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var winRatio = 0;
var cherries = 0;
var bananas = 0;
var bars = 0;
var bells = 0;
var grapes = 0;
var oranges = 0;
var sevens = 0;
var blanks = 0;



// Show Player Stats 
function showPlayerStats() {
    winRatio = winNumber / turn;
    $("#jackpot").text(jackpot);
    $("#playerMoney").text(playerMoney);
    $("#playerTurn").text("Turn: " + turn);
    $("#playerWins").text("Wins: " + winNumber);
    $("#playerLosses").text("Losses: " + lossNumber);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + " percent"); /* the percent sign is missing from this custom font... */
}

// Reset the fruit tally
function resetTally() {
    bananas = 0;
    bars = 0;
    bells = 0;
    cherries = 0;
    grapes = 0;
    oranges = 0;
    sevens = 0;
    blanks = 0;
}

// Reset the player stats 
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}

// Check to see if the player won the jackpot 
function checkJackPot() {

    // Compare two 'random' values 
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        jackpotSound.play();
        alert("You Won " + jackpot + " Credit Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}

// Show a win message and increase the players money 
function showWinMessage() {
    playerMoney += winnings;
    $("div#winOrLose").text(winnings + " Credits!");
    resetTally();
    checkJackPot();
}


// Show a loss message and reduce player money 
function showLossMessage() {
    playerMoney -= playerBet;
    jackpot += +playerBet;  //player loss is added to jackpot
    $("div#winOrLose>p").text("You Lost!");
    resetTally();
}

// Check if a value falls within a range of bounds
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

// When called this determines the betLine results and displays the images. 
function Reels() {
    var betLine = [];
    var myImg;
    var outCome = [0, 0, 0];


    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                myImg = "img/blankImage.png";
                betLine[spin] = myImg;
                document.getElementById('resultImg' + [spin]).src = myImg;
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                myImg = "img/bananas.png";
                betLine[spin] = myImg;
                document.getElementById('resultImg' + [spin]).src = myImg;
                bananas++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                myImg = "img/bars.jpg";
                betLine[spin] = myImg;
                document.getElementById('resultImg' + [spin]).src = myImg;
                bars++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                myImg = "img/bells.jpg";
                betLine[spin] = myImg;
                document.getElementById('resultImg' + [spin]).src = myImg;
                bells++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                myImg = "img/cherries.jpg";
                betLine[spin] = myImg;
                document.getElementById('resultImg' + [spin]).src = myImg;
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                myImg = "img/oranges.jpg";
                betLine[spin] = myImg;
                document.getElementById('resultImg' + [spin]).src = myImg;
                oranges++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                myImg = "img/grapes.jpg";
                betLine[spin] = myImg;
                document.getElementById('resultImg' + [spin]).src = myImg;
                grapes++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                myImg = "img/seven.jpg";
                betLine[spin] = myImg;
                document.getElementById('resultImg' + [spin]).src = myImg;
                seven++;
                break;
        }
    }

    return betLine;
}

// Calculates the player's winnings, if any 
function determineWinnings() {
    if (blanks == 0) {
        if (bananas == 3) {
            winnings = playerBet * 10;
        }
        else if (bars == 3) {
            winnings = playerBet * 20;
        }
        else if (bells == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (grapes == 3) {
            winnings = playerBet * 50;
        }
        else if (oranges == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (bars == 2) {
            winnings = playerBet * 2;
        }
        else if (bells == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (grapes == 2) {
            winnings = playerBet * 5;
        }
        else if (oranges == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else {
        lossNumber++;
        showLossMessage();
    }
}

// When the player clicks the spin button the game starts 
$("#spinButton").click(function () {
    playerBet = $("div#betEntry>input").val();

    if (playerMoney == 0) {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            showPlayerStats();
        }
    }
    else if (playerBet > playerMoney) {
        alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet <= 0) {
        alert("All bets must be a positive amount.");
    }
    else if (playerBet <= playerMoney) {
        spinResult = Reels();
        determineWinnings();
        turn++;
        showPlayerStats();
    }
    else {
        alert("Please enter a valid bet amount");
    }

});

// When the reset button is clicked, game statitstics return to default values 
$("#resetButton").click(function () {
    if (confirm("Are you sure you want to reset? \nAll stats will be lost!")) {
        resetAll();
        showPlayerStats();
    }
});

// When the exit button is clicked, the slot machine is closed 
$("#exitButton").click(function () {
    if (confirm("Are you sure you want to exit?")) {
        close();
    }
});
