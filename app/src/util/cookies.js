import Cookies from 'universal-cookie';

export function isAuthorized() {
    return new Cookies().get('authorization');
}

export function authorize(data) {
    //test cookie/authentication implementation
    if (data.message.toLowerCase() === 'successfully logged in.') {
        const auth64 = data.Authorization;
        new Cookies().set('authorization', auth64, {path:'/', maxAge:600}); //temp 5 minute expiry for cookie
    }
}

export function deauthorize() {
    new Cookies().remove('authorization');
}