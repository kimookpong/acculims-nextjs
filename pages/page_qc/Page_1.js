import React, { useState, useEffect } from 'react';
import { Button, Select, DatePicker, InputNumber, Input, Card, Space, Modal, Table, Typography, Dropdown, Menu, Spin, Form } from 'antd';
import axios from 'axios';

const PageControlLot = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/qc_control_getname')
      .then(res => {
        setData(res.data);
      })
    toTable();
  }, []);

  const menu = (
    <Menu>
      {data.map((item, index) => (
        <Menu.Item key={index}>
          {item.lot_name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const [lot_name, setLotName] = useState();
  const { Option } = Select;
  const [level, setLevel] = useState();
  const [lot_number, setLotNumber] = useState();
  const [date_exp, setDateExp] = useState('3023-03-01');
  const [data_table, setDataTable] = useState();
  
  async function toTable() {
    axios.post('/api/qc_control_table')
      .then(response => {
      setDataTable(response.data);
      })
      .catch(error => { console.error(error); }
  );}

  async function searchTable(search_str) {
    axios.post('/api/qc_control_search', { search_str:search_str })
      .then(response => {
      setDataTable(response.data);
      })
      .catch(error => { console.error(error); }
  );}

  const columns_control = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Control Name',
        dataIndex: 'lot_name',
        key: 'lot_name',
    },
    {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
    },
    {
      title: 'Lot',
      dataIndex: 'lot_number',
      key: 'lot_number',
    },
    {
        title: 'Expire',
        dataIndex: 'date_expire',
        key: 'date_expire',
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingLotName, setEditingLotName] = useState('');
  const [editingLevel, setEditingLevel] = useState('');
  const [editingLotNumber, setEditingLotNumber] = useState('');
  const [editingDateExpire, setEditingDateExpire] = useState('');

  const editRow = (id, lot_name, level, lot_number, date_expire) => {
    setEditingId(id);
    setEditingLotName(lot_name);
    setEditingLevel(level);
    setEditingLotNumber(lot_number);
    setEditingDateExpire(date_expire);
    setIsModalVisible(true);
  }

  const handleOk = () => {
    setDataTable(data_table.map(item => item.id === editingId ? { ...item, 
      lot_name:editingLotName, level:editingLevel, lot_number:editingLotNumber, date_expire:editingDateExpire 
    } : item));
    onChangedEdit(editingId,editingLotName,editingLevel,editingLotNumber,editingDateExpire);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChangedAdd = () => {
    axios.post('/api/qc_control_add',
    { lot_name:lot_name, level:level, lot_number:lot_number, date_exp:date_exp })
      .then(response => {
      console.log(response.data);
      setDataControl(response.data);
      })
      .catch(error => { console.error(error); }
    );
  }

  const onChangedEdit = (id,lot_name,level,lot_number,date_exp) => {
    axios.post('/api/qc_control_edit',
    {id:id, lot_name:lot_name, level:level, lot_number:lot_number, date_exp:date_exp})
      .then(response => {
      console.log(response.data);
      setDataControl(response.data);
      })
      .catch(error => { console.error(error); }
    );
  }

  const onChangedDel = () => {
    axios.post('/api/qc_control_del',
    {id:id})
      .then(response => {
      console.log(response.data);
      setDataControl(response.data);
      })
      .catch(error => { console.error(error); }
    );
    toTable();
  }

  const { Search } = Input;
  const onSearch = (value) => searchTable(value);

  return (
    <div>
      <Space direction="vertical">
        <Card title="Add Control" size="small">
        <p>Control Name: </p>

        <Select
          mode="tags"
          options={data}
          onChange = {(e) => setLotName(e)}
          style={{ width: 200 }}
          placeholder={'Select/Add Control Name'}
          />

        <p>Level: </p>
        <Select
          defaultValue=""
          onChange={setLevel}
          style={{ width: 200 }}
          placeholder={'Select Control Level'}
          >
          <Option value="1">Level 1</Option>
          <Option value="2">Level 2</Option>
          <Option value="3">Level 3</Option>
        </Select>

        <p>Lot: </p>
        <Input
          type="text"
          value={lot_number}
          onChange={e => setLotNumber(e.target.value)}
          placeholder={'Type Control Lot'}
          style={{ width: 200 }}
          />
        
        <p>Expire Date: </p><DatePicker onChange={setDateExp} style={{ width: 200 }}/>
        <br></br>
        <br></br>

        <Button type="primary" onClick={onChangedAdd}>Add Control</Button>
        <a> </a><Button onClick={toTable}>Refresh</Button>
        </Card>
      </Space>

      <Space direction="vertical">
        <Card title="Control Data" size="small">
          <Search
            placeholder='Control Name / Lot Name'
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            />
          
          <br></br>
          <br></br>
          
          <Table
            rowKey="id" 
            onRow={(record, rowIndex) => {
              return {
                onClick: event => { 
                  editRow(record.id, record.lot_name, record.level, record.lot_number, record.date_expire) },
              };
            }}
            columns={columns_control}
            dataSource={data_table}
            size="small"
            scroll={{ x: 600, }}
          />
          <Modal title="Edit Selected Data" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <a>Lot Name: </a><Input value={editingLotName} onChange={e => setEditingLotName(e.target.value)}/>
            <a>Level: </a><Input value={editingLevel} onChange={e => setEditingLevel(e.target.value)}/>
            <a>Lot Number: </a><Input value={editingLotNumber} onChange={e => setEditingLotNumber(e.target.value)}/>
            <a>Date Expire: </a><Input value={editingDateExpire} onChange={e => setEditingDateExpire(e.target.value)}/>
          </Modal>

        </Card>
      </Space>
    </div>
  );
};

export default PageControlLot;
