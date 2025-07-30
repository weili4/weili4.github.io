

//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
var allpages = document.querySelectorAll(".page");

//select all subtopic pages
function hideall() { //function to hide all pages
    for (let onepage of allpages) { //go through all subtopic pages
        onepage.style.display = "none"; //hide it
    }
}

function show(pgno) { //function to show selected page no
    hideall();
    //select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    onepage.style.display = "block"; //show the page
}

const chicken = document.querySelector('a[href="#chicken"]');
const laksa = document.querySelector('a[href="#laksa"]');
const crab = document.querySelector('a[href="#crab"]');
const kaya = document.querySelector('a[href="#kaya"]');
const roti = document.querySelector('a[href="#roti"]');
const kachang = document.querySelector('a[href="#kachang"]');
const malay = document.querySelector('a[href="#malay"]');
const chinese = document.querySelector('a[href="#chinese"]');
const indian = document.querySelector('a[href="#indian"]');


function showAndScroll(pgno, sectionId) {
    hideall();

    show(pgno);
    
    // Scroll to the specific section
    let section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView();
    }
}

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {show(1);});
page2btn.addEventListener("click", function () {show(2);});
page3btn.addEventListener("click", function () {show(3);});
page4btn.addEventListener("click", function () {show(4);});

// Event listeners for dropdown links
chicken.addEventListener("click", function() {showAndScroll(1, "#chicken");});
laksa.addEventListener("click", function() {showAndScroll(1, "#laksa");});
crab.addEventListener("click", function() {showAndScroll(1, "#crab");});
kaya.addEventListener("click", function() {showAndScroll(2, "#kaya");});
roti.addEventListener("click", function() {showAndScroll(2, "#roti");});
kachang.addEventListener("click", function() {showAndScroll(2, "#kachang");});
malay.addEventListener("click", function() {showAndScroll(3, "#malay");});
chinese.addEventListener("click", function() {showAndScroll(3, "#chinese");});
indian.addEventListener("click", function() {showAndScroll(3, "#indian");});

hideall();
show(1);

/*JS for hamMenu */
const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");
hamBtn.addEventListener("click", toggleMenus);

function toggleMenus() { /*open and close menu*/
    //if menuItemsList dont have the class "menuShow", add it, else remove it
    menuItemsList.classList.toggle("menuShow");
    //if menu is showing (has the class “menuShow”)
    if (menuItemsList.classList.contains("menuShow")) {
        hamBtn.innerHTML = "Close Menu"; //change button text to chose menu
    } else { //if menu NOT showing
        hamBtn.innerHTML = "Open Menu"; //change button text open menu
    }
}

// GAME

// Game variables
let gameActive = false;
let score = 0;
let timeLeft = 30;
let gameTimer;
let ingredientTimer;

// Game elements
const startBtn = document.querySelector('#start-game');
const resetBtn = document.querySelector('#reset-game');
const gameArea = document.querySelector('#game-area');
const scoreElement = document.querySelector('#score');
const timerElement = document.querySelector('#timer');
const gameMessage = document.querySelector('#game-message');
const gameResult = document.querySelector('#game-result');
const resultText = document.querySelector('#result-text');
const playAgainBtn = document.querySelector('#play-again');

// Kaya Toast ingredients (good ones)
const goodIngredients = ['Coconut Milk','Eggs','Pandan','Sugar','Toast','Butter'];

// Wrong ingredients (bad ones)
const badIngredients = ['Chicken','Rice','Chili','Prawns','Noodles','Laksa Leaves','Crab','Tomato'];

// Event listeners
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', startGame);

function startGame() {
    gameActive = true;
    score = 0;
    timeLeft = 30;
    
    // Hide/show elements
    startBtn.style.display = 'none';
    gameMessage.style.display = 'none';
    gameResult.style.display = 'none';
    
    // Update display
    updateScore();
    updateTimer();
    
    // Start timers
    gameTimer = setInterval(updateGameTimer, 1000);
    ingredientTimer = setInterval(createIngredient, 1500);
    
    // Clear any existing ingredients
    clearIngredients();
}

function resetGame() {
    gameActive = false;
    score = 0;
    timeLeft = 30;
    
    // Clear timers
    clearInterval(gameTimer);
    clearInterval(ingredientTimer);
    
    // Clear ingredients
    clearIngredients();
    
    // Reset display
    updateScore();
    updateTimer();
    startBtn.style.display = 'inline-block';
    gameMessage.style.display = 'block';
    gameMessage.textContent = 'Click Start Game to begin!';
    gameResult.style.display = 'none';
}

function updateGameTimer() {
    timeLeft--;
    updateTimer();
    
    if (timeLeft <= 0) {
        endGame('Time\'s up! You scored ' + score + ' points.');
    }
}

function updateScore() {
    scoreElement.textContent = score;
}

function updateTimer() {
    timerElement.textContent = timeLeft;
}

function createIngredient() {
    if (!gameActive) return;
    
    const ingredient = document.createElement('div');
    ingredient.className = 'ingredient';
    
    // Randomly choose good or bad ingredient (70% good, 30% bad)
    const isGood = Math.random() < 0.7;
    
    if (isGood) {
        ingredient.classList.add('good-ingredient');
        ingredient.textContent = goodIngredients[Math.floor(Math.random() * goodIngredients.length)];
        ingredient.dataset.type = 'good';
    } else {
        ingredient.classList.add('bad-ingredient');
        ingredient.textContent = badIngredients[Math.floor(Math.random() * badIngredients.length)];
        ingredient.dataset.type = 'bad';
    }
    
    // Random horizontal position
    const leftPosition = Math.random() * (gameArea.clientWidth - 80);
    ingredient.style.left = leftPosition + 'px';
    ingredient.style.top = '0px';
    
    // Add click event
    ingredient.addEventListener('click', clickIngredient);
    
    // Add to game area
    gameArea.appendChild(ingredient);
    
    // Animate ingredient movement
    animateIngredient(ingredient);
}

function animateIngredient(ingredient) {
    let position = 0;
    let direction = 1;
    const speed = 2;
    const maxHeight = gameArea.clientHeight - 80;
    
    const animation = setInterval(() => {
        if (!gameActive || !ingredient.parentNode) {
            clearInterval(animation);
            return;
        }
        
        position += speed * direction;
        
        // Bounce at top and bottom
        if (position >= maxHeight || position <= 0) {
            direction *= -1;
        }
        
        ingredient.style.top = position + 'px';
        
        // Remove ingredient after some time
        if (Date.now() - ingredient.createdAt > 5000) {
            clearInterval(animation);
            if (ingredient.parentNode) {
                ingredient.remove();
            }
        }
    }, 50);
    
    ingredient.createdAt = Date.now();
}

function clickIngredient(event) {
    const ingredient = event.target;
    const type = ingredient.dataset.type;
    
    if (type === 'good') {
        score += 10;
        if (score >= 100) {
            endGame('Congratulations! You won with ' + score + ' points!');
            return;
        }
    } else {
        score -= 5;
        if (score < 0) score = 0;
    }
    
    updateScore();
    ingredient.remove();
}

function clearIngredients() {
    const ingredients = gameArea.querySelectorAll('.ingredient');
    ingredients.forEach(ingredient => ingredient.remove());
}

function endGame(message) {
    gameActive = false;
    
    // Clear timers
    clearInterval(gameTimer);
    clearInterval(ingredientTimer);
    
    // Clear remaining ingredients
    clearIngredients();
    
    // Show result
    resultText.textContent = message;
    gameResult.style.display = 'block';
    startBtn.style.display = 'inline-block';
}