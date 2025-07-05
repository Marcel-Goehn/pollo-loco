const controlBtn = document.getElementById('controls-btn');
const dialog = document.getElementById('overlay');
const wrapper = document.querySelector('.wrapper');
const closeBtn = document.querySelector('.close-btn');


/**
 * This event listener watches for the onclick event and calls the openDialog function
 */
controlBtn.addEventListener('click', () =>{
    openDialog();
});


/**
 * This event listener watches for the onclick event on the close button when the dialog is opened so it calls the close function on it and returns to the start screen
 */
closeBtn.addEventListener('click', () =>{
    dialog.close();
});


/**
 * This event listener watches for a click outside of the dialog when it's opened so that it will get closed too
 */
dialog.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
        dialog.close();
    };
})


/**
 * This function opens the dialog that contains the information about the game 
 */
function openDialog() {
    dialog.showModal();
}