import Cookies from 'universal-cookie';

export function isAuthorized() {
    return new Cookies().get('authorization');
}

export function isLoggedIn() {
    if (new Cookies().get('logged_in') === "1") {
        return true;
    }
    return false;
}

export function authorize(data) {
    //test cookie/authentication implementation
    if (data.message.toLowerCase() === 'successfully logged in.') {
        const auth64 = data.Authorization;
        new Cookies().set('authorization', auth64, {path:'/', maxAge:1200}); //temp 10 minute expiry for cookie
        new Cookies().set('logged_in', 1, {path:'/', maxAge:1200}); //temp 10 minute expiry for cookie
    }
}

export async function deauthorize() {
    const Auth = new Cookies().get('authorization');
    // register logout with backend
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + Auth }
    };
    await fetch('api/auth/logout', requestOptions);

    new Cookies().remove('authorization');
    new Cookies().set('logged_in', 0, {path:'/'});
}