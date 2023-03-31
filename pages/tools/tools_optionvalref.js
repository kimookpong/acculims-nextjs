import { React, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Home.module.css'
import { Checkbox, Space, Card, Form, Button, Input, DatePicker } from "antd";

function ToolsOptionvalref(){
    
    const CheckboxGroup = Checkbox.Group;
    const setting = ['eGFR `>` 100 Not state','eGFR No Stage','NCD No Print','Auto Platelet smear']
    const [checkedList, setCheckedList] = useState();
    const onChange = (list) => {setCheckedList(list);};

    const [atleast, setAtleast] = useState('');
    const [atleastPresent, setAtleastPresent] = useState('');
    const [between, setBetween] = useState('');  
    const [betweenPresent, setBetweenPresent] = useState('');
    const [morethan, setMorethan] = useState('');  
    const [morethanPresent, setMorethanPresent] = useState('');

    async function sendValue(value) {
        axios.post('/api/add_lab_ref_plt', 
        {atleast:atleast, atleastPresent:atleastPresent, 
            between:between, betweenPresent:betweenPresent, 
            morethan:morethan, morethanPresent:morethanPresent})
            .then(response => {
            console.log(response.data);
            setData(response.data);
            })
            .catch(error => { console.error(error); }
        );
    }

    const dataTitle = { title: ( <>Option</> ), };

    return(
        <Card title={dataTitle.title} headStyle={{ color: "#002140" }}>
        <Form
          name="basic"
          labelCol={{ span: 6, }}
          wrapperCol={{ span: 18, }}
          autoComplete="off"
        >
          <form>
            <Form.Item label="Setting:">
                <CheckboxGroup options={setting} onChange={onChange}/>
            </Form.Item>
            <Form.Item>
                <p>เซ็ตค่า Platelet</p>
            </Form.Item>
            <Form.Item label="ค่าน้อยกว่า:">
              <Input onChange={(e) => setAtleast(e.target.value)} value={atleast}/>
            </Form.Item>
            <Form.Item label="จะแสดงผลว่า:">
              <Input onChange={(e) => setAtleastPresent(e.target.value)} value={atleastPresent}/>
            </Form.Item>
            <Form.Item label="ค่าอยู่ระหว่าง:">
              <Input onChange={(e) => setBetween(e.target.value)} value={between}/>
            </Form.Item>
            <Form.Item label="จะแสดงผลว่า:">
              <Input onChange={(e) => setBetweenPresent(e.target.value)} value={betweenPresent}/>
            </Form.Item>
            <Form.Item label="ค่ามากกว่า:">
              <Input onChange={(e) => setMorethan(e.target.value)} value={morethan}/>
            </Form.Item>
            <Form.Item label="จะแสดงผลว่า:">
              <Input onChange={(e) => setMorethanPresent(e.target.value)} value={morethanPresent}/>
            </Form.Item>            
          </form>
          <form>
            <Form.Item wrapperCol={{ offset: 6, span: 18, }}>
              <Space wrap>
                <Button type="primary" shape="round" onClick={sendValue}>OK</Button>
                <Button shape="round">Exit</Button>
              </Space>
            </Form.Item>
          </form>
        </Form>
    </Card>
    )
}

export default ToolsOptionvalref