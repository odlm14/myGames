class MultiplayerBattleshipGame {
    constructor() {
        this.playerName = '';
        this.gameCode = '';
        this.playerId = '';
        this.opponentId = '';
        this.gameId = '';
        this.isPlayer1 = false;
        this.currentTurn = null;
        this.gameStarted = false;
        
        // Données du jeu
        this.boardSize = 10;
        this.myBoard = [];
        this.revealed = [];
        this.shipsPlaced = 0;
        this.myShipsSunk = 0;
        this.enemyShipsSunk = 0;
        this.gameOver = false;
        
        this.shipsData = [
            { size: 5, count: 1, name: 'Cuirassé' },
            { size: 4, count: 2, name: 'Croiseur' },
            { size: 3, count: 3, name: 'Destroyer' },
            { size: 2, count: 4, name: 'Torpilleur' }
        ];
        
        this.attachLoginListeners();
        this.initBoards();
    }

    attachLoginListeners() {
        document.getElementById('createGameBtn').addEventListener('click', () => this.createGame());
        document.getElementById('joinGameBtn').addEventListener('click', () => this.showJoinForm());
        document.getElementById('confirmJoinBtn').addEventListener('click', () => this.joinGame());
        document.getElementById('cancelJoinBtn').addEventListener('click', () => this.hideJoinForm());
        document.getElementById('cancelWaitBtn').addEventListener('click', () => this.cancelWait());
    }

    initBoards() {
        this.myBoard = Array(this.boardSize).fill(null).map(() => Array(this.boardSize).fill(0));
        this.revealed = Array(this.boardSize).fill(null).map(() => Array(this.boardSize).fill(false));
    }

    generateGameCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    createGame() {
        this.playerName = document.getElementById('playerName').value.trim();
        if (!this.playerName) {
            alert('Veuillez entrer votre nom!');
            return;
        }

        this.playerId = firebase.database().ref().push().key;
        this.gameCode = this.generateGameCode();
        this.gameId = this.gameCode;
        this.isPlayer1 = true;

        // Créer la partie dans Firebase
        firebase.database().ref(`games/${this.gameId}`).set({
            code: this.gameCode,
            player1: {
                id: this.playerId,
                name: this.playerName,
                ready: false
            },
            status: 'waiting',
            createdAt: firebase.database.ServerValue.TIMESTAMP
        });

        this.showWaitingScreen();
        this.listenForOpponent();
    }

    showJoinForm() {
        document.getElementById('joinForm').classList.remove('hidden');
    }

    hideJoinForm() {
        document.getElementById('joinForm').classList.add('hidden');
    }

    joinGame() {
        this.playerName = document.getElementById('playerName').value.trim();
        this.gameCode = document.getElementById('gameCode').value.trim().toUpperCase();

        if (!this.playerName) {
            alert('Veuillez entrer votre nom!');
            return;
        }

        if (!this.gameCode || this.gameCode.length !== 6) {
            alert('Code de partie invalide!');
            return;
        }

        this.gameId = this.gameCode;
        this.playerId = firebase.database().ref().push().key;
        this.isPlayer1 = false;

        // Vérifier que la partie existe
        firebase.database().ref(`games/${this.gameId}`).once('value').then((snapshot) => {
            if (!snapshot.exists() || snapshot.val().status !== 'waiting') {
                alert('Partie non trouvée ou déjà commencée!');
                this.hideJoinForm();
                return;
            }

            // Rejoindre la partie
            firebase.database().ref(`games/${this.gameId}/player2`).set({
                id: this.playerId,
                name: this.playerName,
                ready: false
            });

            this.opponentId = snapshot.val().player1.id;
            this.hideJoinForm();
            this.goToPlacement();
            this.listenForGameStart();
        }).catch(() => {
            alert('Erreur lors de la connexion!');
        });
    }

    listenForOpponent() {
        firebase.database().ref(`games/${this.gameId}/player2`).on('value', (snapshot) => {
            if (snapshot.exists()) {
                this.opponentId = snapshot.val().id;
                this.goToPlacement();
            }
        });
    }

    showWaitingScreen() {
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('waitingScreen').classList.add('active');
        document.getElementById('gameCodeDisplay').textContent = this.gameCode;
    }

    cancelWait() {
        if (this.gameId) {
            firebase.database().ref(`games/${this.gameId}`).remove();
        }
        this.resetGame();
    }

    goToPlacement() {
        document.getElementById('waitingScreen').classList.remove('active');
        document.getElementById('placementScreen').classList.add('active');
        document.getElementById('playerName1').textContent = this.playerName;
        this.createPlacementGrid();
        this.renderShipsList();
    }

    createPlacementGrid() {
        const grid = document.getElementById('placementGrid');
        grid.innerHTML = '';
        
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'placement-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                cell.addEventListener('click', () => this.selectCell(row, col, true));
                cell.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.selectCell(row, col, false);
                });
                
                grid.appendChild(cell);
            }
        }
    }

    renderShipsList() {
        const list = document.getElementById('shipsList');
        list.innerHTML = '';
        
        this.shipsData.forEach(ship => {
            for (let i = 0; i < ship.count; i++) {
                const li = document.createElement('li');
                li.textContent = `${ship.name} (${ship.size} cases)`;
                li.className = 'ship-item';
                list.appendChild(li);
            }
        });
    }

    selectCell(row, col, isHorizontal) {
        // Pour la démo, placement aléatoire
        // Dans une vraie implémentation, on permet au joueur de placer
        this.autoPlaceShips();
        document.getElementById('startGameBtn').disabled = false;
    }

    autoPlaceShips() {
        this.initBoards();
        let shipId = 1;
        
        this.shipsData.forEach(shipType => {
            for (let i = 0; i < shipType.count; i++) {
                let placed = false;
                while (!placed) {
                    const isHorizontal = Math.random() > 0.5;
                    const row = Math.floor(Math.random() * this.boardSize);
                    const col = Math.floor(Math.random() * this.boardSize);
                    
                    if (this.canPlaceShip(row, col, shipType.size, isHorizontal)) {
                        this.placeShip(row, col, shipType.size, isHorizontal, shipId);
                        this.shipsPlaced++;
                        placed = true;
                    }
                }
                shipId++;
            }
        });

        this.renderPlacementGrid();
    }

    canPlaceShip(row, col, size, isHorizontal) {
        if (isHorizontal && col + size > this.boardSize) return false;
        if (!isHorizontal && row + size > this.boardSize) return false;

        for (let i = 0; i < size; i++) {
            if (isHorizontal) {
                if (this.myBoard[row][col + i] !== 0) return false;
            } else {
                if (this.myBoard[row + i][col] !== 0) return false;
            }
        }
        return true;
    }

    placeShip(row, col, size, isHorizontal, shipId) {
        if (isHorizontal) {
            for (let i = 0; i < size; i++) {
                this.myBoard[row][col + i] = shipId;
            }
        } else {
            for (let i = 0; i < size; i++) {
                this.myBoard[row + i][col] = shipId;
            }
        }
    }

    renderPlacementGrid() {
        const grid = document.getElementById('placementGrid');
        const cells = grid.querySelectorAll('.placement-cell');
        
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            if (this.myBoard[row][col] > 0) {
                cell.classList.add('placed');
            } else {
                cell.classList.remove('placed');
            }
        });
    }

    startGame() {
        // Sauvegarder la grille dans Firebase
        firebase.database().ref(`games/${this.gameId}/player${this.isPlayer1 ? '1' : '2'}/board`).set(
            this.myBoard.map(row => row.map(cell => cell > 0 ? 1 : 0))
        );

        firebase.database().ref(`games/${this.gameId}/player${this.isPlayer1 ? '1' : '2'}/ready`).set(true);

        // Attendre que les deux joueurs soient prêts
        firebase.database().ref(`games/${this.gameId}`).once('value').then((snapshot) => {
            if (snapshot.val().player1.ready && snapshot.val().player2.ready) {
                this.startActualGame();
            }
        });

        this.listenForGameStart();
    }

    listenForGameStart() {
        firebase.database().ref(`games/${this.gameId}/status`).on('value', (snapshot) => {
            if (snapshot.val() === 'playing') {
                this.startActualGame();
            }
        });
    }

    startActualGame() {
        document.getElementById('placementScreen').classList.remove('active');
        document.getElementById('gameScreen').classList.add('active');
        
        this.gameStarted = true;
        this.currentTurn = this.isPlayer1 ? this.playerId : this.opponentId;

        firebase.database().ref(`games/${this.gameId}/status`).set('playing');
        firebase.database().ref(`games/${this.gameId}/currentTurn`).set(this.currentTurn);

        this.createGameBoards();
        this.updateUI();
        this.listenForGameUpdates();

        // Ajouter listeners des boutons
        document.getElementById('startGameBtn').addEventListener('click', () => this.startGame());
        document.getElementById('cancelPlacementBtn').addEventListener('click', () => this.resetGame());
        document.getElementById('quitGameBtn').addEventListener('click', () => this.quitGame());
    }

    createGameBoards() {
        // Grille personnelle
        const myBoard = document.getElementById('myBoard');
        myBoard.innerHTML = '';
        
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.dataset.type = 'my';
                
                if (this.myBoard[row][col] > 0) {
                    cell.classList.add('ship');
                }
                
                myBoard.appendChild(cell);
            }
        }

        // Grille adverse
        const enemyBoard = document.getElementById('enemyBoard');
        enemyBoard.innerHTML = '';
        
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell enemy-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.dataset.type = 'enemy';
                
                cell.addEventListener('click', () => this.fireShot(row, col));
                
                enemyBoard.appendChild(cell);
            }
        }
    }

    fireShot(row, col) {
        if (!this.gameStarted || this.gameOver) return;
        if (this.currentTurn !== this.playerId) return;
        if (this.revealed[row][col]) return;

        this.revealed[row][col] = true;

        const shot = {
            row: row,
            col: col,
            playerId: this.playerId,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };

        firebase.database().ref(`games/${this.gameId}/shots`).push(shot);
    }

    listenForGameUpdates() {
        firebase.database().ref(`games/${this.gameId}/shots`).on('child_added', (snapshot) => {
            const shot = snapshot.val();
            if (shot.playerId !== this.playerId) {
                this.processEnemyShot(shot.row, shot.col);
            }
        });

        firebase.database().ref(`games/${this.gameId}/currentTurn`).on('value', (snapshot) => {
            this.currentTurn = snapshot.val();
            this.updateUI();
        });
    }

    processEnemyShot(row, col) {
        const shipId = this.myBoard[row][col];
        const isHit = shipId > 0;

        const cell = document.querySelector(`#myBoard .cell[data-row="${row}"][data-col="${col}"]`);
        
        if (isHit) {
            cell.classList.add('hit');
            cell.textContent = '✓';
            
            if (this.isShipSunk(shipId)) {
                this.myShipsSunk++;
                this.updateStats();
            }
        } else {
            cell.classList.add('miss');
            cell.textContent = '✕';
        }

        // Changer de tour
        const nextTurn = this.playerId === this.opponentId ? this.opponentId : this.playerId;
        firebase.database().ref(`games/${this.gameId}/currentTurn`).set(nextTurn);
    }

    isShipSunk(shipId) {
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.myBoard[row][col] === shipId) {
                    const cell = document.querySelector(`#myBoard .cell[data-row="${row}"][data-col="${col}"]`);
                    if (!cell.classList.contains('hit')) return false;
                }
            }
        }
        return true;
    }

    updateStats() {
        document.getElementById('myShipsSunk').textContent = this.myShipsSunk;
        if (this.myShipsSunk === 10) {
            this.endGame(false);
        }
    }

    updateUI() {
        if (!this.gameStarted) return;
        
        const isTurn = this.currentTurn === this.playerId;
        const indicator = document.getElementById('turnIndicator');
        const enemyBoard = document.getElementById('enemyBoard');

        if (isTurn) {
            indicator.textContent = 'À VOUS DE JOUER';
            indicator.className = 'turn-indicator your-turn';
            enemyBoard.classList.remove('disabled');
        } else {
            indicator.textContent = 'Tour de l\'adversaire...';
            indicator.className = 'turn-indicator enemy-turn';
            enemyBoard.classList.add('disabled');
        }
    }

    endGame(victory) {
        this.gameOver = true;
        const message = document.getElementById('gameMessage');
        
        if (victory) {
            message.textContent = '🎉 VICTOIRE! Vous avez coulé tous les navires ennemis!';
            message.className = 'message victory';
        } else {
            message.textContent = '💔 DÉFAITE! Tous vos navires ont été coulés!';
            message.className = 'message defeat';
        }
    }

    quitGame() {
        this.resetGame();
    }

    resetGame() {
        if (this.gameId) {
            firebase.database().ref(`games/${this.gameId}`).remove();
        }

        this.playerId = '';
        this.opponentId = '';
        this.gameCode = '';
        this.gameStarted = false;
        this.gameOver = false;
        this.initBoards();

        document.getElementById('playerName').value = '';
        document.getElementById('gameCode').value = '';
        document.getElementById('loginScreen').classList.add('active');
        document.getElementById('waitingScreen').classList.remove('active');
        document.getElementById('placementScreen').classList.remove('active');
        document.getElementById('gameScreen').classList.remove('active');
    }
}

// Initialiser le jeu au chargement
document.addEventListener('DOMContentLoaded', () => {
    new MultiplayerBattleshipGame();
});
