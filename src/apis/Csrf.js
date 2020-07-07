import Api from './Api';
import Cookie from 'js-cookie';

export default {
    getCookie() {
        let token = Cookie.get('XSRF-TOKEN');
        if(token) {
            return new Promise(resolve => {
                resolve(token);
            })
        }

        Api.get('/csrf-cookie');
    }
}