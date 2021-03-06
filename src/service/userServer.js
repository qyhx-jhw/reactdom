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
            paydata: [],
            info: '',//信息
            succeed: false, //登录是否成功
            reg: false,
            time: false
            // number:0
        })

    }
    //登录
    login(phone, password) {
        console.log('userserver', phone, password)

        let url = 'api/user/login'
        axios.post(
            url, {
            phone: phone,
            password: password
        })
            .then(response => {
                // console.log('登录返回值', response.data);
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
    //注册
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
            .then((response) => {
                // console.log('response', response);
                this.reg = true;
                alert('注册成功')

            })
            .catch((error) => {
                console.log(error);
            });
    }
    //获取个人用户信息
    getinfo() {
        // let info={}
        let surl = '/api/user/info'
        axios.get(surl, {
            params: {
                id: this.id
            }
        })
            .then(response => {
                // console.log('get用户个人信息成功', response.data);
                var end_time1 = response.data.end_time  //判断离职时间的字符属性
                if (response.data.end_time === 'None') {
                    end_time1 = '空'
                }

                // response.data
                this.info = {//员工信息
                    phone: response.data.phone,//手机号码
                    name: response.data.name, //姓名
                    gender: response.data.gender,//性别
                    birthday: response.data.birthday,//出生日期
                    IDcard: response.data.IDcard,//身份证
                    residence: response.data.residence,//常住地址
                    email: response.data.email,//邮箱

                    start_time: response.data.start_time,//入职时间
                    end_time: end_time1,//离职时间
                    department: response.data.department,//部门
                    position: response.data.position,//岗位
                    situation: response.data.situation//在职情况
                };

            })
            .catch(error => {
                console.log('get失败', error);
            })
        // return info
    }
    //更新个人用户信息
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
                // console.log('修改的返回值', response, response.statusText);
                this.getinfo()
                alert('修改信息成功')
                this.update = (new Date()).getTime()
            })
            .catch((error) => {
                console.log(error);
            });
    }
    //过去所有用户信息
    getalluser() {
        let data = []
        let surl = '/api/user/alluser'
        axios.get(surl, {
            params: {

            }
        })
            .then(response => {
                // console.log('get所有员工信息成功', response.data, response.data.job_info, typeof (response.data.job_info[0].id));
                for (let i = 0; i < response.data.query.length; i++) {
                    function checkAdult(age) {
                        return age.jid_id === response.data.query[i].id;
                    }
                    // console.log('11',response.data.query[i].id,response.data.job_info.find(checkAdult))
                    data.push({//员工信息
                        id: response.data.query[i].id,
                        name: response.data.query[i].name,
                        email: response.data.query[i].email,
                        phone: response.data.query[i].phone,
                        gender: response.data.query[i].gender,
                        birthday: response.data.query[i].birthday,
                        IDcard: response.data.query[i].IDcard,
                        residence: response.data.query[i].residence,

                        job_info: response.data.job_info.find(checkAdult),
                        department: response.data.job_info.find(checkAdult).department,
                        position: response.data.job_info.find(checkAdult).position
                    });
                }

                // console.log('get成功222', data);

            })
            .catch(error => {
                console.log('get失败', error);
            })
        return data
    }
    //获取工资信息
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
                // console.log('工资成功', response.data, response.data[response.data.length - 1]);

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
        // console.log('ID和name', this.data);
        // return data
    }

    //提交工资信息
    postpay(id, name, time, basic_wage, subsidy, deduction, pay) {
        let url = 'api/user/postpay'
        axios.post(
            url, {
            userid: id,
            name: name,
            time: time,
            basic_wage: basic_wage,
            subsidy: subsidy,
            deduction: deduction,
            pay: pay,
        })
            .then((response) => {
                // console.log('上次工资信息', response, response.statusText);
                alert('添加工资成功')
                // this.update = (new Date()).getTime()
            })
            .catch((error) => {
                console.log(error);
            });
    }
    //查往届工资用于管理员
    getpayroll() {
        let data = []
        // let name=this.name
        let surl = '/api/user/getpayorll'
        axios.get(surl, {
            params: {
            }
        })
            .then(response => {
                // console.log('拿到工资成功', response.data.query, response.data.query.length);
                // data.push(response.data)
                // return response.data
                // data=response.data.query
                for (let i = 0; i < response.data.query.length; i++) {
                    data.push({
                        id: response.data.query[i].id,
                        // name: response.data[response.data.length - 1],
                        time: response.data.query[i].time,
                        basic_wage: response.data.query[i].basic_wage,
                        subsidy: response.data.query[i].subsidy,
                        deduction: response.data.query[i].deduction,
                        pay: response.data.query[i].pay,
                        pid: response.data.query[i].pid_id
                    });
                }
            })
            .catch(error => {
                console.log('get失败', error);
            })
        return data
    }

    //入职信息以及职位变更
    getjob(id, name, start_time, end_time, department, position, situation) {
        let url = 'api/user/job'
        axios.post(
            url,
            {
                userid: id,
                name: name,
                start_time: start_time,
                end_time: end_time,
                department: department,
                position: position,
                situation: situation
            }
        )
            .then((response) => {
                // console.log('入职信息', response, response.statusText);
                // this.getinfo()
                alert('职位信息修改成功')
                // this.update = (new Date()).getTime()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //提交请假申请
    post_holiday(start_time, end_time, reason, status) {
        let url = 'api/user/post_holiday'
        axios.post(
            url, {
            userid: this.id,
            name: this.name,
            start_time: start_time,
            end_time: end_time,
            reason: reason,
            status: status,
        })
            .then((response) => {
                // console.log('提交请假申请', response,);
                alert('请假提交成功')
                // this.get_holiday()
                // this.update = (new Date()).getTime()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //获得请假申请
    get_holiday() {
        let data = []
        // let name=this.name
        let surl = '/api/user/get_holiday'
        axios.get(surl, {
            params: {
            }
        })
            .then(response => {
                // console.log('拿到请假成功', response.data.query, response.data.query.length);
                // data.push(response.data)
                // return response.data
                // data=response.data.query
                for (let i = 0; i < response.data.query.length; i++) {
                    data.push({
                        id: response.data.query[i].id,
                        // name: response.data[response.data.length - 1],
                        name: response.data.query[i].name,
                        start_time: response.data.query[i].start_time,
                        end_time: response.data.query[i].end_time,
                        reason: response.data.query[i].reason,
                        status: response.data.query[i].status,
                        hid: response.data.query[i].hid_id
                    });
                }
            })
            .catch(error => {
                console.log('get失败', error);
            })
        return data
    }

    //提交审批的请假申请
    post_make_holiday(user_id, status) {
        let url = 'api/user/post_make_holiday'
        axios.post(
            url, {
            userid: user_id,
            status: status,
        })
            .then((response) => {
                // console.log('提交审批请假申请', response);
                alert('请假提交成功')
                // this.get_holiday()
                // this.update = (new Date()).getTime()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //提交打卡
    post_check_in(time) {
        let url = 'api/user/post_check_in'
        axios.post(
            url, {
            userid: this.id,
            // status: status,
            name: this.name,
            time: time,
            department: this.info.department
        })
            .then((response) => {
                // console.log('打卡', response);
                this.time = true
                // alert('请假提交成功')
                // this.get_holiday()
                // this.update = (new Date()).getTime()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    get_attendance() {
        let data = []
        // let name=this.name
        let surl = '/api/user/get_attendance'
        axios.get(surl, {
            params: {
            }
        })
            .then(response => {
                console.log('签到', response.data.query, response.data.query.length);
                // data.push(response.data)
                // return response.data
                // data=response.data.query
                for (let i = 0; i < response.data.query.length; i++) {
                    data.push({
                        id: response.data.query[i].id,
                        // name: response.data[response.data.length - 1],
                        name: response.data.query[i].name,
                        department: response.data.query[i].department,
                        time: response.data.query[i].time,
                        late: response.data.query[i].late,
                        // status: response.data.query[i].status,
                        aid: response.data.query[i].Aid_id
                    });
                }
            })
            .catch(error => {
                console.log('get失败', error);
            })
        return data
    }
}
const userServer = new UserService();
export default userServer;