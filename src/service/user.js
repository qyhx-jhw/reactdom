import {
    extendObservable,
    // observable
} from 'mobx'
import store from 'store'
import axios from 'axios' //消息处理

class UserService {
    constructor(props) {
        extendObservable(this, {
            id: '',  //返回的用户id
            info: '',//信息
            update: '',
            // data: [],
            succeed: false, //登录是否成功
            
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
    register(name, email, phone, password, gender, birthday, IDcard, residence) {
        let url = 'api/user/register'
        axios.post(
            url, {
            name: name,
            email: email,
            phone: phone,
            password: password,
            gender: gender,
            birthday: birthday,
            IDcard: IDcard,
            residence: residence
        })
            .then(function (response) {
                console.log('response', response);
                alert('注册成功')

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getinfo() {
        let surl = '/api/user/info'
        axios.get(surl, {
            params: {
                id: this.id
            }
        })
            .then(response => {
                console.log('get成功', response.data);

                this.info = {//员工信息
                    phone: response.data.phone,
                    name: response.data.name,
                    gender: response.data.gender,
                    birthday: response.data.birthday,
                    IDcard: response.data.IDcard,
                    residence: response.data.residence,
                    email: response.data.email,
                };

            })
            .catch(error => {
                console.log('get失败', error);
            })
    }

    updateuser(name, email, phone, gender, birthday, IDcard, residence) {
        let url = 'api/user/update'
        axios.post(
            url, {
            userid: this.id,
            name: name,
            email: email,
            phone: phone,
            gender: gender,
            birthday: birthday,
            IDcard: IDcard,
            residence: residence
        })
            .then((response) => {
                console.log('修改的返回值', response, response.statusText);
                this.getinfo()
                alert('修改信息成功')
                this.update = (new Date()).getTime()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getalluser() {
        let data=[]
        let surl = '/api/user/alluser'
        axios.get(surl, {
            params: {

            }
        })
            .then(response => {
                console.log('get成功', response.data);
                // const data=[]
                for (let i = 0; i < response.data.length; i++) {
                    
                    data.push({//员工信息
                    id: response.data[i].id,
                    name: response.data[i].name,
                    email: response.data[i].email,
                    phone: response.data[i].phone,
                    gender: response.data[i].gender,
                    birthday: response.data[i].birthday,
                    IDcard: response.data[i].IDcard,
                    residence: response.data[i].residence,
                });
                }
                console.log('get成功222', data);
                // return data
            })
            .catch(error => {
                console.log('get失败', error);
            })
            return data 
    }
}
const userServer = new UserService();
export default userServer;