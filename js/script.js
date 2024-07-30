const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

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
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
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