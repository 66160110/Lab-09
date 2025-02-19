async function fetchUsers() {
    try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    displayUsers(users);
    } catch (error) {
    console.error('Error fetching users:', error);
    }
    }
    
    function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    
    users.forEach(user => {
    const userDiv = document.createElement('div');
    userDiv.className = 'user';
    userDiv.innerHTML = `
    <h2><a href="user-detail.html?userId=${user.id}">${user.name}</a></h2>
    <p>${user.email}</p>
    `;
    userList.appendChild(userDiv);
    });
    }
    
    // เรียกฟังก์ชัน fetchUsers เมื่อโหลดหน้า
    fetchUsers();