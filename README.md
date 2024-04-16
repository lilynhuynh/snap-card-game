# The following information below are the assignment details
> All files, except script.js and some of index.html, were not
written by me. I implemented most of the snap functionality as
well as card visualization in script.js and added some IDs and
class names to the HTML for easier implementation of my script


# Snap

> Snap is a card game in which players deal cards and react quickly to spot pairs of cards of the same rank. Cards are either dealt into separate piles around the table, one per player, or (particularly when played with young children) into a single shared pile.
\- *[Snap (card game) Wikipedia entry](https://en.wikipedia.org/wiki/Snap_(card_game))*

This is a single player variation of the game. The rules are outlined below:

1. Begin the game by shuffling the deck.
2. Draw the first card off of the deck and place it in the middle of the playing area.
3. The player can then press the next card button to draw a new card (covering the previous card completely).
4. The player must decide if the values of the current card and the previous card match
    - If the cards match, the player must hit the 'Snap!' button before the opponent timer finishes
        - If the player presses snap before the time elapses, they score a number of points equal to the number of cards played since the last snap.
        - Otherwise, if opponent timer finishes before the player, the opponent is awarded points equal to the number of cards played since the last snap.
    - Otherwise the player may press next card when ready to proceed.
    - In the case that "Snap" is pressed when the cards do no match, the opponent is awarded points equal to the number of cards played since the last snap.
5. The game ends when all cards in the deck have been played.

## TODO list

- [x] `shuffleArray()` implemented for shuffling a deck of cards stored in an array (see `shared.js - ln7`).
- [x] Basic UI layout (HTML and CSS) for game screen.
- [x] Images for each card design (see `resources/playing-cards`).
- [x] Stylised font selected.
- [X] Placeholder functions subbed for primary events and user interactions
- [X] Animation for opponent timer
- [x] Generate a deck of cards
    - N.B. Cards should to have the properties name, suite, rank and image.
- [x] Implement game rules:
    - [x] card comparisons (do the cards match?)
    - [x] Game-state progression and events (next turn, snap match, snap no-match, win game, lose game)
        - [x] score tracking
- [x] UI features
    - [x] Update current card on board
    - [x] Show scores on the board
    - [x] Show remaining cards
    - [x] Show cards played in since the last snap
