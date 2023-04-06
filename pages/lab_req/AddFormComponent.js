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

const { TextArea } = Input;
const AddFormComponent = (props) => {
  const { dataForm, reloadList, list, addPatient } = props;

  const [individualTest, set_individualTest] = useState([]);
  const [lipidProfile, set_lipidProfile] = useState([]);
  const [liverFunctionTest, set_liverFunctionTest] = useState([]);
  const [electrolyte, set_electrolyte] = useState([]);
  const [renalFunctionTest, set_renalFunctionTest] = useState([]);
  const [hematology, set_hematology] = useState([]);
  const [urinalysis, set_urinalysis] = useState([]);
  const [individualUrinetest, set_individualUrinetest] = useState([]);
  const [tyroidFunction, set_tyroidFunction] = useState([]);
  const [caTest, set_caTest] = useState([]);
  const [covidTest, set_covidTest] = useState([]);
  const [individualAnotherTest, set_individualAnotherTest] = useState([]);

  useEffect(() => {
    set_individualTest(list.individualTest);
    set_lipidProfile(list.lipidProfile);
    set_liverFunctionTest(list.liverFunctionTest);
    set_electrolyte(list.electrolyte);
    set_renalFunctionTest(list.renalFunctionTest);
    set_hematology(list.hematology);
    set_urinalysis(list.urinalysis);
    set_individualUrinetest(list.individualUrinetest);
    set_tyroidFunction(list.tyroidFunction);
    set_caTest(list.caTest);
    set_covidTest(list.covidTest);
    set_individualAnotherTest(list.individualAnotherTest);
  }, [list]);

  //electrolyte
  const [checkelectrolyte, setelectrolyte] = useState([]);
  const onCheckElectrolyteAll = (e) => {
    setelectrolyte(
      e.target.checked ? electrolyte.map((option) => option.value) : []
    );
  };
  const onCheckElectrolyte = (list) => {
    setelectrolyte(list);
  };

  //renalFunctionTest
  const [checkrenalFunctionTest, setrenalFunctionTest] = useState([]);
  const onCheckrenalFunctionTestAll = (e) => {
    setrenalFunctionTest(
      e.target.checked ? renalFunctionTest.map((option) => option.value) : []
    );
  };
  const onCheckrenalFunctionTest = (list) => {
    setrenalFunctionTest(list);
  };

  //lipidProfile
  const [checklipidProfile, setlipidProfile] = useState([]);
  const onChecklipidProfileAll = (e) => {
    setlipidProfile(
      e.target.checked ? lipidProfile.map((option) => option.value) : []
    );
  };
  const onChecklipidProfile = (list) => {
    setlipidProfile(list);
  };

  //liverFunctionTest
  const [checkliverFunctionTest, setliverFunctionTest] = useState([]);
  const onCheckliverFunctionTestAll = (e) => {
    setliverFunctionTest(
      e.target.checked ? liverFunctionTest.map((option) => option.value) : []
    );
  };
  const onCheckliverFunctionTest = (list) => {
    setliverFunctionTest(list);
  };

  //urinalysis
  const [checkurinalysis, seturinalysis] = useState([]);
  const onCheckurinalysisAll = (e) => {
    seturinalysis(
      e.target.checked ? urinalysis.map((option) => option.value) : []
    );
  };
  const onCheckurinalysis = (list) => {
    seturinalysis(list);
  };

  //tyroidFunction
  const [checktyroidFunction, settyroidFunction] = useState([]);
  const onChecktyroidFunctionAll = (e) => {
    settyroidFunction(
      e.target.checked ? tyroidFunction.map((option) => option.value) : []
    );
  };
  const onChecktyroidFunction = (list) => {
    settyroidFunction(list);
  };

  //caTest
  const [checkcaTest, setcaTest] = useState([]);
  const onCheckcaTestAll = (e) => {
    setcaTest(e.target.checked ? caTest.map((option) => option.value) : []);
  };
  const onCheckcaTest = (list) => {
    setcaTest(list);
  };

  //covidTest
  const [checkcovidTest, setcovidTest] = useState([]);
  const onCheckcovidTestAll = (e) => {
    setcovidTest(
      e.target.checked ? covidTest.map((option) => option.value) : []
    );
  };
  const onCheckcovidTest = (list) => {
    setcovidTest(list);
  };

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

  const checklistGroup = (major, minor) => {
    return (
      <>
        <Checkbox onChange={major.onchangeFunc}>{major.label}</Checkbox>
        <Checkbox.Group
          style={{ display: "grid", marginLeft: "10px" }}
          options={minor.optionsData}
          value={minor.valueData}
          onChange={minor.onchangeFunc}
        />
      </>
    );
  };

  const [fields, setFields] = useState([]);

  const onFinish = (values) => {
    // return axios
    //   .post("/api/user_action", {
    //     action: "update",
    //     id_user: dataForm.id_user,
    //     values: values,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     reloadList();
    //     closeModal();
    //   });
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
      <Divider orientation="left">LAB DETAIL</Divider>
      <Row>
        <Col span={6}>
          <Form.Item
            name="individualTest"
            style={{ marginBottom: "0" }}
            wrapperCol={{ span: 24 }}
          >
            <Checkbox.Group
              style={{
                width: "100%",
              }}
            >
              <Row gutter={24}>
                {!!individualTest ? (
                  individualTest.map((item, index) => {
                    return (
                      <Col span={24} key={index}>
                        <Checkbox value={item.value}>{item.label}</Checkbox>
                      </Col>
                    );
                  })
                ) : (
                  <></>
                )}
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item style={{ marginBottom: "0" }} wrapperCol={{ span: 24 }}>
            {checklistGroup(
              {
                label: "Electrolyte",
                onchangeFunc: onCheckElectrolyteAll,
              },
              {
                optionsData: electrolyte,
                valueData: checkelectrolyte,
                onchangeFunc: onCheckElectrolyte,
              }
            )}
          </Form.Item>

          <Form.Item style={{ marginBottom: "0" }} wrapperCol={{ span: 24 }}>
            {checklistGroup(
              {
                label: "Renal Function Test",
                onchangeFunc: onCheckrenalFunctionTestAll,
              },
              {
                optionsData: renalFunctionTest,
                valueData: checkrenalFunctionTest,
                onchangeFunc: onCheckrenalFunctionTest,
              }
            )}
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item style={{ marginBottom: "0" }} wrapperCol={{ span: 24 }}>
            {checklistGroup(
              {
                label: "lipidProfile",
                onchangeFunc: onChecklipidProfileAll,
              },
              {
                optionsData: lipidProfile,
                valueData: checklipidProfile,
                onchangeFunc: onChecklipidProfile,
              }
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: "0" }} wrapperCol={{ span: 24 }}>
            {checklistGroup(
              {
                label: "liverFunctionTest",
                onchangeFunc: onCheckliverFunctionTestAll,
              },
              {
                optionsData: liverFunctionTest,
                valueData: checkliverFunctionTest,
                onchangeFunc: onCheckliverFunctionTest,
              }
            )}
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            name="hematology"
            style={{ marginBottom: "0" }}
            wrapperCol={{ span: 24 }}
          >
            <Checkbox.Group
              style={{
                width: "100%",
              }}
            >
              <Row gutter={24}>
                {!!hematology ? (
                  hematology.map((item, index) => {
                    return (
                      <Col span={24} key={index}>
                        <Checkbox value={item.value}>{item.label}</Checkbox>
                      </Col>
                    );
                  })
                ) : (
                  <></>
                )}
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item style={{ marginBottom: "0" }} wrapperCol={{ span: 24 }}>
            {checklistGroup(
              {
                label: "Urinalysis",
                onchangeFunc: onCheckurinalysisAll,
              },
              {
                optionsData: urinalysis,
                valueData: checkurinalysis,
                onchangeFunc: onCheckurinalysis,
              }
            )}
          </Form.Item>

          <Form.Item
            name="individualUrinetest"
            style={{ marginBottom: "0" }}
            wrapperCol={{ span: 24 }}
          >
            <Checkbox.Group
              style={{
                width: "100%",
              }}
            >
              <Row gutter={24}>
                {!!individualUrinetest ? (
                  individualUrinetest.map((item, index) => {
                    return (
                      <Col span={24} key={index}>
                        <Checkbox value={item.value}>{item.label}</Checkbox>
                      </Col>
                    );
                  })
                ) : (
                  <></>
                )}
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item style={{ marginBottom: "0" }} wrapperCol={{ span: 24 }}>
            {checklistGroup(
              {
                label: "Tyroid Function",
                onchangeFunc: onChecktyroidFunctionAll,
              },
              {
                optionsData: tyroidFunction,
                valueData: checktyroidFunction,
                onchangeFunc: onChecktyroidFunction,
              }
            )}
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item style={{ marginBottom: "0" }} wrapperCol={{ span: 24 }}>
            {checklistGroup(
              {
                label: "CA Test",
                onchangeFunc: onCheckcaTestAll,
              },
              {
                optionsData: caTest,
                valueData: checkcaTest,
                onchangeFunc: onCheckcaTest,
              }
            )}
          </Form.Item>

          <Form.Item style={{ marginBottom: "0" }} wrapperCol={{ span: 24 }}>
            {checklistGroup(
              {
                label: "Covid Test",
                onchangeFunc: onCheckcovidTestAll,
              },
              {
                optionsData: covidTest,
                valueData: checkcovidTest,
                onchangeFunc: onCheckcovidTest,
              }
            )}
          </Form.Item>

          <Form.Item
            name="individualAnotherTest"
            style={{ marginBottom: "0" }}
            wrapperCol={{ span: 24 }}
          >
            <Checkbox.Group
              style={{
                width: "100%",
              }}
            >
              <Row gutter={24}>
                {!!individualAnotherTest ? (
                  individualAnotherTest.map((item, index) => {
                    return (
                      <Col span={24} key={index}>
                        <Checkbox value={item.value}>{item.label}</Checkbox>
                      </Col>
                    );
                  })
                ) : (
                  <></>
                )}
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Col>
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
