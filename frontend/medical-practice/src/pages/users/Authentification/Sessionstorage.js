let saveToken = (token) => {
    sessionStorage.setItem('token', token);
}

let logout = () => {
    sessionStorage.removeItem('token');
    deleteEmail();
    removeUserType();
}

let isLogged = () => {
    let token = sessionStorage.getItem('token');
    return !!token
}

let saveEmail = (mail) => {
    sessionStorage.setItem('mail',mail);
}

let getEmail = () => {
    return sessionStorage.getItem('mail');
}

let deleteEmail = () => {
    sessionStorage.removeItem('mail');
}

let saveUserType = (userType) => {
    sessionStorage.setItem('userType',userType);
}

let removeUserType = () => {
    sessionStorage.removeItem('userType');
}

let isDoctor = () => {
    let token = sessionStorage.getItem('userType');
    return token === 'doctor';
}

export const accountService = {saveToken, logout, isLogged, saveEmail, getEmail, deleteEmail, saveUserType, removeUserType, isDoctor}