async function fetchUserDetails(userId) {
    try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = await response.json();
    displayUserDetails(user);
    } catch (error) {
    console.error('Error fetching user details:', error);
    }
    }
    
    function displayUserDetails(user) {
    const userDetailDiv = document.getElementById('user-detail');
    userDetailDiv.innerHTML = `
    <h2>${user.name}</h2>
    <p>Email: ${user.email}</p>
    <p>Phone: ${user.phone}</p>
    <p>Website: ${user.website}</p>
    <h3>ที่อยู่:</h3>
    <p>${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
    `;
    
    // ส่ง userId ไปยัง user-posts.html เมื่อคลิกปุ่ม
    document.getElementById('view-posts').onclick = () => {
    window.location.href = `user-posts.html?userId=${user.id}`;
    };
    }
    
    // ดึง userId จาก URL และเรียก fetchUserDetails
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    if (userId) {
    fetchUserDetails(userId);
    }