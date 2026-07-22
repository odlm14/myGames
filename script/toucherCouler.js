class BattleshipGame {
    constructor() {
        this.boardSize = 10;
        this.ships = [
            { size: 5, count: 1 }, // Cuirassé
            { size: 4, count: 2 }, // Croiseurs
            { size: 3, count: 3 }, // Destroyers
            { size: 2, count: 4 }  // Torpilleurs
        ];
        this.board = [];
        this.revealed = [];
        this.shots = 0;
        this.hits = 0;
        this.sunk = 0;
        this.gameOver = false;
        this.totalShips = 0;
        this.shipsDestroyed = 0;
        
        this.init();
    }

    init() {
        this.createBoard();
        this.placeShips();
        this.createGameBoard();
        this.attachEventListeners();
    }

    createBoard() {
        this.board = Array(this.boardSize).fill(null).map(() => 
            Array(this.boardSize).fill(0)
        );
        this.revealed = Array(this.boardSize).fill(null).map(() => 
            Array(this.boardSize).fill(false)
        );
    }

    placeShips() {
        let shipId = 1;
        
        this.ships.forEach(shipType => {
            for (let i = 0; i < shipType.count; i++) {
                let placed = false;
                while (!placed) {
                    const isHorizontal = Math.random() > 0.5;
                    const row = Math.floor(Math.random() * this.boardSize);
                    const col = Math.floor(Math.random() * this.boardSize);
                    
                    if (this.canPlaceShip(row, col, shipType.size, isHorizontal)) {
                        this.placeShip(row, col, shipType.size, isHorizontal, shipId);
                        this.totalShips++;
                        placed = true;
                    }
                }
                shipId++;
            }
        });
    }

    canPlaceShip(row, col, size, isHorizontal) {
        if (isHorizontal) {
            if (col + size > this.boardSize) return false;
            for (let i = 0; i < size; i++) {
                if (this.board[row][col + i] !== 0) return false;
            }
        } else {
            if (row + size > this.boardSize) return false;
            for (let i = 0; i < size; i++) {
                if (this.board[row + i][col] !== 0) return false;
            }
        }
        return true;
    }

    placeShip(row, col, size, isHorizontal, shipId) {
        if (isHorizontal) {
            for (let i = 0; i < size; i++) {
                this.board[row][col + i] = shipId;
            }
        } else {
            for (let i = 0; i < size; i++) {
                this.board[row + i][col] = shipId;
            }
        }
    }

    createGameBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';
        
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.textContent = '';
                gameBoard.appendChild(cell);
            }
        }
    }

    attachEventListeners() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
    }

    handleCellClick(e) {
        if (this.gameOver) return;
        
        const cell = e.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        
        if (this.revealed[row][col]) return;
        
        this.revealed[row][col] = true;
        this.shots++;
        
        const shipId = this.board[row][col];
        
        if (shipId === 0) {
            cell.classList.add('miss');
            cell.textContent = '✕';
        } else {
            cell.classList.add('hit');
            cell.textContent = '✓';
            this.hits++;
            
            if (this.isShipSunk(shipId)) {
                this.sunk++;
                this.shipsDestroyed++;
                this.markShipAsSunk(shipId);
            }
        }
        
        this.updateStats();
        cell.classList.add('disabled');
        
        if (this.shipsDestroyed === this.totalShips) {
            this.endGame(true);
        }
    }

    isShipSunk(shipId) {
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col] === shipId && !this.revealed[row][col]) {
                    return false;
                }
            }
        }
        return true;
    }

    markShipAsSunk(shipId) {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            if (this.board[row][col] === shipId) {
                cell.classList.remove('hit');
                cell.classList.add('ship-sunk');
            }
        });
    }

    updateStats() {
        document.getElementById('shots').textContent = this.shots;
        document.getElementById('hits').textContent = this.hits;
        document.getElementById('sunk').textContent = this.sunk;
    }

    endGame(victory) {
        this.gameOver = true;
        const messageEl = document.getElementById('message');
        
        if (victory) {
            messageEl.textContent = `🎉 Victoire! Vous avez coulé tous les navires en ${this.shots} coups! 🎉`;
            messageEl.classList.add('victory');
        } else {
            messageEl.textContent = `❌ Défaite! Vous n'avez pas réussi...`;
            messageEl.classList.add('defeat');
        }
    }

    reset() {
        this.board = [];
        this.revealed = [];
        this.shots = 0;
        this.hits = 0;
        this.sunk = 0;
        this.gameOver = false;
        this.shipsDestroyed = 0;
        
        document.getElementById('message').textContent = '';
        document.getElementById('message').className = 'message';
        
        this.init();
    }
}

// Initialiser le jeu au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    new BattleshipGame();
});
