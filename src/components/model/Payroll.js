import React, { Component } from 'react';
import { Table } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import userServer from '../../service/userServer'

class Payroll extends Component {
  constructor(props) {
    // console.log(1)
    super(props);
    this.state = {
      data:userServer.data,
      // name1:userServer.name,
      cols: {
        pay: {
          type: 'linear',
          alias: '工资',
          min: 0
        },
        time: {
          type: 'timeCat',
          alias: '月份',
        },
      },
    };
    this.columns = [
      // { title: '部门', dataIndex: 'department', key: 'department' },
      { title: '姓名', dataIndex: 'name', key: 'name' },
      { title: '时间', dataIndex: 'time', key: 'time' },
      { title: '基础工资', dataIndex: 'basic_wage', key: 'basic_wage' },
      { title: '补贴', dataIndex: 'subsidy', key: 'subsidy' },
      { title: '扣除五险一金', dataIndex: 'deduction', key: 'deduction' },
      { title: '实际工资', dataIndex: 'pay', key: 'pay' },
    ];
  }
  render() {
    // console.log('gzixinxi', this.state.data)
    // console.log(3)
    return (
      <div>
        工资表
        <Table
          bordered='true'
          columns={this.columns}
          // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
          dataSource={this.state.data}
        />
        <Chart width={600} height={400} data={this.state.data} scale={this.state.cols}>
          <Axis name="time" title />
          <Axis name="pay" title />
          <Legend position="top" dy={-20} marker="square" />
          <Tooltip />
          <Geom type="interval" position="time*pay" color="time" />
          <Geom type="line" position="time*pay" size={2} />
        </Chart>
      </div>
    );
  }
}

export default Payroll;