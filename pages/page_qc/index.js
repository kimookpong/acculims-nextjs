import React from 'react';
import { CopyOutlined, LineChartOutlined, ControlOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import Page1 from './Page_1';
import Page2 from './Page_2';
import Page3 from './Page_3';
import Page4 from './Page_4';

const { TabPane } = Tabs;

const Page = () => {
  const tabItems = [
    { name: 'Set Control LOT', icon: CopyOutlined, content: <Page1/> },
    { name: 'Set Control Test', icon: SnippetsOutlined, content: <Page2/> },
    { name: 'LJ Control Chart', icon: LineChartOutlined, content: <Page3/> },
    { name: 'QC Data Table', icon: ControlOutlined, content: <Page4/> },
  ];

  return (
    <Tabs defaultActiveKey="2">
      {tabItems.map(({ name, icon: Icon, content }, i) => {
        const id = String(i + 1);
        return (
          <TabPane
            tab={
              <span>
                <Icon/>
                {name}
              </span>
            }
            key={id}
          >
            {content}
          </TabPane>
        );
      })}
    </Tabs>
  );
};

export default Page;