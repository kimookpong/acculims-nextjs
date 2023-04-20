import React, { useState } from 'react';
import { Table } from 'antd';
import { checkWestgardRules } from './westgardRules';

const columns = [
  {
    title: 'Rule',
    dataIndex: 'rule',
    key: 'rule',
  },
  {
    title: 'Result',
    dataIndex: 'result',
    key: 'result',
    render: (result) => (result ? 'Failed' : 'Passed'),
  },
];

const IndexPage = () => {
  const [controlValues, setControlValues] = useState('');
  const [controlMean, setControlMean] = useState('');
  const [controlSD, setControlSD] = useState('');
  const [results, setResults] = useState([]);

  const handleCheck = () => {
    const values = controlValues.split(',').map((value) => parseFloat(value));
    const mean = parseFloat(controlMean);
    const sd = parseFloat(controlSD);

    setResults(checkWestgardRules(values, mean, sd));
  };

  return (
    <div>
      <h1>Westgard Rules Demo</h1>
      <div>
        <label htmlFor="controlValues">Control Values (comma-separated): </label>
        <input
          type="text"
          id="controlValues"
          value={controlValues}
          onChange={(e) => setControlValues(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="controlMean">Control Mean: </label>
        <input type="number" id="controlMean" value={controlMean} onChange={(e) => setControlMean(e.target.value)} />
      </div>
      <div>
        <label htmlFor="controlSD">Control SD: </label>
<input type="number" id="controlSD" value={controlSD} onChange={(e) => setControlSD(e.target.value)} />
</div>
<button onClick={handleCheck}>Check Westgard Rules</button>
<h2>Results:</h2>
<Table columns={columns} dataSource={results} rowKey="rule" />
</div>
);
};

export default IndexPage;
