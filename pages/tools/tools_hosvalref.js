import axios from "axios";
//import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import { Spin, Space, Card, Form, Button, Input } from "antd";

const ToolsHosvalref = () => {
  const [name, setname] = useState("");
  const [nameeng, setnameeng] = useState("");
  const [address, setaddress] = useState("");
  const [tel, settel] = useState("");
  const [dept, setdept] = useState("");
  const [data, setData] = useState("");

  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    sendValue();
  }, []);

  const sendValue = () => {
    setLoadingData(true);
    return axios.post("/api/get_lis_hospital").then((response) => {
      setname(response.data[0].hospital_name_th);
      setnameeng(response.data[0].hospital_name_en);
      setaddress(response.data[0].address);
      settel(response.data[0].phone);
      setdept(response.data[0].hospital_department_lab);
      setData(response.data[0]);

      setLoadingData(false);
    });
  };

  const addValue = () => {
    setLoadingData(true);
    return axios
      .post("/api/add_lis_hospital", {
        name: name,
        nameeng: nameeng,
        address: address,
        tel: tel,
        dept: dept,
      })
      .then((response) => {
        console.log(response.data);

        setLoadingData(false);
      });
  };

  return (
    <Card title="Hospital Information">
      <Spin spinning={loadingData} tip="กำลังโหลดข้อมูล">
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
            <Form.Item label="ชื่อโรงพยาบาล (ไทย):">
              <Input onChange={(e) => setname(e.target.value)} value={name} />
            </Form.Item>
            <Form.Item label="ชื่อโรงพยาบาล (อังกฤษ):">
              <Input
                onChange={(e) => setnameeng(e.target.value)}
                value={nameeng}
              />
            </Form.Item>
            <Form.Item label="ที่อยู่:">
              <Input
                onChange={(e) => setaddress(e.target.value)}
                value={address}
              />
            </Form.Item>
            <Form.Item label="เบอร์โทรศัพท์:">
              <Input onChange={(e) => settel(e.target.value)} value={tel} />
            </Form.Item>
            <Form.Item label="แผนก:">
              <Input onChange={(e) => setdept(e.target.value)} value={dept} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 18,
              }}
            >
              <Space wrap>
                <Button type="primary" shape="round" onClick={addValue}>
                  Save
                </Button>
                <Button shape="round" onClick={sendValue}>
                  Load
                </Button>
              </Space>
            </Form.Item>
          </div>
        </Form>
      </Spin>
    </Card>
  );
};

export default ToolsHosvalref;
