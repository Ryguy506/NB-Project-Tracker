
document.addEventListener('DOMContentLoaded', function() {
    const editBtn = document.querySelectorAll('.edit');
    const editBox = document.querySelector('#editbox');
const editBoxClose = document.querySelector('#closebtn');
const editBoxSave = document.querySelector('#savebtn');
const deleteBtn = document.querySelector('.del')



editBoxClose.addEventListener('click', function () {
    // add style to editBox
    editBox.style.display = 'none'
});


    editBtn.forEach(function(button) {
      button.addEventListener('click', function(event) {
        editBox.style.display = 'flex'
        editBox.style.justifyContent = 'center'
        editBox.style.alignItems = 'center'
        editBox.style.position = 'fixed'
        editBox.style.width = '100%'
        editBox.style.height = '100%'
        editBox.style.backgroundColor = 'rgba(0,0,0,0.5)'
      });
    });


    
  });




//display the box at the center of the screen

