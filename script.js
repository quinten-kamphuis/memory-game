const menuButton = document.getElementById('menu');
const scoreDiv = document.getElementById('score');
const timerDiv = document.getElementById('timer');

const flexContainer = document.getElementById('flex-container');
const pictureArr = [];
let cardsClickable = true;
let isFirst = true;
let lastClicked = 0;
let lastClickedIndex = 0;
let numOfSets = 0;

const addPicturesToCards = () => {
    console.table(pictureArr);
};

const makePictures = (pictures) => {
    if (pictures > 9) {
        console.error('Too many cards for algorithm, infinite loop!');
        return;
    }
    while(pictureArr.length < pictures*2){
        const picture = Math.floor(Math.random() * 9 + 1);
        if (!pictureArr.includes(picture)){
            pictureArr.push(picture, picture);
        }
    }
    pictureArr.sort(() => Math.random() - 0.5);
    addPicturesToCards();
};

const makeCards = (cards) => {
    if (cards % 2 === 1){
        console.warn("The number of cards must be even! It's corrected down.") 
        cards--;
    }
    flexContainer.innerHTML = ``;
    for(i = 1; i <= cards; i++){
        flexContainer.innerHTML += `<div id="card-${i}"class="card unset"></div>`;
    }
    makePictures(cards/2);
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
    },1000);
};

const showCard = (cardDiv, cardNum) => {
    if(cardDiv.innerText) return;
    if(cardsClickable){
        cardDiv.innerText = pictureArr[cardNum];
        if(!isFirst && lastClicked === pictureArr[cardNum]){
            document.getElementById(`card-${cardNum+1}`).className = 'card set';
            document.getElementById(`card-${lastClickedIndex+1}`).className = 'card set';
        }
        lastClicked = pictureArr[cardNum];
        lastClickedIndex = cardNum;
        disableCards();
    }
};

const startGame = () => {
    makeCards(12);
    const cardDivs = flexContainer.children;
    for (let i = 0; i < cardDivs.length; i++){
        cardDivs[i].addEventListener('click', () => {
            showCard(cardDivs[i], i);
        })
    }
};
startGame();