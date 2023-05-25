import React, { useState } from 'react';
import WestgardChart from './LJChart';
import { Input, DatePicker, Card, Space, Button } from 'antd';
import axios from 'axios';

const data = [
  { test: 'Test 1', value: 3, mean: 4, sd2_p: 5, sd2_m: 3, sd3_p: 6, sd3_m: 2 },
  { test: 'Test 2', value: 2.3, mean: 4, sd2_p: 5, sd2_m: 3, sd3_p: 6, sd3_m: 2 },
  { test: 'Test 3', value: 5.8, mean: 4, sd2_p: 5, sd2_m: 3, sd3_p: 6, sd3_m: 2 },
  { test: 'Test 4', value: 5, mean: 4, sd2_p: 5, sd2_m: 3, sd3_p: 6, sd3_m: 2 },
  { test: 'Test 5', value: 1, mean: 4, sd2_p: 5, sd2_m: 3, sd3_p: 6, sd3_m: 2 },
  { test: 'Test 6', value: 4.5, mean: 4, sd2_p: 5, sd2_m: 3, sd3_p: 6, sd3_m: 2 },
  { test: 'Test 7', value: 1.8, mean: 4, sd2_p: 5, sd2_m: 3, sd3_p: 6, sd3_m: 2 },
  { test: 'Test 8', value: 5.1, mean: 4, sd2_p: 5, sd2_m: 3, sd3_p: 6, sd3_m: 2 },
];

const ControlChartPage = () => {
  const onChange_datestart = (date, dateString) => { setDatestart(dateString); }
  const onChange_datestop = (date, dateString) => { setDatestop(dateString); }
  const [date_start, setDatestart] = useState('2023-01-01');
  const [date_stop, setDatestop] = useState('3023-01-01');
  const [lot_name, setLotName] = useState();
  const [test_name, setTestname] = useState();
  const [data_control, setDataControl] = useState();
  const [data_test, setDataTest] = useState();

  async function sendDateFilter(value) {
    axios.post('/api/get_qc_control',
    {date_start:date_start, date_stop:date_stop, test_name:test_name})
        .then(response => {
        console.log(response.data);
        setDataControl(response.data);
        })
        .catch(error => { console.error(error); }
    );
  }

  async function sendLotFilter(value) {
    axios.post('/api/get_qc_test',
    {date_start:date_start, date_stop:date_stop, test_name:test_name})
        .then(response => {
        console.log(response.data);
        setDataTest(response.data);
        })
        .catch(error => { console.error(error); }
    );
  }
  
  return (
    <div>
      <Space direction="vertical">
        <Card title="QC Viewer" size="small">
          <a>Date: </a><DatePicker onChange={onChange_datestart}/>
          <br></br>
          <br></br>
          <a>To Date: </a><DatePicker onChange={onChange_datestop}/>
          <p>Select Lot:</p>
 
          <br></br>
          <br></br>
          <Button>Chart Display</Button>
        </Card>
      </Space>
      
      <Space direction="vertical">
        <Card title="Levey-Jennings Chart" size="small">
          <WestgardChart data={data}/>
        </Card>
      </Space>
    </div>
  );
};

export default ControlChartPage;
