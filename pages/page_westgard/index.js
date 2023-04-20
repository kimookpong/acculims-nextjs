import React, { useState } from 'react';
import { Table } from 'antd';

export const checkWestgardRules = (controlValues, controlMean, controlSD) => {
  const rule1_2s = controlValues.some((value) => Math.abs(value - controlMean) > 2 * controlSD);
  const rule1_3s = controlValues.some((value) => Math.abs(value - controlMean) > 3 * controlSD);
  const rule2_2s = controlValues.length >= 2 && controlValues.slice(-2).every((value) => Math.abs(value - controlMean) > 2 * controlSD);
  const ruleR_4s = controlValues.length >= 2 && Math.abs(controlValues[controlValues.length - 1] - controlValues[controlValues.length - 2]) > 4 * controlSD;
  const rule4_1s = controlValues.length >= 4 && controlValues.slice(-4).every((value) => Math.abs(value - controlMean) > controlSD);
  //const 10x
  
  return [
    { rule: '1-2s', result: rule1_2s },
    { rule: '1-3s', result: rule1_3s },
    { rule: '2-2s', result: rule2_2s },
    { rule: 'R-4s', result: ruleR_4s },
    { rule: '4-1s', result: rule4_1s },
  ];
};

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
