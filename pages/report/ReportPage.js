import React, { useState, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Layout, Space, List, Button } from 'antd';

import ControlLabImage from '../report/controlLabImage';
import ControlLabDetail from '../report/controlLabDetail';
import ControlLabPatient from '../report/controlLabPatient';
import ControlLabApprove from '../report/controlLabApprove';
import ControlLabResult from '../report/controlLabResult';

import ReportLayout from './controlLayout';
import ReactToPrint from "react-to-print";

export default function Home() {
  const [items, setItems] = useState();
  //const [data, setData] = useState();
  const componentRef = useRef();

  const moveItem = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];
    const newItems = [...items];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragItem);
    setItems(newItems);
  };

  const printItems = () => {
    console.log('Items:', items);
  };

  const { Sider, Content } = Layout;

  const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#108ee9',
  };
  
  const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#3ba0e9',
  };
  
  const siderRStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#3ba0e9',
  };

  let data = [
    'Grid layput',
    'Get data api from single click',
    'Construct with block layout',
    'Create sizable component in page layout',
    'Select data to print (specified on ...(hn, date, lab))',
    'Print (using ReactToPrint)'
  ];

  //const LabDetail = () => {
  async function LabDetail(value) {
    console.log(data)
    axios.post('/api/get_lis_hospital')
      .then(response => { 
        setData(response.data); 
        console.log(data)
      })
      .catch(error => { console.error(error); });
  }

  const handleDrop = (itemId, targetId) => {
    console.log("Dropped item with id:", itemId, "on target with id:", targetId);
  };

  return (
    <Space direction="vertical" style={{ width: '100%', }} size={[0, 48]}>
    <Layout>
      <Sider style={siderStyle}><h1>Report Component</h1>
        <DndProvider backend={HTML5Backend}>
            <div>
              <ControlLabImage moveItem={moveItem}/>
              <ControlLabDetail moveItem={moveItem} onClick={() => LabDetail(data)}/>
              <ControlLabPatient moveItem={moveItem}/>
              <ControlLabResult moveItem={moveItem}/>
              <ControlLabApprove moveItem={moveItem}/>
              <ReactToPrint
                trigger={() => {
                return <Button shape="round">Print</Button>;
                }}
                content={() => componentRef.current}/>
            </div>
        </DndProvider>
      </Sider>
      <Layout>
        <Content style={contentStyle}>
          <DndProvider backend={HTML5Backend}>
            <div ref={componentRef}>
              <ReportLayout/>
            </div>
          </DndProvider>
        </Content>
      </Layout>
      <Sider style={siderRStyle}><h1>Control Properties</h1>
      <List
        size="small"
        bordered
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
      </Sider>
    </Layout>
    </Space>
    
  );
}
