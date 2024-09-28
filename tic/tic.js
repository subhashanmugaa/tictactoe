window.onload = function() {
    let b = document.getElementById("cl");
    b.addEventListener("click", startGame);
    let sy1, sy2;
    let f = true;
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    let count = 0;

    // Start game and set symbols for Player 1 and Player 2
    function startGame() {
        sy1 = document.getElementById("playerSymbol").value.toLowerCase();
        if (sy1 === "x" || sy1 === "o") {
            sy2 = (sy1 === "x") ? "o" : "x";
            document.getElementById("status").textContent = `Player 1 is ${sy1.toUpperCase()}, Player 2 is ${sy2.toUpperCase()}. Player 1's turn.`;
            document.getElementById("result").textContent = ""; // Clear previous results
            resetBoard(); // Reset the board when a new game starts
        } else {
            showToast("Please enter a valid symbol: x or o");
        }
    }

    // Show toast notification
    function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.className = "toast show";
        setTimeout(() => { 
            toast.className = toast.className.replace("show", ""); 
        }, 3000);
    }

    // Get all cells and add event listeners for clicks
    const cells = Array.from(document.getElementsByClassName("cell"));
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleMove(cell, Math.floor(index / 3), index % 3));
    });

    // Handle a move by a player
    function handleMove(cell, i, j) {
        if (!sy1) {
            showToast("Please enter Player 1's symbol to start the game.");
            return;
        }

        if (board[i][j] === "") {
            cell.textContent = f ? sy1.toUpperCase() : sy2.toUpperCase();
            cell.classList.add("taken");
            board[i][j] = f ? sy1 : sy2;
            f = !f;
            count++;
            document.getElementById("status").textContent = `Player ${f ? "1" : "2"}'s turn (${f ? sy1.toUpperCase() : sy2.toUpperCase()})`;

            checkWin();
        } else {
            showToast("This cell is already taken. Please choose another one.");
        }
    }

    // Check if there is a winner or if it's a draw
    function checkWin() {
        let winner = null;

        // Check rows, columns, and diagonals for a win
        for (let row = 0; row < 3; row++) {
            if (board[row][0] === board[row][1] && board[row][1] === board[row][2] && board[row][0] !== "") {
                winner = board[row][0];
            }
        }
        for (let col = 0; col < 3; col++) {
            if (board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] !== "") {
                winner = board[0][col];
            }
        }
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
            winner = board[0][0];
        }
        if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0] !== "") {
            winner = board[2][0];
        }

        if (winner) {
            showToast(`Player with ${winner.toUpperCase()} wins!`);
            resetBoard();
        } else if (count === 9) {
            showToast("It's a draw!");
            resetBoard();
        }
    }

    // Reset the board after a game ends
    function resetBoard() {
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("taken"); // Reset the class for visual indication
        });
        f = true;
        count = 0;
        document.getElementById("status").textContent = `Game reset. Player 1's turn (${sy1.toUpperCase()})`;
    }
};
