document.addEventListener('DOMContentLoaded', () => {
    const postsList = document.getElementById('posts-list');
    const userId = new URLSearchParams(window.location.search).get('userId'); // ดึง userId จาก URL
    
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then(response => response.json())
    .then(posts => {
    posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    
    const title = document.createElement('h2');
    title.textContent = post.title;
    postElement.appendChild(title);
    
    const viewCommentsButton = document.createElement('button');
    viewCommentsButton.textContent = 'ดูความคิดเห็น';
    postElement.appendChild(viewCommentsButton);
    
    const commentsList = document.createElement('div');
    commentsList.classList.add('comments');
    commentsList.style.display = 'none'; // ซ่อนความคิดเห็น
    
    // ฟังก์ชันจัดการการแสดงความคิดเห็น
    viewCommentsButton.addEventListener('click', () => {
    if (commentsList.style.display === 'none') {
    fetchComments(post.id, commentsList);
    commentsList.style.display = 'block';
    viewCommentsButton.textContent = 'ซ่อนความคิดเห็น'; // เปลี่ยนข้อความปุ่ม
    } else {
    commentsList.style.display = 'none';
    viewCommentsButton.textContent = 'ดูความคิดเห็น'; // เปลี่ยนข้อความปุ่ม
    }
    });
    
    postElement.appendChild(commentsList);
    postsList.appendChild(postElement);
    });
    })
    .catch(error => console.error('Error fetching posts:', error));
    });
    
    function fetchComments(postId, commentsList) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(response => response.json())
    .then(comments => {
    commentsList.innerHTML = ''; // Clear previous comments
    comments.forEach(comment => {
    const commentElement = document.createElement('div');
    commentElement.textContent = `${comment.name}: ${comment.body}`;
    commentsList.appendChild(commentElement);
    });
    })
    .catch(error => console.error('Error fetching comments:', error));
    }