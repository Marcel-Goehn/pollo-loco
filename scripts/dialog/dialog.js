const controlBtn = document.getElementById('controls-btn');
const dialog = document.getElementById('overlay');
const wrapper = document.querySelector('.wrapper');
const closeBtn = document.querySelector('.close-btn');

controlBtn.addEventListener('click', () =>{
    openDialog();
});

closeBtn.addEventListener('click', () =>{
    dialog.close();
});


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