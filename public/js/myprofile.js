

  const editBtn = document.querySelectorAll('.edit');
  const editBox = document.querySelector('#editbox');
  const editBoxClose = document.querySelector('#closebtn');
  const deleteBtn = document.querySelectorAll('.del')
  const saveBtn = document.querySelector('#saveBtn')



  
editBoxClose.addEventListener('click', function () {
    // add style to editBox
    editBox.style.display = 'none'
  });


  editBtn.forEach(function (button) {
    button.addEventListener('click', function (event) {
   
      editBox.style.display = 'flex'
      editBox.style.justifyContent = 'center'
      editBox.style.alignItems = 'center'
      editBox.style.position = 'fixed'
      editBox.style.width = '100%'
      editBox.style.height = '100%'
      editBox.style.backgroundColor = 'rgba(0,0,0,0.5)'
      const ancestor = event.target.closest('[data-id-project]');
      const id = ancestor.dataset.idProject;
     

      saveBtn.addEventListener('click', function () {
        edit(id)
      }
      )
     
  })

  })

  

  function edit (id) {
  
    console.log(id)
      const title = document.querySelector('#title').value.trim();
      const desc = document.querySelector('#desc').value
      const skills = document.querySelector('#skills').value;
      const email = document.querySelector('#email').value.trim();
      const repo = document.querySelector('#repo').value.trim();
  
     if (title && desc && skills && email && repo) {
      const url = `api/user/edit/${id}`
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ title, desc, skills, email, repo }),
        headers: { 'Content-Type': 'application/json' },
      }).then(function (response) {
        window.location.href = `/profile`
      })
  
    }
    else {
      window.alert('Please fill out all fields')
      return
    }
    
  }





deleteBtn.forEach(function (button) {
    button.addEventListener('click', function (event) {
      const ancestor = event.target.closest('[data-id-project]');
      const id = ancestor.dataset.idProject;
      console.log(id)
      const url = `api/user/delete/${id}`
      fetch(url, {
        method: 'DELETE'
      }).then(function (response) {
        window.location.href = '/profile'

      })

    })
  })





    
