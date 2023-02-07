import styles from '../../styles/Home.module.css'
import { React, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Button } from 'antd';

function ToolsUservalref(){
    const [fname, setname] = useState('');
    const [lname, setsurname] = useState('');
    const [job_id, setlcid] = useState('');
    const [user_name, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [user_type, settype] = useState('');

    async function sendValue(value) {
        axios.post('/api/add_user',
        {fname:fname, lname:lname, job_id:job_id, user_name:user_name, password:password, user_type:user_type})
            .then(response => {
            console.log(response.data);
            setData(response.data);
            })
            .catch(error => { console.error(error); }
        );
    }

    return(
        <div className={styles.grid}>
            <h1>User Information</h1>
            <p className={styles.card}>
                <a>ชื่อ: </a>
                <br></br>
                <a>นามสกุล: </a>
                <br></br>
                <a>เลขที่ใบประกอบ: </a>
                <br></br>
                <a>Username: </a>
                <br></br>
                <a>Password: </a>
                <br></br>
                <a>User Type: </a>
                <br></br>
            </p>
            <p className={styles.card}>
                <input type="text" value={fname} onChange={e => setname(e.target.value)}/>
                <br></br>
                <input type="text" value={lname} onChange={e => setsurname(e.target.value)}/>
                <br></br>
                <input type="text" value={job_id} onChange={e => setlcid(e.target.value)}/>
                <br></br>
                <input type="text" value={user_name} onChange={e => setusername(e.target.value)}/>
                <br></br>
                <input type="text" value={password} onChange={e => setpassword(e.target.value)}/>
                <br></br>
                <input type="text" value={user_type} onChange={e => settype(e.target.value)}/>
                <br></br>
                <Button type="primary" shape="round" onClick = {sendValue}>Save</Button>
            </p>
        </div>
    )
}

export default ToolsUservalref;