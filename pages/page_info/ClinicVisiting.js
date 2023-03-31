import styles from '../../styles/Home.module.css'
import { React, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Checkbox, Space, Card, Form, Button, Input, DatePicker } from "antd";
import { BankOutlined } from "@ant-design/icons";

function ClinicalVisiting(){
  const [data, setData] = useState();
  
  const [searchbox, setsearch] = useState('');
  const onChangedDateStart = (date, dateString) => { setdatestart(dateString); }
  const onChangedDateStop = (date, dateString) => { setdatestop(dateString); }
  const [date_start, setdatestart] = useState('2022-09-01');
  const [date_stop, setdatestop] = useState('2023-02-01');
  
  const [hn, setHn] = useState('');
  const onChangedDateArrival = (date, dateString) => { setdateArrival(dateArrival); }
  const [date_Arrival, setdateArrival] = useState('2022-09-01');

  const [fname, setfname] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');  
  const [address, setAddress] = useState('');

  const CheckboxGroup = Checkbox.Group;
  const labRegistration = ['มาด้วยตัวเอง','มีการนำส่งตัวอย่าง']
  const healthInsurance = ['ชำระเงินเอง','ประกันสังคม','ประกันอื่นๆ']
  const [checkedList, setCheckedList] = useState();
  const onChange = (list) => {setCheckedList(list);};

  const [lastVisit, setLastVisit] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const [hr, setHr] = useState('');
  const [bmi, setBmi] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [underlyingdisease, setUnderlyingDisease] = useState('');
  const allergic = ['ไม่เคยแพ้','ไม่ทราบ','เคยแพ้']
  const [textallergic, setAllergic] = useState('');
  const foodallergic = ['ไม่เคยแพ้','ไม่ทราบ','เคยแพ้']
  const [textfoodallergic, setFoodAllergic] = useState('');
  
  const [symptom, setSymptom] = useState('');

  async function addPatient(value) {
    axios.post('',
    {pname:pname, fname:fname, lname:lname, job_id:job_id, user_name:user_name, password:password, user_type:user_type})
      .then(response => {
      console.log(response.data);
      setData(response.data);
      })
      .catch(error => { console.error(error); }
    );
  }

  async function delPatient(value) {
    axios.post('',
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
          labelCol={{ span: 6, }}
          wrapperCol={{ span: 18, }}
          autoComplete="off"
        >
          <form>
            <Form.Item label="ข้อมูลผู้ป่วย:">
              <Input onChange={(e) => setsearch(e.target.value)} value={searchbox} />
              <br></br>
              <br></br>
              <a>From: </a><DatePicker onChange={onChangedDateStart}/>
              <a> To: </a><DatePicker onChange={onChangedDateStop}/>
            </Form.Item>
          </form>
          <form>
            <Form.Item label="HN:">
              <Input onChange={(e) => setHn(e.target.value)} value={hn}/>
              <br></br>
              <br></br>
              <a>วันที่มา: </a><DatePicker onChange={onChangedDateArrival}/>
            </Form.Item>            
            <Form.Item label="ชื่อ นามสกุล:">
              <Input onChange={(e) => setName(e.target.value)} value={name}/>
            </Form.Item>
            <Form.Item label="อายุ:">
              <Input onChange={(e) => setAge(e.target.value)} value={age}/>
            </Form.Item>
            <Form.Item label="ที่อยู่:">
              <Input onChange={(e) => setAddress(e.target.value)} value={address}/>
            </Form.Item>
            <Form.Item label="ประเภทการมา:">
              <CheckboxGroup options={labRegistration} onChange={onChange}/>
            </Form.Item>
            <Form.Item label="มาครั้งสุดท้าย:">
              <Input onChange={(e) => setLastVisit(e.target.value)} value={lastVisit}/>
            </Form.Item>
            <Form.Item label="สิทธิการรักษา:">
              <CheckboxGroup options={healthInsurance} onChange={onChange}/>
            </Form.Item>
            <Form.Item label="ส่วนสูง:">
              <Input onChange={(e) => setHeight(e.target.value)} value={height}/>
            </Form.Item>
            <Form.Item label="น้ำหนัก:">
              <Input onChange={(e) => setWeight(e.target.value)} value={weight}/>
            </Form.Item>
            <Form.Item label="ชีพจร:">
              <Input onChange={(e) => setHr(e.target.value)} value={hr}/>
            </Form.Item>
            <Form.Item label="BMI:">
              <Input onChange={(e) => setBmi(e.target.value)} value={bmi}/>
            </Form.Item>
            <Form.Item label="ความดัน (Systolic):">
              <Input onChange={(e) => setSystolic(e.target.value)} value={systolic}/>
            </Form.Item>
            <Form.Item label="ความดัน (Diastolic):">
              <Input onChange={(e) => setDiastolic(e.target.value)} value={diastolic}/>
            </Form.Item>            
            <Form.Item label="โรคประจำตัว:">
              <Input onChange={(e) => setUnderlyingDisease(e.target.value)} value={underlyingdisease}/>
            </Form.Item>
            <Form.Item label="การแพ้ยา:">
              <CheckboxGroup options={allergic} onChange={onChange}/>
            </Form.Item>
            <Form.Item label="ระบุชื่อยา:">
              <Input onChange={(e) => setAllergic(e.target.value)} value={textallergic}/>
            </Form.Item>
            <Form.Item label="การแพ้อาหาร:">
              <CheckboxGroup options={foodallergic} onChange={onChange}/>
            </Form.Item>
            <Form.Item label="ระบุชื่ออาหาร:">
              <Input onChange={(e) => setFoodAllergic(e.target.value)} value={textfoodallergic}/>
            </Form.Item>
            <Form.Item label="อาการสำคัญ:">
              <Input onChange={(e) => setSymptom(e.target.value)} value={symptom}/>
            </Form.Item>
          </form>
          <form>
            <Form.Item wrapperCol={{ offset: 6, span: 18, }}>
              <Space wrap>
                <Button type="primary" shape="round" onClick={addPatient}>Save</Button>
                <Button shape="round" >Cancel</Button>
                <Button shape="round" onClick={delPatient}>Delete</Button>
                <Button shape="round">Exit</Button>
              </Space>
            </Form.Item>
          </form>
        </Form>
    </Card>
  )
}

export default ClinicalVisiting;