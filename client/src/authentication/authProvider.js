import decodeJwt from 'jwt-decode';

const authProvider = {
    //login-ben username-t kell hasznalni, mert az a neve a felso beviteli mezonek
    login: ({ username, password }) =>  {
        const request = new Request('http://localhost:3000/puser/login', {
            method: 'POST',
            body: JSON.stringify({ email: username, password: password, adminfront: true }),
            headers: new Headers({ 'Content-Type': 'application/json'}),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({token}) => {
                const decodedToken = decodeJwt(token);
                localStorage.setItem('token', JSON.stringify(token));
                localStorage.setItem('permissions', decodedToken.permissions);
            });
    },
    getIdentity: () => {
        const { email, userId, permissions } = JSON.parse(localStorage.getItem('token'));
        return { email, userId, permissions };
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        return Promise.resolve();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => localStorage.getItem('token')
        ? Promise.resolve()
        : Promise.reject(),
    getPermissions: () => {
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject();
    }
};

export default authProvider;