import client, { removeAuthorizationHeader, setAuthorizationHeader } from "../../api/client.js";
import storage from '../../utils/storage.js'

export const login = credentials  => {
    
    return client
    .post('/auth/login', credentials )
    .then(({ accessToken }) => {
        setAuthorizationHeader(accessToken);
        if (credentials.rememberMe === 'on'){
           storage.set('token',accessToken);
       }
    })
};

export const logout = () => {
    return Promise.resolve().then(()=> {
        removeAuthorizationHeader();
        storage.remove('token');
    });
};

