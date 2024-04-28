const menuButton = document.getElementById('menu-btn');
const livesDiv = document.getElementById('lives');
const roundsDiv = document.getElementById('rounds');

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const topBar = document.getElementById('top-bar');
const gridContainer = document.getElementById('grid-container');
const pictureArr = [];

let cardsClickable = true;
let isFirst = true;
let lastClicked = 0;
let lastClickedIndex = 0;
let currentCard;
let numOfSetsFound = 0;
let numOfCards = 18;
let lives = 5;
let currentLives;

const setLives = () => {
    console.log(currentLives)
    let livesString = '❤️';
    for (let i = 1; i < currentLives; i++) {
        livesString += ' ❤️';
    }
    livesDiv.textContent = livesString;
    if (currentLives < 1) livesDiv.textContent = '';
};

const changeAllCards = (cursor, content) => {
    const cards = document.querySelectorAll('.card.unset');
    for (let i = 0; i < cards.length; i++){
        cursor ? cards[i].style.cursor = cursor : null;
        if(content === null) {cards[i].innerText = ''}
    }
};

const disableCards = () => {
    cardsClickable = false;
    changeAllCards('not-allowed')
    setTimeout(() => {
        changeAllCards('pointer')
        cardsClickable = true;
        if (isFirst) {
            isFirst = false;
            return;
        }
        changeAllCards('pointer', null)
        isFirst = true;
    },600);
};

const resetGame = () => {
    pictureArr.splice(0,pictureArr.length);
    numOfSetsFound = 0;
};

const gameWon = () => {
    resetGame();
    gridContainer.innerHTML = `<h1>You Won!</h1>`;
};

const gameLost = () => {
    resetGame();
    gridContainer.innerHTML = `<h1>You Lost!</h1>`;
};

const notASet = () => {
    currentLives--;
    if (currentLives >= 0){
        setLives();
        document.querySelector('#game-screen').style.backgroundColor = '#FFD580';
        setTimeout(() => {
            document.querySelector('#game-screen').style.backgroundColor = 'lightgreen';
        },1200);
    } else {
        gameLost();
    }   
};

const checkForSet = () => {
    if(!isFirst && lastClicked === pictureArr[currentCard]){
        document.getElementById(`card-${currentCard+1}`).className = 'card set';
        document.getElementById(`card-${lastClickedIndex+1}`).className = 'card set';
        numOfSetsFound++;
        if(numOfSetsFound === numOfCards/2){
            gameWon();
        }
    }
    if (!isFirst && lastClicked !== pictureArr[currentCard]){
        notASet();
    }
};

const showCard = (cardDiv) => {
    if(cardDiv.innerText) return;
    if(cardsClickable){
        disableCards();
        checkForSet();
        cardDiv.innerText = pictureArr[currentCard];
        lastClicked = pictureArr[currentCard];
        lastClickedIndex = currentCard;
    }
};

const makePictures = (pictures) => {
    while(pictureArr.length < pictures*2){
        const picture = Math.floor(Math.random() * numOfCards/2 + 1);
        if (!pictureArr.includes(picture)){
            pictureArr.push(picture, picture);
        }
    }
    pictureArr.sort(() => Math.random() - 0.5);
};

const makeCards = () => {
    if (numOfCards % 2 === 1){
        console.warn("The number of cards must be even! It's corrected down.") 
        numOfCards--;
    }
    gridContainer.innerHTML = ``;
    for(i = 1; i <= numOfCards; i++){
        gridContainer.innerHTML += `<div id="card-${i}"class="card unset"></div>`;
    }
    makePictures(numOfCards/2);
};

const showTopBar = () => {
    topBar.style.display = 'flex';
};
 
const startGame = () => {
    showTopBar();
    makeCards();
    currentLives = lives;
    setLives();
    const cardDivs = gridContainer.children;
    for (let i = 0; i < cardDivs.length; i++){
        cardDivs[i].addEventListener('click', () => {
            currentCard = i;
            showCard(cardDivs[i]);
        })
    }
};

const menuScreen = () => {

}

const switchScreen = (section, screen) => {
    const screens = document.querySelector('body').children;
    for (let i = 0; i < screens.length; i++){
        screens[i].style.display = 'none';
    }
    section.style.display = 'flex';
    screen()
};

document.getElementById('singleplayer').addEventListener('click', () => switchScreen(gameScreen, startGame));

menuButton.addEventListener('click', () => switchScreen(startScreen, menuScreen));

// switchScreen(startScreen, menuScreen);
switchScreen(gameScreen, startGame);