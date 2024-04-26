const menuButton = document.getElementById('menu');
const scoreDiv = document.getElementById('score');
const timerDiv = document.getElementById('timer');

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const topBar = document.getElementById('top-bar');
const gridContainer = document.getElementById('grid-container');
const pictureArr = [];

let cardsClickable = true;
let isFirst = true;
let lastClicked = 0;
let lastClickedIndex = 0;
let numOfSetsFound = 0;
let numOfCards = 12;

const changeAllCards = (cursor, content) => {
    const cards = document.querySelectorAll('.card.unset');
    for (let i = 0; i < cards.length; i++){
        cursor ? cards[i].style.cursor = cursor : null;
        if(content === null) {cards[i].innerText = ''}
    }
};

const disableCards = () => {
    cardsClickable = false;
    document.querySelector('#game-screen').style.backgroundColor = '#FFD580';
    changeAllCards('not-allowed')
    setTimeout(() => {
        document.querySelector('#game-screen').style.backgroundColor = 'lightgreen';
        changeAllCards('pointer')
        cardsClickable = true;
        if (isFirst) {
            isFirst = false;
            return;
        }
        changeAllCards('pointer', null)
        isFirst = true;
    },1200);
};

const roundWon = () => {
    gridContainer.innerHTML = `<h1>You Won!</h1>`;
};

const checkForSet = (cardNum) => {
    if(!isFirst && lastClicked === pictureArr[cardNum]){
        document.getElementById(`card-${cardNum+1}`).className = 'card set';
        document.getElementById(`card-${lastClickedIndex+1}`).className = 'card set';
        numOfSetsFound++;
        if(numOfSetsFound === numOfCards/2){
            roundWon();
        }
    }
};

const showCard = (cardDiv, cardNum) => {
    if(cardDiv.innerText) return;
    console.log(numOfSetsFound, numOfCards)
    if(cardsClickable){
        disableCards();
        checkForSet(cardNum);
        cardDiv.innerText = pictureArr[cardNum];
        lastClicked = pictureArr[cardNum];
        lastClickedIndex = cardNum;
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
    const cardDivs = gridContainer.children;
    for (let i = 0; i < cardDivs.length; i++){
        cardDivs[i].addEventListener('click', () => {
            showCard(cardDivs[i], i);
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