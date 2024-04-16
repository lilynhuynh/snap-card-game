//
// This file contains functions shared with students to make some tasks a little simpler
//

// Provides the ability to shuffle an array in-place. N.B. This function alters the order of the given array.
// source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

// Restarts a one-shot css animation and attaches an event handler for when the animation concludes
function resetAnimation(elem, animEndHandler) {
    let copy = elem.cloneNode(true)
    elem.parentNode.replaceChild(copy, elem)

    copy.addEventListener('animationend', animEndHandler)
}
