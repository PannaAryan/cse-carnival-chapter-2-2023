function submitPost() {
    const name = document.getElementById('name').value || 'Anonymous';
    const problem = document.getElementById('problem').value;
    const tag = document.getElementById('tag').value;

    if (problem && tag) {
        const postContainer = document.getElementById('post-container');
        
        const postElement = document.createElement('div');
        postElement.className = 'post';
        
        const postHtml = `
            <h2>${name} (User)</h2>
            <p>${problem}</p>
            <div class="tag">${tag}</div>
        `;
        
        postElement.innerHTML = postHtml;
        postContainer.appendChild(postElement);
        
        // Clear the form
        document.getElementById('name').value = '';
        document.getElementById('problem').value = '';
        document.getElementById('tag').value = '';
    } else {
        alert('Please describe the problem and add a tag.');
    }
}
