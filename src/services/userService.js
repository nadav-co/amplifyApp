export const userService = {
    getUsername,
    setUsername
}

const KEY = 'username'

function getUsername() {
    return localStorage.getItem(KEY)
}

function setUsername(username) {
    localStorage.setItem(KEY, username)
}