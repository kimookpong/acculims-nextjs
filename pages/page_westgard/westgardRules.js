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
