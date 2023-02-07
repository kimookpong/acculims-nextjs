import { React, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Home.module.css'
import { Checkbox, Button } from 'antd';

function ToolsOptionvalref(){
    
    const onChangeEGFRval = (e) => { console.log(`checked = ${e.target.checked}`); };
    const onChangeEGFRstage = (e) => { console.log(`checked = ${e.target.checked}`); };
    const onChangeNCD = (e) => { console.log(`checked = ${e.target.checked}`); };
    const onChangeAutoPLT = (e) => { console.log(`checked = ${e.target.checked}`); };

    const [val_1, setval1] = useState('');
    const [val_2, setval2] = useState('');
    const [val_3, setval3] = useState('');
    const [val_1text, setval1t] = useState('');
    const [val_2text, setval2t] = useState('');
    const [val_3text, setval3t] = useState('');

    async function sendValue(value) {
        axios.post('/api/add_lab_ref_plt', {val_2:val_2})
            .then(response => {
            console.log(response.data);
            setData(response.data);
            })
            .catch(error => { console.error(error); }
        );
    }

    return(
        <div>
            <h1>Option page</h1>
            <p className={styles.card}>
                <h3>Setting</h3>
                <Checkbox onChange={onChangeEGFRval}>eGFR `{'>'}` 100 Not state</Checkbox>
                <br></br>
                <Checkbox onChange={onChangeEGFRstage}>eGFR No Stage</Checkbox>
                <br></br>
                <Checkbox onChange={onChangeNCD}>NCD No Print</Checkbox>
                <br></br>
                <Checkbox onChange={onChangeAutoPLT}>Auto Platelet smear</Checkbox>
                <br></br>
            </p>
            <p className={styles.card}>
                <h3>เซตค่า Platelet</h3>
                <a>ค่าน้อยกว่า </a>
                <input type="text" value={val_1} onChange={e => setval1(e.target.value)}/>
                <br></br>
                <a>จะแสดงผลว่า </a>
                <input type="text" value={val_1text} onChange={e => setval1t(e.target.value)}/>
                <br></br>
                <a>ค่าอยู่ระหว่าง </a>
                <input type="text" value={val_2} onChange={e => setval2(e.target.value)}/>
                <br></br>
                <a>จะแสดงผลว่า </a>
                <input type="text" value={val_2text} onChange={e => setval2t(e.target.value)}/>
                <br></br>
                <a>ค่ามากกว่า </a>
                <input type="text" value={val_3} onChange={e => setval3(e.target.value)}/>
                <br></br>
                <a>จะแสดงผลว่า </a>
                <input type="text" value={val_3text} onChange={e => setval3t(e.target.value)}/>
            </p>
            <Button type="primary" shape="round"  onClick = {sendValue}>OK</Button>
            <a> </a>
            <Button shape="round">Cancel</Button>
        </div>
    )
}

export default ToolsOptionvalref