let saveToken = (token) => {
    localStorage.setItem('token', token);
}

let logout = () => {
    localStorage.removeItem('token')
    deleteEmail()
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

let saveEmail = (mail) => {
    localStorage.setItem('mail',mail);
}

let getEmail = () => {
    return localStorage.getItem('mail');
}

let deleteEmail = () => {
    localStorage.removeItem('mail');
}

export const accountService = {saveToken, logout, isLogged, saveEmail, getEmail, deleteEmail}