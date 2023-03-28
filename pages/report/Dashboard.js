import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = ({ children }) => {
  const layout = children.map((child, index) => {
    return {
      i: index.toString(),
      x: index * 2,
      y: 0,
      w: 2,
      h: 2,
      minW: 1,
      minH: 1,
    };
  });

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200 }}
      cols={{ lg: 12 }}
      rowHeight={30}
      margin={[16, 16]}
      containerPadding={[16, 16]}
      isDraggable={true}
      isResizable={true}
    >
      {children}
    </ResponsiveGridLayout>
  );
};

export default Dashboard;
