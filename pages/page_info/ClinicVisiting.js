import styles from '../../styles/Home.module.css'
import { React, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Spin, Space, Card, Form, Button, Input, Table } from "antd";
import { BankOutlined } from "@ant-design/icons";

function ClinicalVisiting(){
  const [data, setData] = useState();
  
  const [searchbox, setsearch] = useState('');
  const [pname, setpname] = useState('');
  const [fname, setfname] = useState('');
  const [lname, setsurname] = useState('');
  const [sex, setsex] = useState('');
  const [birth, setbirth] = useState('');
  const [age, setage] = useState('');  
  const [nation, setnation] = useState('');
  const [religion, setreligion] = useState('');
  const [type, settype] = useState('');
  const [minortype, setminortype] = useState('');
  const [occ, setocc] = useState('');
  const [id, setid] = useState('');
  const [address, setaddress] = useState('');
  const [tel, settel] = useState('');
  const [email, setemail] = useState('');
  const [lineid, setlineid] = useState('');
  const [workaddress, setworkaddress] = useState('');
  const [worktel, setworktel] = useState('');
  const [reftel, setreftel] = useState('');

  async function addPatient(value) {
    axios.post('/api/add_user',
    {pname:pname, fname:fname, lname:lname, job_id:job_id, user_name:user_name, password:password, user_type:user_type})
      .then(response => {
      console.log(response.data);
      setData(response.data);
      })
      .catch(error => { console.error(error); }
    );
  }

  const dataTitle = { title: ( <>Clinic Visiting Form</> ), };

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
          <form>
            <Form.Item label="Search by:">
              <Input onChange={(e) => setsearch(e.target.value)} value={searchbox} />
            </Form.Item>
          </form>
          <form>
            <Form.Item label="คำนำหน้า:">
              <Input onChange={(e) => setpname(e.target.value)} value={pname} />
            </Form.Item>
            <Form.Item label="ชื่อ:">
              <Input onChange={(e) => setfname(e.target.value)} value={fname} />
            </Form.Item>
            <Form.Item label="นามสกุล:">
              <Input onChange={(e) => setsurname(e.target.value)} value={lname} />
            </Form.Item>
            <Form.Item label="เพศ:">
              <Input onChange={(e) => setsex(e.target.value)} value={sex} />
            </Form.Item>
            <Form.Item label="วันเกิด:">
              <Input onChange={(e) => setbirth(e.target.value)} value={birth} />
            </Form.Item>
            <Form.Item label="อายุ:">
              <Input onChange={(e) => setage(e.target.value)} value={age} />
            </Form.Item>
            <Form.Item label="สัญชาติ:">
              <Input onChange={(e) => setnation(e.target.value)} value={nation} />
            </Form.Item>
            <Form.Item label="ศาสนา:">
              <Input onChange={(e) => setreligion(e.target.value)} value={religion} />
            </Form.Item>
            <Form.Item label="หมู่เลือด:">
              <Input onChange={(e) => settype(e.target.value)} value={type} />
            </Form.Item>
            <Form.Item label="Rh:">
              <Input onChange={(e) => setminortype(e.target.value)} value={minortype} />
            </Form.Item>
            <Form.Item label="สถานภาพ:">
              <Input onChange={(e) => setocc(e.target.value)} value={occ} />
            </Form.Item>
            <Form.Item label="ที่อยู่ตามบัตรประชาชน:">
              <Input onChange={(e) => setid(e.target.value)} value={id} />
            </Form.Item>
            <Form.Item label="ที่อยู่ที่ติดต่อได้:">
              <Input onChange={(e) => setaddress(e.target.value)} value={address} />
            </Form.Item>
            <Form.Item label="เบอร์โทรศัพท์ที่ติดต่อได้:">
              <Input onChange={(e) => settel(e.target.value)} value={tel} />
            </Form.Item>
            <Form.Item label="Email:">
              <Input onChange={(e) => setemail(e.target.value)} value={email} />
            </Form.Item>
            <Form.Item label="Line ID:">
              <Input onChange={(e) => setlineid(e.target.value)} value={lineid} />
            </Form.Item>
            <Form.Item label="ที่อยู่สถานที่ทำงาน:">
              <Input onChange={(e) => setworkaddress(e.target.value)} value={workaddress} />
            </Form.Item>
            <Form.Item label="เบอร์โทรศัพท์ที่ทำงาน:">
              <Input onChange={(e) => setworktel(e.target.value)} value={worktel} />
            </Form.Item>
            <Form.Item label="บุคคลที่สามารถติดต่อได้ (กรณีฉุกเฉิน):">
              <Input onChange={(e) => setreftel(e.target.value)} value={reftel} />
            </Form.Item>
          </form>

          <form>
            <Form.Item wrapperCol={{ offset: 6, span: 18, }}>
              <Space wrap>
                <Button type="primary" shape="round" onClick={addPatient}>
                  Save
                </Button>
              </Space>
            </Form.Item>
          </form>
        </Form>
    </Card>
  )
}

export default ClinicalVisiting;