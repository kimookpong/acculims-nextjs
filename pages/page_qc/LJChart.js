import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const LeveyJenningsChart = ({ data }) => {
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="test" />
      <YAxis/>
      <Tooltip />
      <Line dataKey="value" stroke="#8884d8"/>
      <Line dataKey="mean" stroke="#11cc0e"/>
      <Line dataKey="sd2_p" stroke="#f0e922"/>
      <Line dataKey="sd2_m" stroke="#f0e922"/>
      <Line dataKey="sd3_p" stroke="#eb7a7a"/>
      <Line dataKey="sd3_m" stroke="#eb7a7a"/>
    </LineChart>
  );
};

export default LeveyJenningsChart;
