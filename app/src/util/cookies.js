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

export function isVerified() {
    if (new Cookies().get('unverified') === "1") {
        return false;
    }
    return true;
}

export async function authorize(requestOptions) {
    //util cookie/authentication implementation
    const response = await fetch('api/auth/login', requestOptions);
    const data = await response.json();
    const cookie = new Cookies()

    if (data.message === "Successfully logged in") {
        const auth64 = data.Authorization;
        cookie.set('authorization', auth64, {path:'/', maxAge:1200}); //temp 10 minute expiry for cookie
        cookie.set('logged_in', 1, {path:'/', maxAge:1200}); //temp 10 minute expiry for cookie
    }

    if (data.message === "Log in correct, but user is not verified, verify link sent") {
        cookie.set('unverified', 1, {path:'/', maxAge:1200}); //temp 10 minute expiry for cookie
    } else {
        cookie.set('unverified', 0, {path:'/', maxAge:1200}); //temp 10 minute expiry for cookie
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