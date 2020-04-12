import { extendObservable, observable } from 'mobx'
import store from 'store'
import axios from 'axios' //消息处理

class UserService {
    constructor(props) {
        extendObservable(this, {
            id: '',
            succeed: false,


        })
    }


    login(phone, password) {
        console.log('userserver', phone, password)

        let url = 'api/user/login'
        axios.post(
            url, {
            phone: phone,
            password: password
        })
            .then(response => {
                console.log('登录返回值', response.data);
                store.set('token', response.data.token, (new Date()).getTime() + (8 * 3600 * 1000));

                this.id = response.data.user.id;
                this.succeed = true;

            })
            .catch(error => {
                console.log('-------', error);
            });

    }
}
const userServer = new UserService();
export default userServer;