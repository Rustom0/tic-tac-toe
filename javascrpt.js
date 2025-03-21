let boxes = document.querySelectorAll(".box");
let resetG = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-Game");
let playVsAiBtn = document.querySelector("#play-vs-ai"); // Play vs AI button
let msgContainer = document.querySelector(".msg-Container");
let msg = document.querySelector("#msg");

let turn0 = true; // Player O starts
let vsAI = false; // Flag for AI mode

const winPattern = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7],
    [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
];

// Reset the game
const resetGame = () => {
    turn0 = true; // Player O starts
    vsAI = false; // Disable AI mode
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Handle player move (Player O and Player X)
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (turn0 && box.innerText === "") { // Player O's turn
            box.innerText = "O";
            turn0 = false; // Switch turn to Player X or AI
            box.disabled = true;
            checkWinner();

            // If playing against AI, AI will make a move
            if (!turn0 && vsAI) {
                AIMove();
            }
        } else if (!turn0 && !vsAI && box.innerText === "") { // Player X's turn (2-player mode)
            box.innerText = "X";
            turn0 = true; // Switch turn to Player O
            box.disabled = true;
            checkWinner();
        }
    });
});

// AI Move Logic (Random Move for now)
const AIMove = () => {
    let emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
    if (emptyBoxes.length === 0) return; // No move if board is full

    // Choose a random empty box for the AI's move
    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.innerText = "X";
    randomBox.disabled = true;
    turn0 = true; // Switch back to player's turn

    checkWinner();
};

// Disable all boxes (used after game ends)
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Enable all boxes (used for a new game)
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Show the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations! The winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes(); // Disable all boxes after a winner is found
};

// Check for a winner
const checkWinner = () => {
    // Check each winning pattern
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        // If all three positions match and are not empty, we have a winner
        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val); // Show winner
            return;
        }
    }

    // If no winner and board is full, it's a tie
    if ([...boxes].every(box => box.innerText !== "")) {
        msg.innerText = "It's a tie!";
        msgContainer.classList.remove("hide");
        disableBoxes(); // Disable all boxes when there's a tie
    }
};

// Start game vs AI
playVsAiBtn.addEventListener("click", () => {
    vsAI = true; // Enable AI mode when the button is clicked
    //resetGame();  // Start a new game
});

// Attach event listeners to buttons
newGame.addEventListener("click", resetGame);
resetG.addEventListener("click", resetGame);
