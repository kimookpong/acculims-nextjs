import React, { useState, useEffect } from 'react';
import { Button, Select, DatePicker, InputNumber, Input, Card, Space, Modal, Table, Typography, Dropdown, Menu, Spin, Form } from 'antd';
import axios from 'axios';

const PageControlLot = () => {
  const [datalot, setLotData] = useState([]);
  const [labgroup, setLabGroup] = useState([]);

  useEffect(() => {
    axios.get('/api/qc_control_getname')
      .then(res => {
        setLotData(res.data);
      })
      itemgroup();
      toTable();
    }, []);
 
  const [lot_name, setLotName] = useState();
  const [level, setLevel] = useState();
  const [items_group, setItemsGroup] = useState();
  const [items_name, setItemsName] = useState();
  const [control_mean, setControlMean] = useState();
  const [control_sd, setControlSD] = useState();
  const [data_table, setDataTable] = useState();
  const { Option } = Select;

  async function itemgroup() {
    axios.post('/api/qc_control_lab_items_group')
    .then(response => {
      setLabGroup(response.data);
      })
      .catch(error => { console.error(error); }
  );}
  
  async function toTable() {
    axios.post('/api/qc_control_table_items')
      .then(response => {
      setDataTable(response.data);
      })
      .catch(error => { console.error(error); }
  );}

  async function searchTable(search_str) {
    axios.post('/api/qc_control_search_items', { search_str:search_str })
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
        dataIndex: 'control_name',
        key: 'control_name',
    },
    {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
    },
    {
      title: 'Items Group',
      dataIndex: 'items_group',
      key: 'items_group',
    },
    {
        title: 'Items Name',
        dataIndex: 'items_name',
        key: 'items_name',
    },
    {
      title: 'Control Mean',
      dataIndex: 'control_mean',
      key: 'control_mean',
    },
    {
        title: 'Control SD',
        dataIndex: 'control_sd',
        key: 'control_sd',
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingControlName, setEditingControlName] = useState('');
  const [editingLevel, setEditingLevel] = useState('');
  const [editingItemsGroup, setEditingItemsGroup] = useState('');
  const [editingItemsName, setEditingItemsName] = useState('');
  const [editingControlMean, setEditingControlMean] = useState('');
  const [editingControlSD, setEditingControlSD] = useState('');

  const editRow = (id, lot_name, level, items_group, items_name, control_mean, control_sd) => {
    setEditingId(id);
    setEditingControlName(lot_name);
    setEditingLevel(level);
    setEditingItemsGroup(items_group);
    setEditingItemsName(items_name);
    setEditingControlMean(control_mean);
    setEditingControlSD(control_sd);
    setIsModalVisible(true);
  }

  const handleOk = () => {
    setDataTable(data_table.map(item => item.id === editingId ? { ...item, 
      lot_name:editingControlName, level:editingLevel, items_group:editingItemsGroup, items_name:editingItemsName, control_mean:editingControlMean , control_sd:editingControlSD
    } : item));
    onChangedEdit(editingId,editingControlName,editingLevel,editingItemsGroup,editingItemsName,editingControlMean,editingControlSD);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChangedAdd = () => {
    axios.post('/api/qc_control_add_test',
    { lot_name:lot_name, level:level, items_group:items_group, items_name:items_name, control_mean:control_mean, control_sd:control_sd })
      .then(response => {
      console.log(response.data);
      })
      .catch(error => { console.error(error); }
    );
  }

  const onChangedEdit = (id, lot_name, level, items_group, items_name, control_mean, control_sd) => {
    axios.post('/api/qc_control_edit_test',
    {id:id, lot_name:lot_name, level:level, items_group:items_group, items_name:items_name, control_mean:control_mean, control_sd:control_sd })
      .then(response => {
      console.log(response.data);
      })
      .catch(error => { console.error(error); }
    );
  }

  const onChangedDel = () => {
    axios.post('/api/qc_control_del',
    {id:id})
      .then(response => {
      console.log(response.data);
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
          options={datalot}
          onChange = {(e) => setLotName(e)}
          style={{ width: 200 }}
          placeholder={'Select Control Name'}
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

        <p>Items Group: </p>
        <Select
          options={labgroup}
          onChange = {(e) => setItemsGroup(e)}
          style={{ width: 200 }}
          placeholder={'Select Lab Group'}
          />

        <p>Items Name: </p>
        <Select
          options={items_name}
          onChange = {(e) => setItemsName(e)}
          style={{ width: 200 }}
          placeholder={'Select Test Name'}
          />
        
        <p>Mean: </p>
        <Input
          type="text"
          value={control_mean}
          onChange={e => setControlMean(e.target.value)}
          placeholder={'Type Control Mean'}
          style={{ width: 200 }}
          />
        
        <p>SD: </p>
        <Input
          type="text"
          value={control_sd}
          onChange={e => setControlSD(e.target.value)}
          placeholder={'Type Control SD'}
          style={{ width: 200 }}
          />

        <br></br>
        <br></br>

        <Button type="primary" onClick={onChangedAdd}>Add Test</Button>
        <a> </a><Button onClick={toTable}>Refresh</Button>
        </Card>
      </Space>

      <Space direction="vertical">
        <Card title="Control Data" size="small">
          <Search
            placeholder='Control name / items group / items name'
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
                  editRow(record.id, record.control_name, record.level, record.items_group, record.items_name, record.control_mean, record.control_sd) },
              };
            }}
            columns={columns_control}
            dataSource={data_table}
            size="small"
            scroll={{ x: 600, }} 
          />
          <Modal title="Edit Selected Data" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <a>Control Name: </a><Input value={editingControlName} onChange={e => setEditingControlName(e.target.value)}/>
            <a>Level: </a><Input value={editingLevel} onChange={e => setEditingControlLevel(e.target.value)}/>
            <a>Items Group: </a><Input value={editingItemsGroup} onChange={e => setEditingItemsGroup(e.target.value)}/>
            <a>Items Name: </a><Input value={editingItemsName} onChange={e => setEditingItemsName(e.target.value)}/>
            <a>Control Mean: </a><Input value={editingControlMean} onChange={e => setEditingControlMean(e.target.value)}/>
            <a>Control SD: </a><Input value={editingControlSD} onChange={e => setEditingControlSD(e.target.value)}/>
          </Modal>

        </Card>
      </Space>
    </div>
  );
};

export default PageControlLot;
