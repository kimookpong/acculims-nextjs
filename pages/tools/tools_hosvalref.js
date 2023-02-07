import axios from 'axios';
import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { Button } from 'antd';

const ToolsHosvalref = () => {
    const [name, setname] = useState('');
    const [nameeng, setnameeng] = useState('');
    const [address, setaddress] = useState('');
    const [tel, settel] = useState('');
    const [dept, setdept] = useState('');
    const [data, setData] = useState('');

    async function sendValue(value) {
        axios.post('http://localhost:3000/api/get_lis_hospital', 
        {name:name, nameeng:nameeng, address:address, tel:tel, dept:dept})
            .then(response => {
            setData(response.data);
            console.log('data = ', data.name)
        })
            .catch(error => { console.error(error); }
        );
    }

    async function addValue(value) {
        axios.post('http://localhost:3000/api/add_lis_hospital', 
        {name:name, nameeng:nameeng, address:address, tel:tel, dept:dept})
    }

    return(
        <div>
            <h1>Hospital Information</h1>
            <p className={styles.card}>
                <p>ชื่อโรงพยาบาล (ไทย): </p>
                <input type="text" value={name} onChange={e => setname(e.target.value)}/>
                <p>ชื่อโรงพยาบาล (อังกฤษ): </p>
                <input type="text" value={nameeng} onChange={e => setnameeng(e.target.value)}/>
                <p>ที่อยู่: </p>
                <input type="text" value={address} onChange={e => setaddress(e.target.value)}/>
                <p>เบอร์โทรศัพท์: </p>
                <input type="text" value={tel} onChange={e => settel(e.target.value)}/>
                <p>แผนก: </p>
                <input type="text" value={dept} onChange={e => setdept(e.target.value)}/>
                <br></br><br></br>
                <Button type="primary" shape="round" onClick = {addValue}>Save</Button>
                <a> </a>
                <Button shape="round" onClick = {sendValue}>Load</Button>
                <a> </a>
                <Button shape="round">Cancel</Button>
            </p>
        </div>
    )
}

export default ToolsHosvalref;