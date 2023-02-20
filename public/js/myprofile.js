const validRepoUrl = /^https?:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

  const editBtn = document.querySelectorAll('.edit');
  const editBox = document.querySelector('#editbox');
  const editBoxClose = document.querySelector('#closebtn');
  const deleteBtn = document.querySelectorAll('.del')
  const saveBtn = document.querySelector('#saveBtn')
const postUpdated = document.querySelector('#postUpdated')
const postDeleted = document.querySelector('#postDeleted')
const ynDelete = document.querySelector('#ynDelete')
const yesBtn = document.querySelector('#yesBtn')
const noBtn = document.querySelector('#noBtn')

function hide(el) {
    el.style.display = 'none';
  }
  
  function show(el) {
    el.style.display = 'flex';
  }
  
editBoxClose.addEventListener('click', function () {
    hide(editBox)
  });



  editBtn.forEach(function (button) {
    button.addEventListener('click', function (event) {
      show(editBox)
      const ancestor = event.target.closest('[data-id-project]');
      const id = ancestor.dataset.idProject;
  
      const title = event.target.closest('.card').querySelector('.title').innerText
      const description = event.target.closest('.card').querySelector('.desc').innerText
      const skills = event.target.closest('.card').querySelector('.skills').innerText
      const email = event.target.closest('.card').querySelector('.email').innerText
      const github_repo = event.target.closest('.card').querySelector('.repo').getAttribute('href')
  
      document.querySelector('#title').value = title
      document.querySelector('#desc').value = description
      document.querySelector('#skills').value = skills
      document.querySelector('#email').value = email
      document.querySelector('#repo').value = github_repo
  
  
  
      saveBtn.addEventListener('click', function () {
        hide(editBox)
        edit(id)
      }
      )
  
    })

  })

  

 async function edit (id) {
  
    console.log(id)
    const github_repo = document.querySelector('#repo').value.trim();
    const title = document.querySelector('#title').value
    const description  = document.querySelector('#desc').value
    const skills = document.querySelector('#skills').value
    const email = document.querySelector('#email').value.trim();

     if (title && desc && skills && email && repo && validRepoUrl.test(github_repo)) {
      const url = `api/user/edit/${id}`
     const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ github_repo, title, description, email, skills }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
       show(postUpdated)
       setTimeout( function () {
         document.location.replace('/profile');
        }, 1500)
      
      }
      else {
        alert(response.statusText);
      }
  
    }
    else {
      alert('Please fill out all fields')
      return
    }
    
  }





deleteBtn.forEach(function (button) {
    button.addEventListener('click', async function (event) {
      const ancestor = event.target.closest('[data-id-project]');
      const id = ancestor.dataset.idProject;
      console.log(id)
      show(ynDelete)
      yesBtn.addEventListener('click', function () {
        hide(ynDelete)
        deletePost(id)
      }
      )
      noBtn.addEventListener('click', function () {
        hide(ynDelete)
      }
      )

    })
  
  })


async function deletePost (id) {
  const url = `api/user/delete/${id}`
  const response = await fetch(url, {
    method: 'DELETE'
  })

  if (response.ok) {
    show(postDeleted)
    setTimeout( function () {
      document.location.replace('/profile');
     }, 1500)
  
  }
  else {
    alert(response.statusText);
  }
}



    
