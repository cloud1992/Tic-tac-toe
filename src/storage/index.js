export const saveGameToStorage = (newBoard, newTurn, newWinner) => {
    // save the board in local storage
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    // save the turn in local storage
    window.localStorage.setItem('turn', newTurn);
    // save the winner in local storage
    window.localStorage.setItem('winner', JSON.stringify(newWinner));

}

export const resetGameStorage = () => {
    // reset the game in local storage
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
    window.localStorage.removeItem('winner');
}