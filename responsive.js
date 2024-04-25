
const cards = document.querySelectorAll('.card');
cards.forEach(card => {card.style.width = `100px`;});
const aspectRatioCard = (cards[0].offsetWidth / cards[0].offsetHeight).toFixed(2);

const adjustCardLayout = () => {
    const container = document.getElementById('flex-container');
    const screenWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const screenHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const numCards = container.querySelectorAll('.card').length;
    const aspectRatio = screenWidth / screenHeight;

    let bestLayout = { rows: 1, columns: numCards };
    
    if (aspectRatio > 1) {
        bestLayout.rows = Math.floor(Math.sqrt(numCards));
        bestLayout.columns = numCards / bestLayout.rows;
    } else if (aspectRatio <= 1){
        bestLayout.columns = Math.floor(Math.sqrt(numCards));
        bestLayout.rows = numCards / bestLayout.columns;
    }
    if (aspectRatio > aspectRatioCard * 2.8){
        bestLayout.rows = Math.floor(Math.pow(numCards, 1/3));
        bestLayout.columns = numCards / bestLayout.rows;
    } else if (aspectRatio <= aspectRatioCard * 0.65) {
        bestLayout.columns = Math.floor(Math.pow(numCards, 1/3));
        bestLayout.rows = numCards / bestLayout.columns;
    }


    console.log(aspectRatio);
    console.log(`
    Columns: ${bestLayout.columns}
    Rows: ${bestLayout.rows}`);

    const maxCardHeight = Math.floor((screenHeight * 0.7) / bestLayout.rows);
    const maxCardWidth = Math.floor(screenWidth / bestLayout.columns);
    console.log(`
    Max Card Height: ${maxCardHeight}
    Max Card Width: ${maxCardWidth}`);

    const cardHeight = maxCardHeight;
    const cardWidth = cardHeight * aspectRatioCard;
    cards.forEach(card => {
        card.style.height = `${cardHeight}px`;
        card.style.width = `${cardWidth}px`;
    });
    container.style.maxWidth = `${(cardWidth * bestLayout.columns) * 1.2}px`;
};

// Initial layout adjustment and on window resize
window.addEventListener('load', adjustCardLayout);
window.addEventListener('resize', adjustCardLayout);
document.addEventListener('click', adjustCardLayout);
