const menuButton = document.getElementById('menu');
const scoreDiv = document.getElementById('score');
const timerDiv = document.getElementById('timer');

const gameScreen = document.getElementById('game-screen');
const flexContainer = document.getElementById('flex-container');
const startScreen = document.getElementById('start-screen');
const pictureArr = [];

let cardsClickable = true;
let isFirst = true;
let lastClicked = 0;
let lastClickedIndex = 0;
let numOfSetsFound = 0;
let numOfCards = 18;

const changeAllCards = (cursor, content) => {
    const cards = document.querySelectorAll('.card.unset');
    for (let i = 0; i < cards.length; i++){
        cursor ? cards[i].style.cursor = cursor : null;
        if(content === null) {cards[i].innerText = ''}
    }
};

const disableCards = () => {
    cardsClickable = false;
    document.querySelector('main').style.backgroundColor = '#FFD580';
    changeAllCards('not-allowed')
    setTimeout(() => {
        document.querySelector('main').style.backgroundColor = 'lightgreen';
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
    flexContainer.innerHTML = `<h1>You Won!</h1>`;
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
    if (pictures > 9) {
        console.error('Too many cards for algorithm, infinite loop!');
        return;
    }
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
    flexContainer.innerHTML = ``;
    for(i = 1; i <= numOfCards; i++){
        flexContainer.innerHTML += `<div id="card-${i}"class="card unset"></div>`;
    }
    makePictures(numOfCards/2);
};

const startGame = () => {
    makeCards();
    const cardDivs = flexContainer.children;
    for (let i = 0; i < cardDivs.length; i++){
        cardDivs[i].addEventListener('click', () => {
            showCard(cardDivs[i], i);
        })
    }
};

const menuScreen = () => {

}

const switchScreen = (section, screen) => {
    const screens = document.querySelector('main').children;
    for (let i = 0; i < screens.length; i++){
        screens[i].style.display = 'none';
    }
    section.style.display = 'flex';
    screen()
};

document.getElementById('singleplayer').addEventListener('click', () => switchScreen(flexContainer, startGame));

menuButton.addEventListener('click', () => switchScreen(startScreen, menuScreen));