import styles from '../../styles/Home.module.css'
import { React, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Spin, Space, Card, Form, Button, Input } from "antd";
import { BankOutlined } from "@ant-design/icons";

function ToolsUservalref(){
    const [fname, setname] = useState('');
    const [lname, setsurname] = useState('');
    const [job_id, setlcid] = useState('');
    const [user_name, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [user_type, settype] = useState('');

    async function sendValue(value) {
        axios.post('http://localhost:3000/api/add_user',
        {fname:fname, lname:lname, job_id:job_id, user_name:user_name, password:password, user_type:user_type})
            .then(response => {
            console.log(response.data);
            setData(response.data);
            })
            .catch(error => { console.error(error); }
        );
    }

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
              <Form.Item label="ชื่อ:">
                <Input onChange={(e) => setname(e.target.value)} value={fname} />
              </Form.Item>
              <Form.Item label="นามสกุล:">
                <Input
                  onChange={(e) => setsurname(e.target.value)}
                  value={lname}
                />
              </Form.Item>
              <Form.Item label="เลขที่ใบประกอบ:">
                <Input
                  onChange={(e) => setlcid(e.target.value)}
                  value={job_id}
                />
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
              <Form.Item
                wrapperCol={{
                  offset: 6,
                  span: 18,
                }}
              >
                <Space wrap>
                  <Button type="primary" shape="round" onClick={sendValue}>
                    Save
                  </Button>
                </Space>
              </Form.Item>
            </div>
          </Form>
      </Card>
    )
}

export default ToolsUservalref;