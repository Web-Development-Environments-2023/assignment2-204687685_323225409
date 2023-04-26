const dialog = document.getElementById('dialog');

// Close dialog when Esc key is pressed
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' || event.keyCode === 27) {
        dialog.close();
        
    }
});

// Close dialog when clicked outside
dialog.addEventListener('click', event => {
    if (event.target !== dialog) {
        dialog.close();
        
    }
});
function openDialog() {
    dialog.showModal();
    }
