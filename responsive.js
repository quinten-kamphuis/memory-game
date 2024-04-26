
const closestFactorToSqrt = n => Array.from({length: n}, (_, i) => i + 1).filter(i => n % i === 0).reduce((acc, x) => Math.abs(x - Math.sqrt(n)) < Math.abs(acc - Math.sqrt(n)) ? x : acc);
const closestFactorToFourthRoot = n => Array.from({length: n}, (_, i) => i + 1).filter(i => n % i === 0).reduce((acc, x) => Math.abs(x - Math.pow(n, 1/4)) < Math.abs(acc - Math.pow(n, 1/4)) ? x : acc);


const adjustCardLayout = () => {
    const container = document.getElementById('grid-container');
    const screenWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const screenHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const aspectRatio = (screenWidth / screenHeight).toFixed(2);
    const cards = document.querySelectorAll('.card');
    const numCards = container.querySelectorAll('.card').length;
    const aspectRatioCard = (cards[0].offsetWidth / cards[0].offsetHeight).toFixed(2);
    
    let bestLayout = { rows: 1, columns: numCards };
    
    if (aspectRatio > 1) {
        bestLayout.rows = closestFactorToSqrt(numCards);
        bestLayout.columns = numCards / bestLayout.rows;
    } else if (aspectRatio <= 1){
        bestLayout.columns = closestFactorToSqrt(numCards);
        bestLayout.rows = numCards / bestLayout.columns;
    }
    if (aspectRatio > aspectRatioCard * 2.8){
        bestLayout.rows = closestFactorToFourthRoot(numCards);
        bestLayout.columns = numCards / bestLayout.rows;
    } else if (aspectRatio <= aspectRatioCard * 0.65) {
        bestLayout.columns = closestFactorToFourthRoot(numCards);
        bestLayout.rows = numCards / bestLayout.columns;
    }
    
    
    // console.log(`
    // Columns: ${bestLayout.columns}
    // Rows: ${bestLayout.rows}`);
    // console.log(`Aspect: ${aspectRatio}`);
    
    
    gridContainer.style.gridTemplateColumns = "auto ".repeat(bestLayout.columns);
    
    const cardHeight = Math.floor((screenHeight * 0.7) / bestLayout.rows);
    const cardWidth = cardHeight * aspectRatioCard;
    
    // console.log(`
    // Card Height: ${cardHeight}
    // Card Width: ${cardWidth}`);
    
    cards.forEach(card => {
        card.style.height = `${cardHeight}px`;
        card.style.width = `${cardWidth}px`;
    });
    container.style.maxWidth = `${(cardWidth * bestLayout.columns) * 1.3}px`;
};

// Initial layout adjustment and on window resize
window.addEventListener('load', adjustCardLayout);
window.addEventListener('resize', adjustCardLayout);
document.addEventListener('click', adjustCardLayout);
