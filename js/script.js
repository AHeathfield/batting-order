//minimum 8 player, atleast 3 girls

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    const playerCards = document.getElementById('batting-order');
    const notComingContainer = document.getElementById('not-coming');
    let maleCount = 0;
    let femaleCount = 0;
    let battingOrder = [];

    //Need to load in all player containers with attributes
    for (const [name, gender] of Object.entries(PLAYERS)) {
        console.log(`${name}: ${gender}`);
        const playerCard = document.createElement('p');
        
        playerCard.setAttribute('draggable', 'true');
        playerCard.setAttribute('isComing', true);
        if (gender === "male") {
            playerCard.setAttribute('class', 'draggable male');
            maleCount++;
        } else {
            playerCard.setAttribute('class', 'draggable female');
            femaleCount++;
        }
        playerCard.innerHTML = `${name}, (${gender})`;
        playerCards.appendChild(playerCard);
    }

    const containers = document.querySelectorAll('.container');
    const draggables = document.querySelectorAll('.draggable');

    // This makes elements draggable, not sure too much on how it works lol
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
            const afterPlayer = getDragAfterElement(container, e.clientY);
            const selectedPlayer = document.querySelector('.dragging');
            console.log(afterPlayer);
            if (afterPlayer == null) {
                container.appendChild(selectedPlayer);

                //This checks to see the person we are moving into not coming side is male or female to adjust the count
                if (container === notComingContainer) {
                    if (selectedPlayer.classList.contains('male')) {
                        maleCount--;
                    } else {
                        femaleCount--;
                    }
                }

            } else {
                container.insertBefore(selectedPlayer, afterPlayer);
            }
        });
    });

    // Going to take in our container as well as the y position of our mouse so its going to determine mouse position when dragging and its going to return the element that the mouse is hovering over so we will know which one to insert above
    function getDragAfterElement(container, y) {
        //the [...] makes it into an array
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]; //This makes it so we get all the elements except the one we are dragging

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element; //reduce is going to loop through the array and determine which single element is the one that is directly after our mouse cursor based on this y position which we get from the event
    }


    //This will check to see if the spot the player is trying to move to is valid
    function checkValidPlayerSpot(selectedPlayer, afterPlayer, battingOrder) {
        //If the selected player is male then we need to make sure there's not two males before or after

    }

});

