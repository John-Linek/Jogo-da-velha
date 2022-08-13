const div_cells = document.querySelectorAll("div.cell");
const div_container = document.querySelector("div.container");
const div_messageBox = document.querySelector("div.winnerMessage");
const p_message = document.querySelector("p.message");
const button_start = document.querySelector("button.startGame");
const list_victory = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let whatPlay = false;
/* Start game. */
const startGame = () =>{
    for(const cell of div_cells){
        cell.addEventListener("click", play, {once:true});
        cell.classList.remove("x", "circle");
    };
    div_messageBox.classList.remove("showBoxMessage");
}
/* check if there is a winner. */
const check_winner = (current_player) => {
    return list_victory.some((combination) => {
        return combination.every((index) => {
            return div_cells[index].classList.contains(current_player);
        });
    });
};
/* check if there is a draw. */
const check_draw = () => {
    return [...div_cells].every(cell =>
        cell.classList.contains("x") || cell.classList.contains("circle")
    )
}
/* End the game */
const endGame = (winner) =>{
    if(winner){
        p_message.innerText = whatPlay ? "X Venceu!" : "O Venceu!";
    }else{
        p_message.innerText = "Empatou!";
    }
    
    div_messageBox.classList.add("showBoxMessage");
}
/* Set the player's turn. */
const add_class = (cell, playNow) => {
    cell.classList.add(playNow);
};
const change = () => {
    whatPlay = !whatPlay;
    div_container.classList.remove("player_1")
    div_container.classList.remove("player_2")
    if(!whatPlay){
        div_container.classList.add("player_1")
    } else{
        div_container.classList.add("player_2")
    };
}
/* Loop game */
const play = (e) =>{
    const cell = e.target;
    const playNow = whatPlay ? "circle" : "x";
    //insert element
    add_class(cell, playNow);
    //change player
    change();
    //winner message.
    const winner = check_winner(playNow);
    const isDraw = check_draw();
    if(winner || isDraw) {
        endGame(winner);
    };
};
/* Start */
startGame();
button_start.addEventListener("click", startGame);