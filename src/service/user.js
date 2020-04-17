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
            name: '',
            data: [],
            info: '',//信息
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
                this.name = response.data.user.name;
                this.succeed = true;
                this.getinfo()
                this.getpay()
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
        // let info={}
        let surl = '/api/user/info'
        axios.get(surl, {
            params: {
                id: this.id
            }
        })
            .then(response => {
                console.log('get用户信息成功', response.data);
                // response.data
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
        // return info
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
        let data = []
        let surl = '/api/user/alluser'
        axios.get(surl, {
            params: {

            }
        })
            .then(response => {
                console.log('get所有员工信息成功', response.data);
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

            })
            .catch(error => {
                console.log('get失败', error);
            })
        return data
    }

    getpay() {
        // let data = []
        // let name=this.name
        let surl = '/api/user/payorll'
        axios.get(surl, {
            params: {
                id: this.id
                // id:1 //测试用的
            }
        })
            .then(response => {
                console.log('工资成功', response.data, response.data[response.data.length - 1]);

                // data.push(response.data)
                for (let i = 0; i < response.data.length - 1; i++) {
                    this.data.push({//员工信息
                        key: response.data[i].id,
                        name: response.data[response.data.length - 1],
                        time: response.data[i].time,
                        basic_wage: response.data[i].basic_wage,
                        subsidy: response.data[i].subsidy,
                        deduction: response.data[i].deduction,
                        pay: response.data[i].pay,
                    });
                }
            })
            .catch(error => {
                console.log('get失败', error);
            })
        console.log('ID和name', this.data);
        // return data
    }
}
const userServer = new UserService();
export default userServer;