



const newPostHandler = async (event) => {
    event.preventDefault();
    const date = new Date();
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const time = date.toLocaleTimeString([], options);
    const repo = document.querySelector('#repo').value.trim();
    const title = document.querySelector('#title').value.trim();
    const desc = document.querySelector('#desc').value.trim();
    const skills = document.querySelector('#skills').value.trim();
    const tags = document.querySelector('#tags').value.trim();
    const colab = document.querySelector('#colab').value.trim();
    if (repo && title && desc && skills && tags) {
        console.log(repo, title, desc, skills, tags, colab , time);
        const response = await fetch(`/api/user/newpost`, {
        method: 'POST',
        body: JSON.stringify({repo, title, desc, skills, tags, colab , time}),
        headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
        // document.location.replace('/');
        alert("Post Created!");
        } else {
        alert(response.statusText);
        }
        
    }

    }

document
    .querySelector('#post')
    .addEventListener('click', newPostHandler);