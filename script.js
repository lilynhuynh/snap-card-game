/*
 * Author's Note:
 * Hi, I apologize if some of this code may be a bit messy but I tried my best to document the functionality
 * and process of all of my code. I will note that I did not use ev for any of the premade functions as I was
 * not sure of how to use it properly. Furthermore, I fiddled with the index a bit just to add some ids
 * to some of the elements I was accessing. I look forward to your feedback.
 *
 * - Lily Huynh
 */


//
// Global Variables
//
const dectTotal = 52 // Initialized total available cards in a deck
var cardsRemain = document.getElementById("#cards-remaining") // Number of cards remaining in the deck
var cardsPlayed = document.getElementById("#cards-played") // Number of cards played since last snap
var playerPoints = document.getElementById("#player-score") // Current player score
var opponentPoints = document.getElementById("#opponent-score") // Current opponent score
var snapCount // Current snap counter since last snap
var playedCard // Current card played on the board
var prevCard // Previous card played on the board
var timerEnd = false // Timer boolean based on when progress bar ends

//
// Classes
//

/*
 * This class initializes the card deck and includes two functions: dealCard and shuffle
 *
 * dealCard(): returns the first card at the top of the deck array
 * shuffle(): shuffles the initialized deck array and saves it
 */
class Card_Deck {
    constructor(){
        this.cardDeck = []
        var cardSuits = ["Spades", "Hearts", "Clubs", "Diamonds"]
        var cardRanks = ["King", "Queen", "Jack", "10", "9", "8", "7", "6", "5", "4", "3", "2", "Ace"]
        var cardVals = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

        for (var suit in cardSuits){
            for (var i = 0; i < cardVals.length; i++){
                this.cardDeck.push(new Card(cardRanks[i], cardSuits[suit], cardVals[i]))
            }
        }
    }

    dealCard(){
        return this.cardDeck.pop()
    }

    shuffle(){
        this.cardDeck = shuffleArray(this.cardDeck)
    }
}

/*
 * This class is an individual card in the deck that is created from Class_Deck.
 * It's properties is the card title, suit, rank, number value, and image source string
 * The class includes one function fetchVisual
 *
 * fetchVisual(): gets the current card on the playing board and
 *                updates the card image based on the given cardName
 */
class Card {
    constructor(cardRank, cardSuit, cardValue){
        this.cardName = cardRank + " of " + cardSuit
        this.cardSuit = cardSuit
        this.cardRank = cardRank
        this.cardValue = cardValue
        this.cardImg = "resources/playing-cards/card-" + cardSuit.toLowerCase() + "-" + cardValue + ".png"
    }

    fetchVisual(cardName){
        // Gets the current card on the board and updates the card name with the given cardName
        let curCard = document.getElementById("played-card")
        let curName = document.getElementById("#card-name")
        curName.innerHTML = cardName

        // Updates the current card image to the given card image source
        let newCard = document.createElement("img")
        newCard.alt = "current-card"
        newCard.id = "played-card"
        newCard.src = this.cardImg
        curCard.replaceWith(newCard)
    }
}

var deck; // Global variable for the card deck


//
// Event functions
//

/*
 * This function is activated by the 'New Game' button and initializes the game
 * in the following order:
 *      1. Initializing the game card deck and resetting values to initial states
 *      2. Shuffles the created card deck and deals the first card
 *      3. The first card visual is outputted and the snap counter is incrememented
 */
function onStartNewGame(ev) {
    // 1. Initialization and resetting
    deck = new Card_Deck
    snapCount = 0
    cardsRemain.textContent = dectTotal-1
    cardsPlayed.textContent = snapCount+1
    playerPoints.textContent = 0
    opponentPoints.textContent = 0
    
    // Shuffling and dealing the first card
    deck.shuffle()
    var firstCard = deck.dealCard()
    playedCard = firstCard
    firstCard.fetchVisual(firstCard.cardName)

    // Snap counter started
    snapCount += 1
}

/*
 * This function is activated by pressing the 'Next Card' button and initializes
 * the progress bar animation and updates the following values: cardsRemaining,
 * cardsPlayed, snapCounter, timerBoolean, playedCard, prevCard
 *
 * To break it down, there are some initial checks to see if the the game has started yet,
 * or has ended. If both are false, we update the values of cards remaining and cards
 * played since last snap with the incremented snap value. The current card is now the
 * previous card and the dealed card is the new current card - its visual is fetched.
 */
function onNextCard(ev) {
    // Checks if the game has started
    if (cardsRemain.textContent == 0 && cardsPlayed.textContent == 0){
        alert("Invalid move! Please click 'New Game' to start!")
    }

    // Checks if the game has ended
    else if (cardsRemain.textContent == 0){
        if (parseInt(playerPoints.textContent) == parseInt(opponentPoints.textContent)){
            alert("No more cards left!\nThe game ends in a tie!")
        } else {
            winner = ""
            if (playerPoints.textContent > opponentPoints.textContent){
                winner = "Player"
            } else {
                winner = "Opponent"
            }
            alert("No more cards left!\n" + winner + " wins!")
        }
    }
    
    // Updates listed values above and fetches the new dealed card visual
    else {
        let opponentAnimation = document.querySelector("#opponent-progress")
        resetAnimation(opponentAnimation, onOpponentAnimEnd)
        timerEnd = false
        
        cardsRemain.textContent = cardsRemain.textContent - 1
        snapCount += 1
        cardsPlayed.textContent = snapCount

        prevCard = playedCard
        playedCard = deck.dealCard()
        playedCard.fetchVisual(playedCard.cardName)
    }
}

/*
 * This function is activated by the 'Snap!' button and updates either the player
 * or opponents points based on whether it was in time and a accurate match.
 * There are also initial checks to see if the game has started or ended yet.
 */
function onSnapCard(ev) {
    // Checks if the game has started
    if (cardsRemain.textContent == 0 && cardsPlayed.textContent == 0){
        alert("Invalid move! Please click 'New Game' to start!")
    }

    // Checks if the game has ended
    else if (cardsRemain.textContent == 0){
        if (playerPoints.textContent == opponentPoints.textContent){
            alert("No more cards left!\nThe game ends in a tie!")
        } else {
            winner = ""
            if (parseInt(playerPoints.textContent) > parseInt(opponentPoints.textContent)){
                winner = "Player"
            } else {
                winner = "Opponent"
            }
            alert("No more cards left!\n" + winner + " wins!")
        }
    }

    /*
     * Either the opponent or player is awarded points based on the following criteria:
     *  - If the cards match and the timer has not ended -> player is awarded current snap count
     *  - If the cards match but the timer has ended -> opponent is awarded current snap count
     */
    else {
        if (timerEnd != true){
            if (playedCard.cardValue == prevCard.cardValue){
                playerPoints.textContent = parseInt(playerPoints.textContent) + snapCount
            } else {
                opponentPoints.textContent = parseInt(opponentPoints.textContent) + snapCount
            }
        }
        snapCount = 0
    }
}

/*
 * This function outputs when the animation of the progress bar has ended.
 * it updates the global boolean to be true and checks to see if it is a match
 * but the player missed hitting snap
 */
function onOpponentAnimEnd(ev) {
    console.log("Time's up!") // Visual output to know when time's up in console
    timerEnd = true

    // Checks if the game has started and the first two cards have been dealed
    if (cardsRemain.textContent < 51 && cardsPlayed.textContent != 0){

        // If it is a match and the timer has ended, award the opponent and reset the snap counter
        if (playedCard.cardValue == prevCard.cardValue){
            opponentPoints.textContent = parseInt(opponentPoints.textContent) + snapCount
            snapCount = 0
        }
    }
}


//
// Code to be run once the page is finished loading
//
function setup() {
    //
    // Add event handlers
    //

    // Start new game onclick
    document
        .querySelector("#new-game-input")
        .addEventListener('pointerdown', onStartNewGame)

    // newCard onclick
    document
        .querySelector("#next-card")
        .addEventListener('pointerdown', onNextCard)

    // snap onclick
    document
        .querySelector("#snap-input")
        .addEventListener('pointerdown', onSnapCard)

    // Opponent animation end
    document
        .querySelector("#opponent-progress")
        .addEventListener('animationend', onOpponentAnimEnd)
}

window.onload = setup