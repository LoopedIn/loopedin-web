const url = require('url');

export const base = 'http://localhost:8000/';

const resolveToBase = (route) =>  url.resolve(base, route);

export const routes = {
    testAuthenticated : resolveToBase('test_authenticated'),
    testUnauthenticated : resolveToBase('test_unauthenticated'),
    createUser: resolveToBase('users/create'),
    getCurrentUser: (id) => url.resolve(resolveToBase('users/logged_in_user_info'), id)
}