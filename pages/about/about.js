import { Card } from "antd";
import { NotificationOutlined } from "@ant-design/icons";

function AboutAcculims() {
  const data = {
    title: (
      <>
        <NotificationOutlined /> เกี่ยวกับ AccuLIMS
      </>
    ),
  };
  return (
    <Card
      title={data.title}
      headStyle={{
        color: "#002140",
      }}
    >
      <div>
        <p>
          AccuLIMS คือ ระบบบริหารจัดการห้อง Lab ในโรงพยาบาล ที่ครบครันด้วย
          functions การใช้งานที่จำเป็นในห้อง Lab
          เพื่อตอบสนองการใช้งานของเจ้าหน้าที่ห้อง Lab ห้การทำงานในห้อง Lab
          มีประสิทธิภาพสูงสุด อันจะเกิดประโยชน์ต่อ
          ทั้งผู้ป่วยและบุคคลที่เกี่ยวข้อง อย่างสูงสุด
        </p>
        <h3>Change Log : 07/02/2023</h3>
      </div>
    </Card>
  );
}

export default AboutAcculims;
