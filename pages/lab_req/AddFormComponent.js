import {
  Divider,
  Modal,
  Input,
  Button,
  Form,
  Col,
  Row,
  Select,
  Checkbox,
  Radio,
  Space,
  AutoComplete,
} from "antd";
import { React, useEffect, useState } from "react";
import axios from "axios";
import { PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { TextArea } = Input;
const AddFormComponent = (props) => {
  const { dataForm, setRefreshKey, list, addPatient } = props;
  let countForList = 0;

  const [dataSelect, setDataSelect] = useState(list);
  const [fields, setFields] = useState([]);

  // useEffect(() => {
  //   setDataSelect(list);
  // }, [list]);

  const searchResult = (query) => {
    setLoadingHN(true);
    return axios
      .post("/api/get_patient_from_hn", {
        q: query,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.length) {
          setselectHN(response.data);
          setOptions(
            response.data.map((item) => {
              return {
                value: item.value,
                label: (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{item.value}</span>
                    <span>{item.label}</span>
                  </div>
                ),
              };
            })
          );
        } else {
          setselectHN([]);
          setOptions([
            {
              value: 0,
              label: (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    <PlusCircleOutlined /> เพิ่มข้อมูล Patient
                  </span>
                  <span></span>
                </div>
              ),
            },
          ]);
        }
        setLoadingHN(false);
      });
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const setSex = (sex) => {
    if (sex === "1") {
      return "ชาย";
    }
    if (sex === "2") {
      return "หญิง";
    }
    return "";
  };

  const [selectHN, setselectHN] = useState([]);
  const [selectCurrentHN, setselectCurrentHN] = useState();
  const [loadingHN, setLoadingHN] = useState(false);
  const [optionsHN, setOptions] = useState([]);
  const handleSearchHN = (value) => {
    setselectCurrentHN(value);
    if (value) {
      searchResult(value);
    } else {
      setselectHN([]);
      setFields([]);
      setOptions([]);
    }
  };

  const onSelectHN = (value) => {
    if (value === 0) {
      closeModal();
      addPatient(selectCurrentHN);
    }
    if (selectHN.length) {
      let result = selectHN.find((obj) => {
        return obj.value === value;
      });
      if (result) {
        setFields([
          {
            name: ["hn"],
            value: result.value,
          },
          {
            name: ["fullname"],
            value: result.label,
          },

          {
            name: ["sex"],
            value: setSex(result.sex),
          },
          {
            name: ["age"],
            value: calculateAge(result.birthday),
          },
        ]);
      } else {
        setFields([]);
      }
    } else {
      setFields([]);
    }
  };

  const onChangeChecklistGroup = (
    event,
    group,
    group_index,
    subgroup_index
  ) => {
    const updatedDataSelectUpdate = dataSelect[group_index].data[
      subgroup_index
    ].data.map((items) => {
      return { ...items, status: event.target.checked };
    });

    let updatedDataSelect = [...dataSelect];
    updatedDataSelect[group_index].data[subgroup_index].data =
      updatedDataSelectUpdate;
    setDataSelect(updatedDataSelect);
  };

  const onChangeChecklist = (
    event,
    items,
    group,
    group_index,
    subgroup_index,
    item_index
  ) => {
    let updatedDataSelect = [...dataSelect];
    updatedDataSelect[group_index].data[subgroup_index].data[item_index] = {
      ...dataSelect[group_index].data[subgroup_index].data[item_index],
      status: event.target.checked,
    };
    setDataSelect(updatedDataSelect);

    console.log(
      !!dataSelect[group_index].data[subgroup_index].data[item_index].status &&
        dataSelect[group_index].data[subgroup_index].data[item_index].status ===
          true
    );
  };

  const onFinish = (values) => {
    let dataOrder = [];
    dataSelect.map((group) => {
      group.data.map((subgroup) => {
        subgroup.data.map((items) => {
          if (!!items.status && items.status === true) {
            dataOrder.push(items);
          }
        });
      });
    });

    let dataHead = {
      doctor_code: null,
      hn: fields[0].value,
      order_date: dayjs().format("YYYY-MM-DD"),
      department: null,
      form_name: null,
      sub_group_list: null,
      order_time: dayjs().format("HH:mm:ss"),
      ward: null,
      lis_order_no: null,
      receive_computer: null,
      order_department: null,
      lab_priority_id: 0,
      receive_status: "Pending",
    };

    return axios
      .post("/api/add_new_lab_order", {
        lab_head: dataHead,
        lab_order: dataOrder,
      })
      .then((response) => {
        console.log(response.data.lab_order_number);
        setRefreshKey((oldKey) => oldKey + 1);
        closeModal();
      });
  };

  const closeModal = () => {
    Modal.destroyAll();
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      autoComplete="off"
      fields={fields}
      onFinish={onFinish}
    >
      <Row>
        <Col span={6}>
          <Form.Item
            label="HN :"
            name="hn"
            rules={[
              {
                required: true,
                message: "กรุณากรอก HN",
              },
            ]}
            style={{ marginBottom: "5px" }}
          >
            <AutoComplete
              dropdownMatchSelectWidth={252}
              options={optionsHN}
              onSelect={onSelectHN}
              onSearch={handleSearchHN}
              loading={loadingHN}
            ></AutoComplete>
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label="ชื่อ-สกุล :"
            name="fullname"
            style={{ marginBottom: "5px" }}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="เพศ :" name="sex" style={{ marginBottom: "5px" }}>
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="อายุ :" name="age" style={{ marginBottom: "5px" }}>
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        {!!dataSelect ? (
          dataSelect.map((items, group_index) => {
            return (
              <Col span={6} key={group_index}>
                <Divider orientation="left">{items.name}</Divider>
                <Row>
                  {!!items.data ? (
                    items.data.map((items2, subgroup_index) => {
                      if (items2.name === "single") {
                        return (
                          <>
                            {items2.data.map((labItems, item_index) => {
                              countForList++;
                              return (
                                <Col span={24} key={labItems.lab_items_code}>
                                  <Checkbox
                                    onChange={(e) => {
                                      onChangeChecklist(
                                        e,
                                        labItems.lab_items_code,
                                        null,
                                        group_index,
                                        subgroup_index,
                                        item_index
                                      );
                                    }}
                                    checked={labItems.status}
                                  >
                                    {labItems.lab_items_name_ref}
                                  </Checkbox>
                                </Col>
                              );
                            })}
                          </>
                        );
                      } else {
                        return (
                          <>
                            <Col span={24} key={items2.name}>
                              <Checkbox
                                onChange={(e) => {
                                  onChangeChecklistGroup(
                                    e,
                                    items2.code,
                                    group_index,
                                    subgroup_index
                                  );
                                }}
                              >
                                {items2.name}
                              </Checkbox>
                            </Col>
                            {items2.data.map((labItems, item_index) => {
                              countForList++;
                              return (
                                <Col
                                  span={24}
                                  key={
                                    labItems.lab_items_code + "_" + item_index
                                  }
                                >
                                  <Checkbox
                                    style={{ marginLeft: "15px" }}
                                    onChange={(e) => {
                                      onChangeChecklist(
                                        e,
                                        labItems.lab_items_code,
                                        items2.code,
                                        group_index,
                                        subgroup_index,
                                        item_index
                                      );
                                    }}
                                    checked={labItems.status}
                                  >
                                    {labItems.lab_items_name_ref}
                                  </Checkbox>
                                </Col>
                              );
                            })}
                          </>
                        );
                      }
                    })
                  ) : (
                    <></>
                  )}
                </Row>
              </Col>
            );
          })
        ) : (
          <></>
        )}
      </Row>

      <Row>
        <Col span={12}>
          <Divider orientation="left">รูปแบบการชำระเงิน</Divider>
          <Form.Item
            name="payment"
            rules={[
              {
                required: true,
                message: "กรุณาเลือกรูปแบบการชำระเงิน",
              },
            ]}
            style={{ marginBottom: "5px" }}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={1}>เงินสด</Radio>
                <Radio value={2}>โอนเงิน</Radio>
                <Radio value={3}>เช็ค</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Divider orientation="left">อัตราค่าบริการ</Divider>
          <Form.Item label="1 :" name="payment" style={{ marginBottom: "5px" }}>
            <Input suffix="บาท" />
          </Form.Item>
          <Form.Item label="2 :" name="payment" style={{ marginBottom: "5px" }}>
            <Input suffix="บาท" />
          </Form.Item>
        </Col>
      </Row>
      <div className="ant-modal-confirm-btns">
        <Button key="back" onClick={closeModal}>
          ยกเลิก
        </Button>
        <Button type="primary" htmlType="submit">
          ยืนยัน
        </Button>
      </div>
    </Form>
  );
};

export default AddFormComponent;
