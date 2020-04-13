import { extendObservable, observable } from 'mobx'
import store from 'store'
import axios from 'axios' //消息处理

class UserService {
    constructor(props) {
        extendObservable(this, {
            id: '',
            succeed: false,
            msg:''
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
    updateuser(name,email,phone,gender,birthday,IDcard,residence) {
        let url = 'api/user/update'
        axios.post(
            url, {
            userid:this.id,
            name: name,
            email: email,
            phone: phone,
            gender: gender,
            birthday: birthday,
            IDcard: IDcard,
            residence: residence
        })
            .then(function (response) {
                console.log('修改的返回值', response);
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
const userServer = new UserService();
export default userServer;