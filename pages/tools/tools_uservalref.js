import styles from '../../styles/Home.module.css'
import { React, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Spin, Space, Card, Form, Button, Input, Table } from "antd";
import { BankOutlined } from "@ant-design/icons";

function ToolsUservalref(){
  const [pname, setpname] = useState('');
  const [fname, setfname] = useState('');
  const [lname, setsurname] = useState('');
  const [job_id, setlcid] = useState('');
  const [user_name, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [user_type, settype] = useState('');
  const [user_id, setuserid] = useState('');
  const [data, setData] = useState();
  const componentRef = useRef();

    async function addUser(value) {
        axios.post('http://localhost:3000/api/add_user',
        {pname:pname, fname:fname, lname:lname, job_id:job_id, user_name:user_name, password:password, user_type:user_type})
            .then(response => {
            console.log(response.data);
            setData(response.data);
            })
            .catch(error => { console.error(error); }
        );
    }

    async function loadUser(value) {
      axios.get('http://localhost:3000/api/get_lis_user',)
          .then(response => {
          console.log(response.data);
          setData(response.data);
          })
          .catch(error => { console.error(error); }
      );
    }

    async function delUser(value) {
      axios.post('http://localhost:3000/api/delete_user', {user_id:user_id})
          .then(response => {
          console.log(response.data);
          setData(response.data);
          })
          .catch(error => { console.error(error); }
      );
    }

    const columns = [
      {
          title: "User ID",
          dataIndex: "id_user",
          key: "id_user",
          ellipsis: true,
          width: 100,
      },
      {
          title: "Username",
          dataIndex: "user_name",
          key: "user_name",
          ellipsis: true,
          width: 100,
      },
      {
          title: "Password",
          dataIndex: "password",
          key: "password",
          ellipsis: true,
          width: 100,
      },
      {
          title: "คำนำหน้าชื่อ",
          dataIndex: "pname",
          key: "pname",
          ellipsis: true,
          width: 120,
      },
      {
          title: "ชื่อ",
          dataIndex: "fname",
          key: "fname",
          ellipsis: true,
          width: 100,
      },
      {
          title: "นามสกุล",
          dataIndex: "lname",
          key: "lname",
          ellipsis: true,
          width: 100,
      },
      {
          title: "User Type",
          dataIndex: "user_type",
          key: "user_type",
          ellipsis: true,
          width: 100,
      },
      {
          title: "เลขที่ใบประกอบ",
          dataIndex: "job_id",
          key: "job_id",
          ellipsis: true,
          width: 100,
      }];

    const dataTitle = {
        title: (
          <>
            <BankOutlined/> จัดการข้อมูลผู้ใช้
          </>
        ),
      };

    return(
        <Card title={dataTitle.title} headStyle={{ color: "#002140" }}>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            autoComplete="off"
          >
            <div>
              <Form.Item label="คำนำหน้าชื่อ:">
                <Input onChange={(e) => setpname(e.target.value)} value={pname} />
              </Form.Item>
              <Form.Item label="ชื่อ:">
                <Input onChange={(e) => setfname(e.target.value)} value={fname} />
              </Form.Item>
              <Form.Item label="นามสกุล:">
                <Input onChange={(e) => setsurname(e.target.value)} value={lname} />
              </Form.Item>
              <Form.Item label="เลขที่ใบประกอบ:">
                <Input onChange={(e) => setlcid(e.target.value)} value={job_id} />
              </Form.Item>
              <Form.Item label="Username:">
                <Input onChange={(e) => setusername(e.target.value)} value={user_name} />
              </Form.Item>
              <Form.Item label="Password:">
                <Input onChange={(e) => setpassword(e.target.value)} value={password} />
              </Form.Item>
              <Form.Item label="User Type:">
                <Input onChange={(e) => settype(e.target.value)} value={user_type} />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 6, span: 18, }}>
                <Space wrap>
                  <Button type="primary" shape="round" onClick={addUser}>
                    Save
                  </Button>
                  <Button type="primary" shape="round" onClick={loadUser}>
                    Reload
                  </Button>
                </Space>
              </Form.Item>
              <div ref={componentRef}>
                <Table
                  dataSource={data}
                  rowKey={"lab_order_number"}
                  columns={columns}
                  size="small"
                  scroll={{ x: 1500, }}
                />
              </div>
            </div>
            <Form.Item wrapperCol={{ offset: 6, span: 18, }}>
              <Form.Item label="Delete ID:">
                <Input onChange={(e) => setuserid(e.target.value)} value={user_id} />
                <Button type="primary" shape="round" onClick={delUser}>Delete</Button>
              </Form.Item>
            </Form.Item>
          </Form>
      </Card>
    )
}

export default ToolsUservalref;