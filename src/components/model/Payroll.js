import React, { Component } from 'react';
import { Table } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend} from 'bizcharts';

class Payroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: {
        pay: {
          type:'linear',
          alias: '工资',
          min:0
        },
        time: {
          type:'timeCat',
          alias: '月份',
        },

      },
      data: [
        {
          key: 1,
          department: '研发部',
          name: '蒋浩文',
          time: '2020-01-15',
          pay: 8000,
          description: '000',
        },
        {
          key: 2,
          department: '研发部',
          name: '蒋浩文',
          time: '2020-02-15',
          pay: 5600,
          description: 'hello',
        },
        {
          key: 3,
          department: '研发部',
          name: '蒋浩文',
          time: '2020-03-04',
          pay: 6600,
          description: 'hello',
        },
        {
          key: 4,
          department: '研发部',
          name: '蒋浩文',
          time: '2020-04-17',
          pay: 7600,
          description: 'hello',
        },
        {
          key: 5,
          department: '研发部',
          name: '蒋浩文',
          time: '2020-05-17',
          pay: 7600,
          description: '这个月工资',
        },
        {
          key: 6,
          department: '研发部',
          name: '蒋浩文',
          time: '2020-06-17',
          pay: 6800,
          description: 'hello',
        },
        {
          key: 7,
          department: '研发部',
          name: '蒋浩文',
          time: '2020-07-17',
          pay: 8700,
          description: 'hello',
        },
        {
          key: 8,
          department: '研发部',
          name: '蒋浩文',
          time: '2020-08-17',
          pay: 7900,
          description: 'hello',
        },
        {
          key: 9,
          department: '研发部',
          name: '蒋浩文',
          time: '2020-09-17',
          pay: 7400,
          description: 'hello',
        },
        {
          key: 10,
          department: '研发部',
          name: '蒋浩文',
          time: '2020-10-17',
          pay: 7650,
          description: 'hello',
        },

      ]
    };
    this.columns = [
      { title: '部门', dataIndex: 'department', key: 'department' },
      { title: '姓名', dataIndex: 'name', key: 'name' },
      { title: '时间', dataIndex: 'time', key: 'time' },
      { title: '实际工资', dataIndex: 'pay', key: 'pay' },
      {
        title: '详情',
        dataIndex: '',
        key: 'x',
        // render: () => <a>Delete</a>,
        // render: () => <a>Delete</a>,
      },
    ];
  }
  render() {
    return (
      <div>
        工资表
        <Table
          bordered='true'
          columns={this.columns}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
          dataSource={this.state.data}
        />
        
        <Chart width={600} height={400} data={this.state.data} scale={this.state.cols}>
          <Axis name="time" title />
          <Axis name="pay" title />
          <Legend position="top" dy={-20} marker="square" />

          <Tooltip />
          <Geom type="interval" position="time*pay" color="time" />
          {/* <Geom type="line" position="time*pay" size={2} /> */}
          <Geom type="line" position="time*pay" size={2} />

          
        </Chart>
      </div>
    );
  }
}

export default Payroll;