document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const width =  28;

    let pacmanCurrentIndex = 490;
    let score = 0;

    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]

    const squares = [];
    //Legend
    //0 - pac dot
    //1 - wall
    //2 - ghost lair
    //3 - power pellet
    //4 - empty

    function createBoard(){
        for (let i = 0; i < layout.length; i++){
            const square = document.createElement('div');
            grid.appendChild(square);
            squares.push(square);

            if(layout[i] === 0){
                squares[i].classList.add('pac_dot');
            }
            else if(layout[i] === 1){
                squares[i].classList.add('wall');
            }
            else if(layout[i] === 2){
                squares[i].classList.add('ghost_lair');
            }
            else if(layout[i] === 3){
                squares[i].classList.add('power_pellet');
            }
        }
    }

    createBoard();

    squares[pacmanCurrentIndex].classList.add('pac_man');

    function movePacman(e){
        squares[pacmanCurrentIndex].classList.remove('pac_man');

        switch(e.keyCode){
            case 37:
                if(pacmanCurrentIndex % width !== 0 && 
                    !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex - 1].classList.contains('ghost_lair')){
                        pacmanCurrentIndex -= 1;

                        //check if pacman is in the left exit
                        if(pacmanCurrentIndex - 1 === 363)
                            pacmanCurrentIndex = 391;
                    }                    
                break;
            case 38:
                if(pacmanCurrentIndex - width >= 0 &&
                    !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex - width].classList.contains('ghost_lair'))
                    pacmanCurrentIndex -= width;
                break;
            case 39:
                if(pacmanCurrentIndex % width < width - 1 &&
                    !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex + 1].classList.contains('ghost_lair')){
                        pacmanCurrentIndex += 1;
                        //check if pacman is in the right exit
                        if(pacmanCurrentIndex + 1 === 392)
                            pacmanCurrentIndex = 364;
                    }
                break;
            case 40:
                if(pacmanCurrentIndex + width < width * width &&
                    !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex + width].classList.contains('ghost_lair')) 
                    pacmanCurrentIndex += width;
                break;
        }

        squares[pacmanCurrentIndex].classList.add('pac_man');
        //dot eaten
        pacDotEaten();
        //pow pellet eaten
        powerPelletEaten();
        //game over
        checkForGameOver();
        //win
        checkForWin();
    }

    document.addEventListener('keyup', movePacman);

    function pacDotEaten(){
        if(squares[pacmanCurrentIndex].classList.contains('pac_dot')){
            score++;
            scoreDisplay.innerHTML = score;
            squares[pacmanCurrentIndex].classList.remove('pac_dot');
        }
    }

    function powerPelletEaten(){
        if(squares[pacmanCurrentIndex].classList.contains('power_pellet')){
            score += 10;
            scoreDisplay.innerHTML = score;
            ghosts.forEach(ghost => ghost.isScared = true);
            setTimeout(unScareGhosts, 10000);
            squares[pacmanCurrentIndex].classList.remove('power_pellet');
        }

    }

    function unScareGhosts(){
        ghosts.forEach(ghost => ghost.isScared = false);
    }

    class Ghost{
        constructor(className, startIndex, speed){
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.timerId = NaN;
            this.isScared = false;
        }
    }

    ghosts = [
        new Ghost('blinky', 348, 250),
        new Ghost('pinky', 376, 400),
        new Ghost('inky', 351, 300),
        new Ghost('clyde', 379, 500),
    ]

    ghosts.forEach(ghost =>{
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('ghost');
    });

    //move ghosts 
    ghosts.forEach(ghost => moveGhost(ghost));

    function moveGhost(ghost){
        const directions = [-1, +1, width, -width];
        let direction = directions[Math.floor(Math.random() * directions.length)];

        ghost.timerId = setInterval(() => {
            if(!squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')){
                squares[ghost.currentIndex].classList.remove(ghost.className);
                squares[ghost.currentIndex].classList.remove('ghost', 'scared_ghost');
                ghost.currentIndex += direction;
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
            }
            else
                direction = directions[Math.floor(Math.random() * directions.length)];

            if(ghost.isScared)
                squares[ghost.currentIndex].classList.add('scared_ghost');

            if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac_man')){
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared_ghost');
                ghost.currentIndex =  ghost.startIndex;
                score += 100;
                scoreDisplay.innerHTML = score;
            }
            checkForGameOver();

        }, ghost.speed);
    }

    //check for game over
    function checkForGameOver(){
        if(squares[pacmanCurrentIndex].classList.contains('ghost') && 
        !squares[pacmanCurrentIndex].classList.contains('scared_ghost')){
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keyup', movePacman);
            //setTimeout(alert('Game Over!'), 500);

            scoreDisplay.innerHTML = '  GAME OVER!';
        }
    }

    //check for win
    function checkForWin(){
        if(score === 274){
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keyup', movePacman);
            scoreDisplay.innerHTML = ' YOU\'VE REACHED MAX SCORE! YOU WON!'; 
        }
    }
});