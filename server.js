const BASE_URL = 'https://jsonplaceholder.typicode.com';

function makeCallbackRequest(endpoint, callback) {
    fetch(`${BASE_URL}${endpoint}`)
        .then(response => response.json())
        .then(data => callback(null, data))
        .catch(err => callback(err, null));
}

function processPostsWithCallbacks() {
    makeCallbackRequest('/posts', (err, posts) => {
        if (err) return console.error(err);
        const sortedPosts = posts.sort((a, b) => b.title.length - a.title.length);
        console.log('\n [Callback] /posts ');
        console.log(sortedPosts.slice(0, 2)); 
    });
}

function processCommentsWithCallbacks() {
    makeCallbackRequest('/comments', (err, comments) => {
        if (err) return console.error(err);
        const sortedComments = comments.sort((a, b) => a.name.localeCompare(b.name));
        console.log('\n [Callback] /comments ');
        console.log(sortedComments.slice(0, 2));
    });
}

function processUsersWithPromises() {
    fetch(`${BASE_URL}/users`)
        .then(response => response.json())
        .then(users => {
            const filteredUsers = users.map(user => ({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone
            }));
            console.log('\n [Promise] /users ');
            console.log(filteredUsers);
        })
        .catch(err => console.error(err));
}

function processTodosWithPromises() {
    fetch(`${BASE_URL}/todos`)
        .then(response => response.json())
        .then(todos => {
            const incompleteTodos = todos.filter(todo => !todo.completed);
            console.log('\n [Promise] /todos ');
            console.log(incompleteTodos.slice(0, 2));
        })
        .catch(err => console.error(err));
}

async function processPostsAsync() {
    try {
        const response = await fetch(`${BASE_URL}/posts`);
        const posts = await response.json();
        const sortedPosts = posts.sort((a, b) => b.title.length - a.title.length);
        console.log('\n [Async/Await] /posts ');
        console.log(sortedPosts);
    } catch (err) {
        console.error(err);
    }
}

async function processCommentsAsync() {
    try {
        const response = await fetch(`${BASE_URL}/comments`);
        const comments = await response.json();
        const sortedComments = comments.sort((a, b) => a.name.localeCompare(b.name));
        console.log('\n [Async/Await] /comments ');
        console.log(sortedComments);
    } catch (err) {
        console.error(err);
    }
}

async function processUsersAsync() {
    try {
        const response = await fetch(`${BASE_URL}/users`);
        const users = await response.json();
        const filteredUsers = users.map(user => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone
        }));
        console.log('\n [Async/Await] /users ');
        console.log(filteredUsers);
    } catch (err) {
        console.error(err);
    }
}

async function processTodosAsync() {
    try {
        const response = await fetch(`${BASE_URL}/todos`);
        const todos = await response.json();
        const incompleteTodos = todos.filter(todo => !todo.completed);
        console.log('\n=== [Async/Await] /todos ===');
        console.log(incompleteTodos);
    } catch (err) {
        console.error(err);
    }
}

async function main() {
    console.log('Привет преподавателю ВебПрогСтСерв от Чишевича Владислава');
    
    processPostsWithCallbacks();
    processCommentsWithCallbacks();
    
    processUsersWithPromises();
    processTodosWithPromises();
    
    await processPostsAsync();
    await processCommentsAsync();
    await processUsersAsync();
    await processTodosAsync();
}

main();
