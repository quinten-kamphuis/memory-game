const menuButton = document.getElementById('menu');
const scoreDiv = document.getElementById('score');
const timerDiv = document.getElementById('timer');

const flexContainer = document.getElementById('flex-container');

const makePictures = (pictures) => {
    if (pictures > 9) {
        console.error('Too many cards for algorithm, infinite loop!');
        return;
    }
    const uniquePictures = [];
    while(uniquePictures.length < pictures){
        const picture = Math.floor(Math.random() * 9 + 1);
        if (!uniquePictures.includes(picture)){
            uniquePictures.push(picture);
        }
    }
    const pictureArr = [...uniquePictures, ...uniquePictures];
    console.table(pictureArr);
    return pictureArr;
};
const addPicturesToCards = (pictureArr) => {

};

const makeCards = (cards) => {
    if (cards % 2 === 1){
        console.warn('The number of cards must be even! Corrected down.') 
        cards--;
    }
    flexContainer.innerHTML = ``;
    for(i = 1; i <= cards; i++){
        flexContainer.innerHTML += `<div id="card-${i}"class="card">?</div>`;
    }
    return makePictures(cards/2);
};

const showCard = (card) => {
    console.log(card)
};


const startGame = () => {
    const pictureArr = makeCards(12);
    const cardDivs = flexContainer.children;
    for (let i = 0; i < cardDivs.length; i++){
        cardDivs[i].addEventListener('click', () => {
            showCard(i, pictureArr);
        })
    }
};
startGame();